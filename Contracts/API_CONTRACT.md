# CalqTool API Contract v2.3.4 – Export Finalization Patch (Enterprise)

Deze versie is een **kleine maar kritieke patch** op v2.3.3 (Complete Platform + Export + Hardening) en maakt export contractueel “dichtgetimmerd” voor enterprise implementatie.

Toevoegingen:
1) **Formele export payload/metadata schemas** (wat zit er in PDF/XLSX/JSON/CSV).  
2) **Download gedrag 100% vastgelegd** (headers, TTL, filename, 302 vs 200).  
3) **Plan usage/limits uitgebreid** met export counters en limieten.

**Base path:** `/api/v2.3`  
**Conventies:** identiek aan v2.3.

---

## 1. Export Payload & Metadata Schemas

### 1.1 ExportMetadata
```json
{
  "$id": "#/components/schemas/ExportMetadata",
  "type": "object",
  "properties": {
    "apiVersion": { "type": "string" },
    "libraryVersion": { "type": "string" },
    "environment": { "type": "string", "enum": ["production","staging","dev"] },
    "generatedAt": { "type": "string", "format": "date-time" },
    "generatedBy": { "type": "string", "format": "uuid" },
    "projectId": { "type": "string", "format": "uuid" },
    "scenarioId": { "type": ["string","null"], "format": "uuid" },
    "snapshotId": { "type": ["string","null"], "format": "uuid" },
    "calculationId": { "type": ["string","null"], "format": "uuid" },
    "planId": { "type": "string" },
    "watermark": { "type": "boolean" }
  },
  "required": ["apiVersion","libraryVersion","environment","generatedAt","generatedBy","projectId","planId","watermark"]
}
```

### 1.2 ExportPayloadSummary
```json
{
  "$id": "#/components/schemas/ExportPayloadSummary",
  "type": "object",
  "properties": {
    "structureNodeCount": { "type": "integer", "minimum": 0 },
    "roomNodeCount": { "type": "integer", "minimum": 0 },
    "measurementCount": { "type": "integer", "minimum": 0 },
    "drawingCount": { "type": "integer", "minimum": 0 },
    "scenarioCount": { "type": "integer", "minimum": 0 },
    "includesAudit": { "type": "boolean" },
    "includesScenarioCompare": { "type": "boolean" },
    "totals": { "$ref": "#/components/schemas/CostBreakdown" }
  },
  "required": ["structureNodeCount","roomNodeCount","measurementCount","drawingCount","scenarioCount","includesAudit","includesScenarioCompare","totals"]
}
```

### 1.3 ExportJsonBundle (voor type=JSON)
De JSON export moet machineleesbaar zijn en bevat in één bundle de projectdata + structuur + metingen + berekening + (optioneel) scenario compare + (optioneel) audit.

```json
{
  "$id": "#/components/schemas/ExportJsonBundle",
  "type": "object",
  "properties": {
    "metadata": { "$ref": "#/components/schemas/ExportMetadata" },
    "summary": { "$ref": "#/components/schemas/ExportPayloadSummary" },
    "project": { "type": "object" },
    "structure": { "type": "array", "items": { "$ref": "#/components/schemas/StructureNode" } },
    "measurements": { "type": "array", "items": { "$ref": "#/components/schemas/RoomMeasurement" } },
    "calculation": { "anyOf": [ { "$ref": "#/components/schemas/CalculationResult" }, { "type": "null" } ] },
    "scenarioCompare": { "anyOf": [ { "$ref": "#/components/schemas/ScenarioCompare" }, { "type": "null" } ] },
    "audit": { "anyOf": [ { "type": "array", "items": { "$ref": "#/components/schemas/AuditLogEvent" } }, { "type": "null" } ] }
  },
  "required": ["metadata","summary","project","structure","measurements"]
}
```

### 1.4 ExportCsvManifest (voor type=CSV)
CSV export bestaat uit meerdere CSV-bestanden (meestal zip). Het contract definieert een manifest zodat de client weet welke tabellen erin zitten.

```json
{
  "$id": "#/components/schemas/ExportCsvManifest",
  "type": "object",
  "properties": {
    "metadata": { "$ref": "#/components/schemas/ExportMetadata" },
    "files": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "fileName": { "type": "string" },
          "mimeType": { "type": "string", "enum": ["text/csv"] },
          "description": { "type": "string" }
        },
        "required": ["fileName","mimeType","description"]
      }
    }
  },
  "required": ["metadata","files"]
}
```

**CSV bundling rule:** als er meerdere csv files zijn, wordt de export artifact een ZIP (`application/zip`) met bovenstaande manifest als `manifest.json` in de root.

### 1.5 XLSX Sheets Contract (formele lijst)
Voor type=XLSX moeten deze sheets aanwezig zijn:
- `Summary`
- `Structure`
- `Measurements`
- `LineItems`
- `ScenarioCompare` (alleen als includeScenarioCompare=true)
- `Metadata`

XLSX `Metadata` sheet bevat minimaal alle velden uit `ExportMetadata`.

---

## 2. Download Gedrag (100% vastgelegd)

### 2.1 Download endpoint
`GET /projects/{projectId}/exports/{exportId}/download`

**Regel A (default): 302 signed URL**
- Response: `302 Found`
- Header: `Location: <signed-url>`
- Header: `X-Export-Url-Expires-At: <ISO8601>`
- TTL: **10 minuten** vanaf response time

**Regel B (alternatief): 200 stream**
Alleen toegestaan als server-side streaming wordt gebruikt (geen signed URL). Dan:
- Status: `200 OK`
- Header: `Content-Type: <mimeType>` (bijv. application/pdf)
- Header: `Content-Disposition: attachment; filename="<fileName>"`
- Header: `Content-Length: <size>` (als bekend)
- Header: `ETag: "<artifactHashOrExportEtag>"`
- Header: `Cache-Control: private, max-age=0, no-store`
- Body: binary stream

**Regel C: nog niet klaar**
Als export `status != Completed`:
- Status: `409 Conflict`
- Body: uniform error model met:
  - `code = EXPORT_NOT_READY`
  - `details = { status, progress, stage }`

**Regel D: failed**
Als export `status == Failed`:
- Status: `500 Internal Server Error`
- `code = EXPORT_FAILED`
- `details = { reason }`

**Regel E: deleted**
Als export soft-deleted:
- Status: `404 Not Found`
- `code = RESOURCE_NOT_FOUND`

### 2.2 CORS
Downloads via 302 signed URL vallen buiten API CORS; de signed URL moet zelf correct zijn.  
Downloads via 200 stream vallen onder API CORS; server MUST set `Access-Control-Allow-Origin` as usual.

---

## 3. Plan Usage & Limits – Export Counters (Formeel)

### 3.1 PlanUsage uitbreiden
Voeg aan `PlanUsage` toe:
- `pdfExportsThisMonth`
- `xlsxExportsThisMonth`
- `jsonExportsThisMonth`
- `csvExportsThisMonth`

```json
{
  "$id": "#/components/schemas/PlanUsageExport",
  "type": "object",
  "properties": {
    "pdfExportsThisMonth": { "type": "integer", "minimum": 0 },
    "xlsxExportsThisMonth": { "type": "integer", "minimum": 0 },
    "jsonExportsThisMonth": { "type": "integer", "minimum": 0 },
    "csvExportsThisMonth": { "type": "integer", "minimum": 0 }
  },
  "required": ["pdfExportsThisMonth","xlsxExportsThisMonth","jsonExportsThisMonth","csvExportsThisMonth"]
}
```

### 3.2 PlanLimits uitbreiden
Voeg aan `PlanLimits` toe:
- `maxPdfExportsPerMonth`
- `maxXlsxExportsPerMonth`
- `maxJsonExportsPerMonth`
- `maxCsvExportsPerMonth`
- `pdfWatermark` (blijft)

```json
{
  "$id": "#/components/schemas/PlanLimitsExport",
  "type": "object",
  "properties": {
    "maxPdfExportsPerMonth": { "type": "integer", "minimum": 0 },
    "maxXlsxExportsPerMonth": { "type": "integer", "minimum": 0 },
    "maxJsonExportsPerMonth": { "type": "integer", "minimum": 0 },
    "maxCsvExportsPerMonth": { "type": "integer", "minimum": 0 },
    "pdfWatermark": { "type": "boolean" }
  },
  "required": ["maxPdfExportsPerMonth","maxXlsxExportsPerMonth","maxJsonExportsPerMonth","maxCsvExportsPerMonth","pdfWatermark"]
}
```

### 3.3 Plan response note
`GET /me/plan` MUST return:
- `usage` includes `PlanUsageExport`
- `limits` includes `PlanLimitsExport`

### 3.4 Gating rule
On export creation:
- increment the corresponding counter (by type) only when export reaches `Completed`
- if limit would be exceeded, reject creation with 402 `PLAN_LIMIT_EXCEEDED`

---

## 4. Changelog
- v2.3.4: Export payload/metadata schemas, strict download behavior (TTL/headers), and formal plan usage/limits for exports.


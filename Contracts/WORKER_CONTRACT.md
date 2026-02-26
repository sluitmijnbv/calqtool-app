🚀 CALQTOOL™ — WORKER CONTRACT v2.1 (FINAL LOCK)

Enterprise Execution + UI Integration + Schema/Headers/Revision Lock

Base path: /api/v2.3

Formaat: JSON (UTF-8, camelCase) tenzij binary download (export stream)

No Additional Fields Rule: responses bevatten uitsluitend velden uit dit contract.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

0\) GLOBAL RULES (HARD)

0.1 Verplichte response headers (alle protected endpoints)

Elke protected response MOET bevatten:

•	X-RateLimit-Limit: <int>

•	X-RateLimit-Remaining: <int>

•	X-RateLimit-Reset: <unixSeconds>

•	X-Plan: <string>

•	X-Library-Version: <string>

0.2 CORS

Worker moet CORS headers leveren voor SPA:

•	Access-Control-Allow-Origin: <allowed origin>

•	Access-Control-Allow-Headers: Authorization, Content-Type, If-Match, If-None-Match, Idempotency-Key

•	Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS

0.3 Error model (uniform, altijd)

{

&nbsp; "error": {

&nbsp;   "code": "STRING\_CODE",

&nbsp;   "message": "Human readable message",

&nbsp;   "details": {}

&nbsp; }

}

UI mapping (bindend) :

•	401 → login

•	403 → geen toegang

•	404 → not found

•	409 → conflict modal

•	412 → refresh voorstel

•	402 → upgrade prompt

•	500 → fout + retry

0.4 ETag / 304 (cache lock)

Voor alle GET endpoints die hieronder “ETag: required” hebben:

•	Request: If-None-Match: "<etag>"

•	Response:

o	304 zonder body indien unchanged

o	anders 200 met ETag: "<etag>"

0.5 Determinisme \& library lock

•	Project heeft vaste libraryVersion (geen auto-upgrade)

•	Worker mag geen eigen normdata genereren

•	Lifecycle enforcement (active/review/deprecated/archived)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1\) REVISION \& CONCURRENCY (DEFINITIEF)

1.1 Definitie revisionId

revisionId is een opaque string (bijv. base64url hash) die verandert bij elke mutatie van de resource.

Eigenschappen:

•	Niet afleidbaar (opaque)

•	Uniek per resource state

•	Wijzigt bij elke write op de resource of collection

1.2 If-Match (write lock)

Elke muterende call MOET If-Match gebruiken op de target resource/collection:

•	Header: If-Match: "<revisionId>"

•	Bij mismatch:

o	412 PRECONDITION\_FAILED

o	code: REVISION\_MISMATCH

o	details: { expectedRevisionId, providedRevisionId }

1.3 409 vs 412 (hard onderscheid)

•	412 = technische state mismatch (client had oude revision)

•	409 = business conflict (bijv. locked export state, invalid transition, scenario compare op ontbrekende scenario’s)

409 response:

{

&nbsp; "error": {

&nbsp;   "code": "VERSION\_CONFLICT",

&nbsp;   "message": "Conflict detected",

&nbsp;   "details": { "serverRevisionId": "…", "clientRevisionId": "…" }

&nbsp; }

}

1.4 Bulk updates (atomic, collection revision)

Bulk endpoints werken atomisch:

•	Eén If-Match op collectionRevisionId

•	Alles slaagt, of alles faalt (geen partial writes)

•	Bij error: geen side effects

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2\) SHARED SCHEMAS (LOCKED)

Alle objecten hebben geen extra velden buiten deze schema’s.

2.1 ProjectDetail

{

&nbsp; "id": "uuid",

&nbsp; "name": "string",

&nbsp; "projectCategory": "string",

&nbsp; "regionCode": "string",

&nbsp; "libraryVersion": "string",

&nbsp; "createdAt": "iso8601",

&nbsp; "updatedAt": "iso8601",

&nbsp; "versionNumber": 1,

&nbsp; "revisionId": "string",

&nbsp; "totals": null

}

totals mag null zijn of CostBreakdown.

2.2 StructureNode

{

&nbsp; "id": "uuid",

&nbsp; "projectId": "uuid",

&nbsp; "parentId": "uuid|null",

&nbsp; "type": "enum: \[project, building, floor, unit, room, zone, custom]",

&nbsp; "name": "string",

&nbsp; "sortOrder": 0,

&nbsp; "meta": {

&nbsp;   "label": "string|null",

&nbsp;   "number": "string|null"

&nbsp; },

&nbsp; "revisionId": "string"

}

2.3 Drawing

{

&nbsp; "id": "uuid",

&nbsp; "projectId": "uuid",

&nbsp; "fileName": "string",

&nbsp; "fileSize": 0,

&nbsp; "mimeType": "string",

&nbsp; "status": "enum: \[uploaded, processing, ready, failed]",

&nbsp; "uploadedAt": "iso8601",

&nbsp; "revisionId": "string"

}

2.4 RoomMeasurement

{

&nbsp; "id": "uuid",

&nbsp; "projectId": "uuid",

&nbsp; "structureNodeId": "uuid",

&nbsp; "elementCode": "string",

&nbsp; "quantity": 0.0,

&nbsp; "unit": "string",

&nbsp; "note": "string|null",

&nbsp; "libraryVersion": "string",

&nbsp; "createdAt": "iso8601",

&nbsp; "updatedAt": "iso8601",

&nbsp; "revisionId": "string"

}

Rule: libraryVersion MOET gelijk zijn aan ProjectDetail.libraryVersion.

2.5 CostBreakdown (minimum lock)

{

&nbsp; "total": 0.0,

&nbsp; "currency": "EUR",

&nbsp; "byDiscipline": \[

&nbsp;   { "discipline": "string", "total": 0.0 }

&nbsp; ]

}

2.6 CalculationResult

{

&nbsp; "calculationId": "uuid",

&nbsp; "snapshotId": "uuid",

&nbsp; "projectId": "uuid",

&nbsp; "libraryVersion": "string",

&nbsp; "calculatedAt": "iso8601",

&nbsp; "totals": { "total": 0.0, "currency": "EUR", "byDiscipline": \[] },

&nbsp; "breakdownByDiscipline": \[

&nbsp;   {

&nbsp;     "discipline": "string",

&nbsp;     "total": 0.0,

&nbsp;     "lineItems": \[

&nbsp;       {

&nbsp;         "measurementId": "uuid",

&nbsp;         "elementCode": "string",

&nbsp;         "quantity": 0.0,

&nbsp;         "unit": "string",

&nbsp;         "unitCost": 0.0,

&nbsp;         "lineTotal": 0.0

&nbsp;       }

&nbsp;     ]

&nbsp;   }

&nbsp; ],

&nbsp; "revisionId": "string"

}

2.7 Scenario

{

&nbsp; "id": "uuid",

&nbsp; "projectId": "uuid",

&nbsp; "name": "string",

&nbsp; "description": "string|null",

&nbsp; "createdAt": "iso8601",

&nbsp; "updatedAt": "iso8601",

&nbsp; "revisionId": "string"

}

2.8 ScenarioCompare

{

&nbsp; "projectId": "uuid",

&nbsp; "baseScenarioId": "uuid|null",

&nbsp; "compareScenarioIds": \["uuid"],

&nbsp; "generatedAt": "iso8601",

&nbsp; "totalsByScenario": \[

&nbsp;   { "scenarioId": "uuid|null", "totals": { "total": 0.0, "currency": "EUR", "byDiscipline": \[] } }

&nbsp; ],

&nbsp; "delta": \[

&nbsp;   { "scenarioId": "uuid|null", "deltaTotal": 0.0 }

&nbsp; ]

}

2.9 ExportJob (status/progress lock)

{

&nbsp; "exportId": "uuid",

&nbsp; "projectId": "uuid",

&nbsp; "type": "enum: \[PDF, XLSX, JSON, CSV]",

&nbsp; "status": "enum: \[Queued, Processing, Completed, Failed]",

&nbsp; "progress": 0,

&nbsp; "stage": "string|null",

&nbsp; "fileName": "string|null",

&nbsp; "mimeType": "string|null",

&nbsp; "size": "int|null",

&nbsp; "createdAt": "iso8601",

&nbsp; "completedAt": "iso8601|null",

&nbsp; "revisionId": "string"

}

2.10 Plan (GET /me/plan lock)

Conform export patch

{

&nbsp; "planId": "string",

&nbsp; "usage": {

&nbsp;   "pdfExportsThisMonth": 0,

&nbsp;   "xlsxExportsThisMonth": 0,

&nbsp;   "jsonExportsThisMonth": 0,

&nbsp;   "csvExportsThisMonth": 0

&nbsp; },

&nbsp; "limits": {

&nbsp;   "maxPdfExportsPerMonth": 0,

&nbsp;   "maxXlsxExportsPerMonth": 0,

&nbsp;   "maxJsonExportsPerMonth": 0,

&nbsp;   "maxCsvExportsPerMonth": 0,

&nbsp;   "pdfWatermark": true

&nbsp; }

}

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3\) ENDPOINTS (EXACT LOCK)

Protected = Authorization required + rate limit headers + X-Plan + X-Library-Version.

3.1 AUTH

POST /login (public)

Req headers: Content-Type: application/json

Req body:

{ "email": "string", "password": "string" }

Responses:

•	200:

{

&nbsp; "token": "string",

&nbsp; "expiresIn": 0,

&nbsp; "user": { "id": "uuid", "email": "string", "plan": "string" }

}

•	401 INVALID\_CREDENTIALS (error model)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.2 PLAN

GET /me/plan (protected, ETag required)

Req headers: Authorization, optional If-None-Match

Resp headers: + ETag

Responses: 200, 304, 401, 403, 500

Resp body: Plan

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.3 PROJECTS (Overzicht tab)

GET /projects/{projectId} (protected, ETag required)

Req: Authorization, optional If-None-Match

Resp: ProjectDetail

Status: 200|304|401|403|404|500

PATCH /projects/{projectId} (protected)

Req headers: Authorization, Content-Type, If-Match

Req body (at least 1 field):

{

&nbsp; "name": "string|null",

&nbsp; "projectCategory": "string|null",

&nbsp; "regionCode": "string|null"

}

Resp: ProjectDetail

Status: 200|401|403|404|412|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.4 STRUCTURE (Structuur tab)

GET /projects/{projectId}/structure (protected, ETag required)

Resp body: { "items": \[StructureNode], "collectionRevisionId": "string" }

Status: 200|304|401|403|404|500

POST /projects/{projectId}/structure (protected)

Req headers: Authorization, Content-Type, Idempotency-Key

Req body:

{

&nbsp; "parentId": "uuid|null",

&nbsp; "type": "project|building|floor|unit|room|zone|custom",

&nbsp; "name": "string",

&nbsp; "sortOrder": 0,

&nbsp; "meta": { "label": "string|null", "number": "string|null" }

}

Resp: StructureNode

Status: 201|401|403|404|409|500

PATCH /projects/{projectId}/structure/{nodeId} (protected)

Req headers: Authorization, Content-Type, If-Match

Req body:

{ "name": "string|null", "sortOrder": 0, "parentId": "uuid|null", "meta": { "label": "string|null", "number": "string|null" } }

Resp: StructureNode

Status: 200|401|403|404|412|500

DELETE /projects/{projectId}/structure/{nodeId} (protected)

Req headers: Authorization, If-Match

Resp: { "deleted": true }

Status: 200|401|403|404|409|412|500

409 rule: als node children/measurements heeft → STRUCTURE\_NODE\_NOT\_EMPTY

PUT /projects/{projectId}/structure/bulk (protected, ATOMIC)

Req headers: Authorization, Content-Type, If-Match (op collectionRevisionId)

Req body:

{

&nbsp; "operations": \[

&nbsp;   { "op": "upsert", "node": { "id": "uuid|null", "parentId": "uuid|null", "type": "string", "name": "string", "sortOrder": 0, "meta": { "label": "string|null", "number": "string|null" } } },

&nbsp;   { "op": "delete", "id": "uuid" }

&nbsp; ]

}

Resp: { "items": \[StructureNode], "collectionRevisionId": "string" }

Status: 200|401|403|404|412|409|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.5 DRAWINGS (Tekeningen tab)

GET /projects/{projectId}/drawings (protected, ETag required)

Resp: { "items": \[Drawing], "collectionRevisionId": "string" }

Status: 200|304|401|403|404|500

POST /projects/{projectId}/drawings (protected)

Upload policy (locked): multipart/form-data

Req headers: Authorization, Idempotency-Key

Form fields: file (binary)

Resp: Drawing

Status: 201|401|403|404|409|500

DELETE /projects/{projectId}/drawings/{drawingId} (protected)

Req headers: Authorization, If-Match

Resp: { "deleted": true }

Status: 200|401|403|404|412|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.6 MEASUREMENTS (Metingen tab)

GET /projects/{projectId}/measurements (protected, ETag required)

Resp: { "items": \[RoomMeasurement], "collectionRevisionId": "string" }

Status: 200|304|401|403|404|500

POST /projects/{projectId}/measurements (protected)

Req headers: Authorization, Content-Type, Idempotency-Key

Req body:

{

&nbsp; "structureNodeId": "uuid",

&nbsp; "elementCode": "string",

&nbsp; "quantity": 0.0,

&nbsp; "unit": "string",

&nbsp; "note": "string|null"

}

Rules:

•	elementCode moet bestaan in CalqCore voor project.libraryVersion

•	lifecycle archived verboden

Resp: RoomMeasurement

Status: 201|401|403|404|409|500

PATCH /projects/{projectId}/measurements/{measurementId} (protected)

Req headers: Authorization, Content-Type, If-Match

Req body:

{ "quantity": 0.0, "note": "string|null", "structureNodeId": "uuid|null" }

Resp: RoomMeasurement

Status: 200|401|403|404|412|500

DELETE /projects/{projectId}/measurements/{measurementId} (protected)

Req headers: Authorization, If-Match

Resp: { "deleted": true }

Status: 200|401|403|404|412|500

PUT /projects/{projectId}/measurements/bulk (protected, ATOMIC)

Req headers: Authorization, Content-Type, If-Match (collectionRevisionId)

Req body:

{

&nbsp; "operations": \[

&nbsp;   { "op": "upsert", "measurement": { "id": "uuid|null", "structureNodeId": "uuid", "elementCode": "string", "quantity": 0.0, "unit": "string", "note": "string|null" } },

&nbsp;   { "op": "delete", "id": "uuid" }

&nbsp; ]

}

Resp: { "items": \[RoomMeasurement], "collectionRevisionId": "string" }

Status: 200|401|403|404|412|409|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.7 CALCULATION (Berekening tab)

POST /projects/{projectId}/calculate (protected)

Req headers: Authorization, Content-Type, Idempotency-Key

Req body (locked):

{

&nbsp; "scenarioId": "uuid|null",

&nbsp; "useSnapshot": true,

&nbsp; "options": {

&nbsp;   "includeLineItems": true

&nbsp; }

}

Rules:

•	berekening gebruikt project.libraryVersion

•	geen auto recalculation (alleen via deze call)

Resp: CalculationResult

Status: 200|401|403|404|409|500

GET /projects/{projectId}/calculations/{calculationId} (protected, ETag required)

Resp: CalculationResult

Status: 200|304|401|403|404|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.8 SCENARIOS (Scenario’s tab)

GET /projects/{projectId}/scenarios (protected, ETag required)

Resp: { "items": \[Scenario], "collectionRevisionId": "string" }

Status: 200|304|401|403|404|500

POST /projects/{projectId}/scenarios (protected)

Req headers: Authorization, Content-Type, Idempotency-Key

Req body:

{ "name": "string", "description": "string|null" }

Resp: Scenario

Status: 201|401|403|404|409|500

PATCH /projects/{projectId}/scenarios/{scenarioId} (protected)

Req headers: Authorization, Content-Type, If-Match

Req body:

{ "name": "string|null", "description": "string|null" }

Resp: Scenario

Status: 200|401|403|404|412|500

DELETE /projects/{projectId}/scenarios/{scenarioId} (protected)

Req headers: Authorization, If-Match

Resp: { "deleted": true }

Status: 200|401|403|404|409|412|500

POST /projects/{projectId}/scenarios/compare (protected)

Req headers: Authorization, Content-Type, Idempotency-Key

Req body (locked):

{

&nbsp; "baseScenarioId": "uuid|null",

&nbsp; "compareScenarioIds": \["uuid"]

}

Resp: ScenarioCompare

Status: 200|401|403|404|409|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.9 EXPORTS (Rapport tab) — v2.3.4 HARDENED

Conform export patch en UI export flow

POST /projects/{projectId}/exports (protected)

Req headers: Authorization, Content-Type, Idempotency-Key

Req body (locked):

{

&nbsp; "type": "PDF|XLSX|JSON|CSV",

&nbsp; "scenarioId": "uuid|null",

&nbsp; "snapshotId": "uuid|null",

&nbsp; "includeScenarioCompare": false,

&nbsp; "includeAudit": false

}

Plan gating:

•	Als limit overschreden → 402 PLAN\_LIMIT\_EXCEEDED

•	Counters increment alleen bij Completed

Resp: ExportJob

Status: 201|401|403|404|402|409|500

GET /projects/{projectId}/exports/{exportId} (protected, ETag required)

Resp: ExportJob

Status: 200|304|401|403|404|500

GET /projects/{projectId}/exports/{exportId}/download (protected)

A) Default: 302 signed URL

•	Status 302

•	Headers:

o	Location: <signed-url>

o	X-Export-Url-Expires-At: <iso8601>

B) Alternative: 200 stream

•	Status 200

•	Headers:

o	Content-Type: <mime>

o	Content-Disposition: attachment; filename="<fileName>"

o	ETag: "<etag>"

o	Cache-Control: private, max-age=0, no-store

C) Not ready

•	Status 409

•	code EXPORT\_NOT\_READY

•	details { status, progress, stage }

D) Failed

•	Status 500

•	code EXPORT\_FAILED

•	details { reason }

E) Deleted

•	Status 404 RESOURCE\_NOT\_FOUND

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.10 VERSIONS (Projectversies tab)

GET /projects/{projectId}/versions (protected, ETag required)

Resp:

{

&nbsp; "items": \[

&nbsp;   {

&nbsp;     "versionId": "uuid",

&nbsp;     "projectId": "uuid",

&nbsp;     "timestamp": "iso8601",

&nbsp;     "author": { "id": "uuid", "email": "string" },

&nbsp;     "libraryVersion": "string",

&nbsp;     "changeSummary": "string"

&nbsp;   }

&nbsp; ]

}

Status: 200|304|401|403|404|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3.11 AUDIT LOG (Wijzigingslog tab)

(UI noemt “Wijzigingslog”; intern schema mag AuditLogEvent heten)

GET /projects/{projectId}/audit (protected, ETag required)

Resp:

{

&nbsp; "items": \[

&nbsp;   {

&nbsp;     "id": "uuid",

&nbsp;     "timestamp": "iso8601",

&nbsp;     "actor": { "id": "uuid", "email": "string" },

&nbsp;     "action": "string",

&nbsp;     "entityType": "string",

&nbsp;     "entityId": "uuid|null",

&nbsp;     "summary": "string",

&nbsp;     "details": {}

&nbsp;   }

&nbsp; ]

}

Limits: max 500 items (MVP)

Status: 200|304|401|403|404|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4\) STATUSCODE MATRIX (SNELCHECK)

(Alles protected tenzij genoemd)

•	GET resources: 200|304|401|403|404|500

•	POST create: 201|401|403|404|409|500 (+ 402 voor exports)

•	PATCH update: 200|401|403|404|412|500

•	DELETE: 200|401|403|404|412|500 (+ 409 indien business conflict)

•	Bulk: 200|401|403|404|412|409|500

•	Download: 302|200|401|403|404|409|500

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5\) STRICT UI COMPATIBILITY GUARANTEE

UI tabs en flows uit v11/v12 zijn nu één-op-één contractueel gedekt: tabs, export status UX, conflict handling, caching, no-AI terminologie scope (UI) en performance/ETag gedrag.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Waar dit “Final Lock” je tegen beschermt

•	“Andere endpoints” (verboden: base path + matrix)

•	“Half schema” (nu per endpoint required/nullable/enums)

•	“Race conditions” (revisionId/If-Match + atomic bulk)

•	“Silent breaking changes” (No Additional Fields + version bump rule)

•	“Export gedrag afwijkend” (302/200/409/500 exact vastgelegd)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_






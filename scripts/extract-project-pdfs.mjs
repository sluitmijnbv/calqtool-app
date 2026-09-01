#!/usr/bin/env node
/**
 * Extract all PDFs from a ZIP or folder into searchable text + structured index.
 *
 * Usage:
 *   node scripts/extract-project-pdfs.mjs [inputPath] [outputDir]
 *
 * Defaults:
 *   inputPath  -> projects/herenstraat-64/source/
 *   outputDir  -> projects/herenstraat-64/extracted/
 */

import { execFileSync } from "node:child_process"
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from "node:fs"
import { basename, dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const DEFAULT_INPUT = join(ROOT, "projects/herenstraat-64/source")
const DEFAULT_OUTPUT = join(ROOT, "projects/herenstraat-64/extracted")

const DRAWING_HINTS = [
  { type: "plattegrond", patterns: [/plattegrond/i, /verdieping/i, /begane grond/i, /bg\b/i, /1e\s*verd/i] },
  { type: "doorsnede", patterns: [/doorsnede/i, /snede/i, /sectie/i] },
  { type: "gevel", patterns: [/gevel/i, /aanzicht/i, /voorgevel/i, /achtergevel/i] },
  { type: "detail", patterns: [/detail/i, /aansluit/i, /kozijn/i] },
  { type: "installatie", patterns: [/installatie/i, /elektra/i, /sanitair/i, /hvac/i, /ventilatie/i, /warmte/i] },
  { type: "constructie", patterns: [/constructie/i, /fundering/i, /draag/i, /staal/i, /beton/i] },
  { type: "situatie", patterns: [/situatie/i, /locatie/i, /kadaster/i] },
  { type: "begroting", patterns: [/begroting/i, /kosten/i, /offerte/i, /raming/i] },
  { type: "vergunning", patterns: [/omgevingsvergunning/i, /vergunning/i, /bestemmingsplan/i] }
]

function run(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }).trim()
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
}

function isZip(filePath) {
  return filePath.toLowerCase().endsWith(".zip")
}

function findPdfs(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) findPdfs(full, acc)
    else if (entry.name.toLowerCase().endsWith(".pdf")) acc.push(full)
  }
  return acc.sort()
}

function unzipTo(sourceZip, targetDir) {
  ensureDir(targetDir)
  run("unzip", ["-o", sourceZip, "-d", targetDir])
}

function slugify(name) {
  return name
    .replace(/\.pdf$/i, "")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .slice(0, 120) || "document"
}

function classifyDrawing(fileName, text) {
  const haystack = `${fileName}\n${text.slice(0, 4000)}`
  const matches = DRAWING_HINTS
    .filter(h => h.patterns.some(p => p.test(haystack)))
    .map(h => h.type)
  return matches.length ? [...new Set(matches)] : ["onbekend"]
}

function extractAreas(text) {
  const found = new Set()
  const patterns = [
    /\b(\d{1,4}(?:[.,]\d{1,2})?)\s*m[²2]\b/gi,
    /\b(\d{1,4}(?:[.,]\d{1,2})?)\s*GO\b/gi,
    /\b(\d{1,4}(?:[.,]\d{1,2})?)\s*BVO\b/gi
  ]
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(text)) !== null) {
      found.add(match[0].replace(/\s+/g, " "))
      if (found.size >= 30) break
    }
  }
  return [...found]
}

function extractScale(text) {
  const match = text.match(/\b1\s*:\s*(\d{1,4})\b/)
  return match ? `1:${match[1]}` : null
}

function extractFloors(fileName, text) {
  const haystack = `${fileName}\n${text.slice(0, 2000)}`
  const floors = []
  if (/\bbg\b|begane grond|beg\.?\s*grond/i.test(haystack)) floors.push("BG")
  if (/1e\s*verd|eerste verdieping|\b1\s*e\b/i.test(haystack)) floors.push("1e")
  if (/2e\s*verd|tweede verdieping/i.test(haystack)) floors.push("2e")
  if (/zolder|dakverdieping/i.test(haystack)) floors.push("zolder")
  return [...new Set(floors)]
}

function pdfInfo(pdfPath) {
  try {
    const raw = run("pdfinfo", [pdfPath])
    const info = {}
    for (const line of raw.split("\n")) {
      const idx = line.indexOf(":")
      if (idx === -1) continue
      info[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
    }
    return {
      pages: Number(info.Pages || 0),
      title: info.Title || null,
      creator: info.Creator || null,
      producer: info.Producer || null,
      creationDate: info["CreationDate"] || null
    }
  } catch {
    return { pages: 0, title: null, creator: null, producer: null, creationDate: null }
  }
}

function pdfText(pdfPath) {
  try {
    return run("pdftotext", ["-layout", pdfPath, "-"])
  } catch {
    return ""
  }
}

function prepareInput(inputPath, workDir) {
  const resolved = resolve(inputPath)
  if (!existsSync(resolved)) {
    throw new Error(`Input niet gevonden: ${resolved}`)
  }

  const stat = statSync(resolved)
  if (stat.isDirectory()) {
    return { pdfRoot: resolved, sourceType: "folder" }
  }

  if (isZip(resolved)) {
    const unzipDir = join(workDir, "_unzipped")
    rmSync(unzipDir, { recursive: true, force: true })
    unzipTo(resolved, unzipDir)
    return { pdfRoot: unzipDir, sourceType: "zip", zipFile: resolved }
  }

  if (resolved.toLowerCase().endsWith(".pdf")) {
  const singleDir = join(workDir, "_single")
    ensureDir(singleDir)
    const target = join(singleDir, basename(resolved))
    copyFileSync(resolved, target)
    return { pdfRoot: singleDir, sourceType: "pdf" }
  }

  throw new Error("Ondersteund: map, .zip of enkel .pdf bestand")
}

function main() {
  const inputPath = process.argv[2] || DEFAULT_INPUT
  const outputDir = resolve(process.argv[3] || DEFAULT_OUTPUT)
  const textsDir = join(outputDir, "texts")
  const summariesDir = join(outputDir, "summaries")
  const copiesDir = join(outputDir, "pdfs")

  ensureDir(textsDir)
  ensureDir(summariesDir)
  ensureDir(copiesDir)

  const { pdfRoot, sourceType, zipFile } = prepareInput(inputPath, outputDir)
  const pdfs = findPdfs(pdfRoot)

  if (!pdfs.length) {
    console.error("Geen PDF-bestanden gevonden in:", inputPath)
    process.exit(1)
  }

  const documents = []
  let totalPages = 0

  for (const pdfPath of pdfs) {
    const fileName = basename(pdfPath)
    const relPath = relative(pdfRoot, pdfPath)
    const slug = slugify(fileName)
    const info = pdfInfo(pdfPath)
    const text = pdfText(pdfPath)
    const categories = classifyDrawing(fileName, text)
    const areas = extractAreas(text)
    const scale = extractScale(text)
    const floors = extractFloors(fileName, text)

    const textOut = join(textsDir, `${slug}.txt`)
    const summaryOut = join(summariesDir, `${slug}.json`)
    const copyOut = join(copiesDir, fileName)

    writeFileSync(textOut, text, "utf8")
    copyFileSync(pdfPath, copyOut)

    const summary = {
      fileName,
      relativePath: relPath,
      slug,
      pages: info.pages,
      categories,
      floors,
      scale,
      areasFound: areas,
      title: info.title,
      textLength: text.length,
      textPreview: text.replace(/\s+/g, " ").trim().slice(0, 500),
      paths: {
        pdf: relative(ROOT, copyOut),
        text: relative(ROOT, textOut),
        summary: relative(ROOT, summaryOut)
      }
    }

    writeFileSync(summaryOut, JSON.stringify(summary, null, 2), "utf8")
    documents.push(summary)
    totalPages += info.pages
    console.log(`✓ ${fileName} (${info.pages} pag.) → ${categories.join(", ")}`)
  }

  const metadataPath = join(ROOT, "projects/herenstraat-64/metadata.json")
  const metadata = existsSync(metadataPath)
    ? JSON.parse(readFileSync(metadataPath, "utf8"))
    : null

  const index = {
    generatedAt: new Date().toISOString(),
    source: {
      type: sourceType,
      input: resolve(inputPath),
      zipFile: zipFile || null
    },
    stats: {
      pdfCount: documents.length,
      totalPages,
      totalTextChars: documents.reduce((n, d) => n + d.textLength, 0)
    },
    project: metadata,
    byCategory: Object.fromEntries(
      DRAWING_HINTS.map(h => h.type).concat(["onbekend"]).map(cat => [
        cat,
        documents.filter(d => d.categories.includes(cat)).map(d => d.slug)
      ])
    ),
    documents
  }

  writeFileSync(join(outputDir, "index.json"), JSON.stringify(index, null, 2), "utf8")

  const overviewLines = [
    "# Herenstraat 64 — PDF extractie overzicht",
    "",
    `Gegenereerd: ${index.generatedAt}`,
    `PDF's: ${index.stats.pdfCount} | Pagina's: ${index.stats.totalPages}`,
    "",
    "## Documenten",
    ""
  ]

  for (const doc of documents) {
    overviewLines.push(
      `### ${doc.fileName}`,
      `- Categorie: ${doc.categories.join(", ")}`,
      `- Verdiepingen: ${doc.floors.length ? doc.floors.join(", ") : "niet gedetecteerd"}`,
      `- Schaal: ${doc.scale || "niet gedetecteerd"}`,
      `- Oppervlaktes gevonden: ${doc.areasFound.length ? doc.areasFound.join(", ") : "geen"}`,
      `- Tekst: \`${doc.paths.text}\``,
      ""
    )
  }

  writeFileSync(join(outputDir, "OVERVIEW.md"), overviewLines.join("\n"), "utf8")
  console.log(`\nKlaar: ${documents.length} PDF's → ${outputDir}`)
}

main()

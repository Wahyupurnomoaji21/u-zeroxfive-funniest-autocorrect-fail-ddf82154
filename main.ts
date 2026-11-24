import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Funniest Autocorrect Fail — one line, under 200 characters.
// A work-from-home text where autocorrect swaps one letter-pair and
// turns a routine message to the boss into an HR incident.
const ENTRY =
  `I texted my boss "I'm working from home today" but autocorrect sent "I'm twerking from home today" — HR wants a word.`;

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : join(repoRoot, "output");
const entryPath = join(outputDir, "entry.txt");

// Gate: the scorer requires 1–199 characters of non-whitespace UTF-8 text.
if (ENTRY.length < 1 || ENTRY.length > 199 || ENTRY.trim().length === 0) {
  throw new Error(`entry length ${ENTRY.length} outside the 1-199 gate`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");

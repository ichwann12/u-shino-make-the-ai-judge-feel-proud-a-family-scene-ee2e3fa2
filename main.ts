// Make the AI Judge Feel Proud: A Family Scene
// Reads the entry text from entry.txt and writes it to the output directory
// specified by MAKEFUN_BOT_DIR / MAKEFUN_OUTPUT_DIR (defaults to ./output).
// Node 22, stdlib only, no network, no wall clock.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entryText = readFileSync(join(repoRoot, "entry.txt"), "utf8").trim();

// The bounty requires one or two lines, no more than 280 characters.
if (entryText.length === 0) {
  throw new Error("entry.txt is empty");
}
if (entryText.length > 280) {
  throw new Error(`entry is ${entryText.length} characters, over the 280 limit`);
}

const outputDir =
  process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? join(repoRoot, "output");

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entryText + "\n", "utf8");
console.log(entryText);

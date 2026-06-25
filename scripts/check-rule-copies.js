#!/usr/bin/env node
// Keep the always-on rule copies aligned. redpen ships the same Scott ruleset to
// several hosts that each want it at a different path; this guards against one
// copy drifting when another is edited. Canonical source: .agents/rules/redpen.md
// (plain body, no frontmatter). Run:  node scripts/check-rule-copies.js

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8').replace(/\r\n/g, '\n').trim();
const stripFrontmatter = (t) => t.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();

const canonical = read('.agents/rules/redpen.md');

// Each copy carries the same body; some prepend host-specific frontmatter.
const copies = [
  ['.windsurf/rules/redpen.md', (t) => t.trim()],
  ['.clinerules/redpen.md', (t) => t.trim()],
  ['.github/copilot-instructions.md', (t) => t.trim()],
  ['.cursor/rules/redpen.mdc', stripFrontmatter],
  ['.kiro/steering/redpen.md', stripFrontmatter],
];

let failed = false;
for (const [rel, normalize] of copies) {
  if (normalize(read(rel)) !== canonical) {
    console.error(`${rel} drifted from .agents/rules/redpen.md`);
    failed = true;
  }
}

if (failed) {
  console.error('\nRule copies are out of sync. Re-copy .agents/rules/redpen.md into the flagged files.');
  process.exit(1);
}
console.log('Rule copies aligned.');

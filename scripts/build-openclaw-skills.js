#!/usr/bin/env node
// Generate the OpenClaw / ClawHub skill package (.openclaw/skills/) from the
// canonical skills/. OpenClaw skills use the same SKILL.md format redpen already
// ships, with one difference: `description` must be a single line under 160
// chars. redpen's canonical description is long (tuned for Claude's skill
// picker), so a short one is supplied here. The body is copied verbatim from
// skills/<name>/SKILL.md so the reviewer behavior never drifts; only the
// frontmatter is rewritten.
//
// Run:  node scripts/build-openclaw-skills.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HOMEPAGE = 'https://github.com/sina-z/redpen';

const DESCRIPTIONS = {
  redpen:
    'Scott red-pens your diff for embarrassing leftovers before you ship: debug output, TODOs, placeholder junk, stray secrets, test artifacts.',
};

function sourceBody(name) {
  const src = fs
    .readFileSync(path.join(ROOT, 'skills', name, 'SKILL.md'), 'utf8')
    .replace(/\r\n/g, '\n');
  const fm = src.match(/^---\n[\s\S]*?\n---\n?/);
  if (!fm) throw new Error(`skills/${name}/SKILL.md has no frontmatter`);
  return src.slice(fm[0].length).trim();
}

function render(name) {
  const desc = DESCRIPTIONS[name];
  if (desc.length > 160 || desc.includes('\n') || desc.includes('"')) {
    throw new Error(`description for ${name} must be one line, no quotes, under 160 chars`);
  }
  return (
    `---\nname: ${name}\ndescription: ${desc}\nhomepage: ${HOMEPAGE}\nlicense: MIT\n---\n\n` +
    sourceBody(name) +
    '\n'
  );
}

for (const name of Object.keys(DESCRIPTIONS)) {
  const dir = path.join(ROOT, '.openclaw', 'skills', name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'SKILL.md'), render(name));
  console.log(`wrote .openclaw/skills/${name}/SKILL.md`);
}

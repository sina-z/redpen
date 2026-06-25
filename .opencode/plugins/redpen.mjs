// redpen — OpenCode plugin (thin).
//
// redpen is a pull-request reviewer, not an always-on ruleset, so this plugin
// does ONE job: register the /redpen-review slash command so it works when the
// package is installed from npm. There is no every-turn injection and no mode
// switching — Scott's persona rides along via this repo's AGENTS.md, which
// OpenCode auto-loads. Running from a checkout of this repo, OpenCode also
// discovers .opencode/command/*.md directly, so the command works even without
// this plugin.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Parse an OpenCode command file: `--- frontmatter --- body`.
export function parseCommandFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Tolerate CRLF: a Windows checkout (autocrlf) delivers \r\n, npm ships \n.
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const description = match[1].match(/description:\s*(.+)/)?.[1]?.trim();
  return { description, template: match[2].trim() };
}

export default async () => ({
  // Register the slash command(s) from .opencode/command/.
  config: async (config) => {
    if (!config.command) config.command = {};
    const commandDir = path.join(__dirname, '..', 'command');
    try {
      for (const file of fs.readdirSync(commandDir).filter((f) => f.endsWith('.md'))) {
        const parsed = parseCommandFile(path.join(commandDir, file));
        if (parsed) config.command[path.basename(file, '.md')] = parsed;
      }
    } catch (e) {
      // No command dir (e.g. an odd install layout) — the command simply won't
      // register; AGENTS.md still carries Scott. Nothing to crash over.
    }
  },
});

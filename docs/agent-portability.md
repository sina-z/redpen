# Agent portability

redpen is an agent-portable skill. The behavior lives in `skills/redpen/SKILL.md`
(Scott + the catch-list); everything else is a thin adapter that loads that
behavior into a given agent. redpen is a **pull-request reviewer** — it acts when
you ask it to red-pen a diff — so unlike an always-on ruleset it ships **no
lifecycle hooks and no mode dial**. The adapters either register the
`/redpen-review` command or load Scott as an always-on instruction so he's ready
when you ask.

## Supported adapters

| Host | Files | Tier | Notes |
|------|-------|------|-------|
| Claude Code | `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `commands/redpen-review.md`, `skills/` | plugin | `/plugin install redpen@redpen-marketplace`; command is `/redpen:redpen-review`. |
| Codex (CLI + desktop) | `.codex-plugin/plugin.json`, `skills/` | plugin | Skills install; in Codex the review is a skill, invoke with `@redpen`. Same install covers the desktop app (restart after installing). |
| GitHub Copilot CLI | `.github/plugin/`, `commands/`, `skills/`, `AGENTS.md` | plugin | `copilot plugin marketplace add sina-z/redpen` + `copilot plugin install redpen@redpen`. Fallback: reads `AGENTS.md` / `.github/copilot-instructions.md`. |
| GitHub Copilot (editor) | `.github/copilot-instructions.md` | instruction | Repository instruction file; loads Scott, red-pen on request. |
| OpenCode | `.opencode/command/redpen-review.md`, `.opencode/plugins/redpen.mjs`, `opencode.json`, `AGENTS.md`, `skills/` | command | Auto-loads `AGENTS.md` for Scott; the thin plugin registers the `/redpen-review` command (also discovered from `.opencode/command/` when run from a checkout). |
| Gemini CLI | `gemini-extension.json`, `AGENTS.md`, `commands/redpen-review.toml`, `skills/` | extension | `gemini extensions install https://github.com/sina-z/redpen`. Manifest points `contextFileName` at `AGENTS.md`; the `.toml` command is auto-discovered. |
| Antigravity (`agy`) | `gemini-extension.json`, `.agents/plugins/marketplace.json`, `.agents/rules/redpen.md`, `AGENTS.md` | extension | `agy plugin install https://github.com/sina-z/redpen` (reuses the Gemini manifest). `/redpen-review` arrives as a chat message. `.agents/rules/` works as an always-on workspace rule. |
| pi | `pi-extension/`, `skills/` | extension | `pi install git:github.com/sina-z/redpen`. The extension registers `/redpen-review`; the skill carries Scott. |
| OpenClaw | `.openclaw/skills/redpen/SKILL.md`, `AGENTS.md` | skill | `clawhub install redpen`, or copy `.openclaw/skills/redpen` into `~/.openclaw/skills/`. Generated from `skills/` by `scripts/build-openclaw-skills.js`. |
| Cursor | `.cursor/rules/redpen.mdc` | rule | Always-on project rule that loads Scott; red-pen on request. |
| Windsurf | `.windsurf/rules/redpen.md` | rule | Project rule. |
| Cline | `.clinerules/redpen.md` | rule | Project rule. |
| Kiro | `.kiro/steering/redpen.md` | steering | Copy to `~/.kiro/steering/` (global) or `.kiro/steering/` in a project. |
| Swival | `skills/`, `AGENTS.md` | skill | `swival skills add https://github.com/sina-z/redpen` installs the skill; `--global` stages it in the library. |
| Zed / Aider / CodeWhale | `AGENTS.md` | instruction | Read `AGENTS.md` from the repo root as project instructions. CodeWhale also reads `CLAUDE.md` / `.claude/instructions.md` as fallbacks. |
| VS Code + Codex extension | `AGENTS.md` | instruction | The Codex extension reads `AGENTS.md` (repo root, or `~/.codex/AGENTS.md` globally). |
| Generic agents | `AGENTS.md` or `skills/redpen/SKILL.md` | instruction | Copy the compact rule file, or load the skill directly. |

## Adapter rule

Keep adapters thin. When a host supports skills, point it at `skills/`. When a
host only supports project instructions, copy the canonical rule body and keep it
aligned with `.agents/rules/redpen.md` (run `node scripts/check-rule-copies.js`).

## Portable behavior

- `skills/redpen/SKILL.md` — Scott's review behavior and the catch-list (runtime source of truth)
- `commands/redpen-review.md` — the `/redpen-review` command (Claude Code / Copilot CLI)
- `commands/redpen-review.toml` — the same command for Gemini CLI
- `.opencode/command/redpen-review.md` — the same command for OpenCode
- `.agents/rules/redpen.md` — canonical compact always-on rule body; copied into the rule/instruction adapters
- `AGENTS.md` — compact always-on instruction set for agents without skill support

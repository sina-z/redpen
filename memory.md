# redpen — build session handoff

## What this is
An opinionated AI-agent skill called **redpen**. Mascot: **Scott** — a calm,
grounded, veteran code reviewer who catches the embarrassing leftovers before
they reach production. Inspired by / reverse-engineered from the repo "ponytail"
(MIT licensed) — we copy the *chassis* of that genre and build our own *soul*.
Keep an "inspired by ponytail" credit in the README; ship under MIT.

## Why I'm building it (the real goal)
Not stars. The point is confidence + building a public name + practicing the
muscle of taking a small idea and *packaging and shipping* it under my handle.
v1 is deliberately tiny. I have a BI background, not deep SWE — that's fine,
because this genre is ~80% writing + copy-paste plumbing.

## The Value (the one belief)
"Nothing that was only ever meant for YOU should reach production. Ship clean —
no embarrassing leftovers." (Born from a real "fuck you" comment that shipped to
prod at my old job.)

## The Persona
Scott — calm, experienced, red-pen reviewer. Quietly circles what would embarrass
you. (Named after a real senior dev who posted a red-pen emoji in PR reviews.)

## The Ladder / behavior (v1)
Scott reviews the DIFF (the pull-request moment) and hands back a red-pen list of
leftover junk to clean. v1 = catch the junk. Later = Scott also questions the
code's design (his second real talent).

## The catch-list (what Scott flags)
- Debug output: console.log / print / debugger / leftover breakpoints
- Commented-out code & dead experiments
- TODO / FIXME / HACK / XXX markers left unresolved
- Placeholder & junk text: lorem ipsum, "asdf", "test123", profanity, "remove me"
- Hardcoded local/test values: localhost URLs, personal paths/names, magic test data
- Secrets that shouldn't be there: test API keys, tokens, credentials
- Test artifacts: .only / .skip left in tests, skipped assertions
- Variables/logs created only for debugging

## Copy vs build
- COPY the chassis: repo shape, plugin/command structure, distribution plumbing,
  the *idea* of one belief + one mascot + a before/after proof.
- BUILD fresh: the value, Scott, the catch-list, the proof metric
  (junk caught/prevented — NOT lines of code).

## v1 scope (start small, scale later)
A code-review skill + a /redpen-review command, shipped as a Claude Code plugin
and a universal AGENTS.md. No always-on hook, no lite/full/ultra dial, no
14-agent matrix yet.

## Scaling backlog (future knobs)
as-you-code prevention (hook) · pre-ship whole-repo audit · Scott questions the
design · lite/full/ultra/off dial · more agents · a real benchmark.

## Build status — v1 files DONE
All v1 files written and finalized:
README.md, skills/redpen/SKILL.md, commands/redpen-review.md,
.claude-plugin/plugin.json, .claude-plugin/marketplace.json, AGENTS.md,
LICENSE (MIT), .gitignore.
- Author filled in everywhere: name "Sina", handle "sina-z".
  Install line: `/plugin marketplace add sina-z/redpen`.
- DROPPED the ponytail credit entirely — the result isn't close to ponytail;
  only the generic genre shape was ever shared, which nobody owns. No attribution
  needed. (Memory's earlier "keep a ponytail credit" note is now overridden.)
- .gitignore covers OS/editor cruft + a .env/secrets block (on-brand: the tool
  catches stray secrets, so its own repo shouldn't leak one).
- No venv — repo is pure Markdown/JSON, nothing Python to isolate. (Only add a
  venv + requirements.txt if the backlog ever ships Python tooling, e.g. a hook
  or benchmark.)

## Next action in the new chat
Ship it. Sina pushes to GitHub himself:
1. Create an EMPTY `redpen` repo on GitHub (no README/license — we already have
   both, else first push conflicts).
2. `git init` → add → commit → `git branch -M main` →
   `git remote add origin https://github.com/sina-z/redpen.git` → `git push -u origin main`.
Then verify with `claude plugin validate .` (the CLI is the source of truth; the
published JSON-schema URL doesn't resolve). After it's live, test
`/plugin marketplace add sina-z/redpen` + `/redpen-review` on a real diff.

## Optional polish (offered, not yet done)
An `examples/` folder with a deliberately junk-filled sample diff + Scott's
expected red-pen output — doubles as a smoke test and a README screenshot.
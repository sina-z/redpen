<p align="center">
  <img src="assets/scott.png" width="300" alt="Scott — the redpen mascot, a calm veteran reviewer with a red pen behind his ear">
</p>

<div align="center">

# <img src="assets/redpen.png" alt="" height="34" valign="middle"> $\textcolor{red}{\textsf{redpen}}$

</div>

---

<p align="center"><em>Want to ship clean? Ping Scott and he red-pens your diff before it ships.</em></p>

<p align="center">
  <img src="https://img.shields.io/github/stars/sina-z/redpen?style=flat-square&labelColor=8a8a8a&color=000000" alt="Stars">
  <img src="https://img.shields.io/badge/release-v0.2.0-000000?style=flat-square&labelColor=8a8a8a" alt="Release v0.2.0">
  <img src="https://img.shields.io/badge/works_with-15%2B_agents-000000?style=flat-square&labelColor=8a8a8a" alt="Works with 15+ agents">
  <img src="https://img.shields.io/badge/license-MIT-000000?style=flat-square&labelColor=8a8a8a" alt="License MIT">
</p>

Back in the day, I had a colleague. A veteran dev. When it came to PR reviews, he
*actually read them* — line by line — and he was never afraid to use his red pen.
Steady, never loud. He saved a lot of us from ourselves, and kept the codebase
honest.

> **The one belief:** Nothing that was only ever meant for *you* should reach
> production. Ship clean — no embarrassing leftovers.

Now he's your colleague. Meet **Scott** — calm, grounded, seen everything,
not fussed. He circles the embarrassing leftovers before they reach production:
the debug print you forgot, the note-to-self TODO, the `localhost` URL, the
`// asdf`, and the test key you swear you'd pull out later.

redpen reviews the **diff** and hands back a short
red-pen list of junk to clean. That's v1. It does one thing and does it calmly.

---

## What Scott catches

- **Debug output** — `console.log`, `print`, `debugger`, stray breakpoints
- **Commented-out code** & dead experiments
- **Unresolved markers** — `TODO`, `FIXME`, `HACK`, `XXX`
- **Placeholder & junk text** — `lorem ipsum`, `asdf`, `test123`, profanity
- **Hardcoded local/test values** — `localhost`, personal paths, magic data
- **Stray secrets** — test keys, tokens, credentials (flagged first, masked)
- **Test artifacts** — `.only` / `.skip` left in tests, skipped assertions

He flags only **added or changed** lines in the diff — he won't red-pen code you
didn't touch. And he circles by default; he only cleans things up if you ask.

---

## Install

### As a Claude Code plugin

```
/plugin marketplace add sina-z/redpen
/plugin install redpen@redpen-marketplace
```

Then, on any branch with changes:

```
/redpen:redpen-review
```

Optionally point him at a base branch or a path:

```
/redpen:redpen-review main
/redpen:redpen-review src/auth.ts
```

> **Note:** Claude Code namespaces plugin commands as `/<plugin>:<command>`, so
> the command is `/redpen:redpen-review`, not `/redpen-review`. After installing,
> type `/redpen` and it will autocomplete.

### Codex

Install the plugin (covers the Codex CLI and, after a restart, the desktop app):

```
codex plugin marketplace add sina-z/redpen
codex plugin install redpen@redpen
```

In Codex the review is a skill — invoke it with `@redpen` (or just ask Scott to
red-pen your diff).

### GitHub Copilot CLI

```
copilot plugin marketplace add sina-z/redpen
copilot plugin install redpen@redpen
```

Or the slash equivalents in an interactive session (`/plugin marketplace add …`,
`/plugin install …`). No plugin? Copilot also reads
[`AGENTS.md`](./AGENTS.md) and [`.github/copilot-instructions.md`](./.github/copilot-instructions.md).

### Gemini CLI / Antigravity

```
gemini extensions install https://github.com/sina-z/redpen
```

Google's renaming Gemini CLI to Antigravity (`agy`); the same extension installs
there with `agy plugin install https://github.com/sina-z/redpen`. On Antigravity
the command arrives as a chat message (`/redpen-review`) rather than a slash menu.

### OpenCode

Run OpenCode from a checkout of this repo and add to `opencode.json`:

```
{ "plugin": ["./.opencode/plugins/redpen.mjs"] }
```

OpenCode auto-loads this repo's [`AGENTS.md`](./AGENTS.md) for Scott; the plugin
registers the `/redpen-review` command (also discovered from `.opencode/command/`
when run from the checkout).

### pi

```
pi install git:github.com/sina-z/redpen
```

Registers `/redpen-review`; the skill carries Scott.

### OpenClaw

```
clawhub install redpen
```

Without ClawHub, copy [`.openclaw/skills/redpen`](./.openclaw/skills) into
`~/.openclaw/skills/`.

### Cursor, Windsurf, Cline, Kiro, Copilot (editor)

No plugin system? Copy the matching rules file into your repo (or your agent's
rules) and Scott is on call — just ask him to "red-pen my diff":
[`.cursor/rules/`](./.cursor/rules),
[`.windsurf/rules/`](./.windsurf/rules),
[`.clinerules/`](./.clinerules),
[`.kiro/steering/`](./.kiro/steering),
[`.github/copilot-instructions.md`](./.github/copilot-instructions.md).

### As a universal `AGENTS.md`

The lowest-effort path. Copy [`AGENTS.md`](./AGENTS.md) into your repo root (or
paste it into your agent's rules). Scott then works in Zed, Aider, CodeWhale,
Swival, VS Code's Codex extension, and anything else that reads `AGENTS.md` —
just ask it to "red-pen my diff."

> Every supported host and which file feeds it:
> [docs/agent-portability.md](./docs/agent-portability.md).

---

## What it looks like

```
✏️ Scott's red pen — 3 things to clean before this ships

🔴 Secrets (1)
  📍 src/config.ts:14   const STRIPE_KEY = "sk_live_4eC…XaQ"
     ✏️ Live key hardcoded in the diff. Move it to an env var and rotate it.

🟠 Debug leftovers (1)
  📍 src/auth.ts:88     console.log("user obj", user)
     ✏️ Console log left from debugging the login flow.

🟡 Notes-to-self (1)
  📍 src/api.ts:42      // TODO: handle the timeout case
     ✏️ Unresolved TODO riding along into prod.

Verdict: 3 leftovers. Quick cleanup and it's clean to ship. ✏️
```

Clean diff? He'll tell you that too, and get out of your way.

---

## License

[MIT](./LICENSE).

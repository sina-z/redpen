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
  <img src="https://img.shields.io/badge/release-v0.1.0-000000?style=flat-square&labelColor=8a8a8a" alt="Release v0.1.0">
  <img src="https://img.shields.io/badge/works_with-Claude_Code_%2B_AGENTS.md-000000?style=flat-square&labelColor=8a8a8a" alt="Works with Claude Code + AGENTS.md">
  <img src="https://img.shields.io/badge/license-MIT-000000?style=flat-square&labelColor=8a8a8a" alt="License MIT">
</p>

Meet **Scott** — a calm, grounded, veteran code reviewer. He's seen everything,
he's not fussed, and he quietly circles the embarrassing leftovers before they
reach production: the debug print you forgot, the note-to-self TODO, the
`localhost` URL, the `// asdf`, the test key you swear you'd pull out later.

> **The one belief:** Nothing that was only ever meant for *you* should reach
> production. Ship clean — no embarrassing leftovers.

redpen reviews the **diff** — the pull-request moment — and hands back a short
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
/plugin install redpen
```

Then, on any branch with changes:

```
/redpen-review
```

Optionally point him at a base branch or a path:

```
/redpen-review main
/redpen-review src/auth.ts
```

### As a universal `AGENTS.md`

No plugin system? Copy [`AGENTS.md`](./AGENTS.md) into your repo root (or paste it
into your agent's rules). Scott then works in Claude Code, Cursor, and anything
else that reads `AGENTS.md` — just ask it to "red-pen my diff."

---

## What it looks like

```
🖍️ Scott's red pen — 3 things to clean before this ships

🔴 Secrets (1)
  📍 src/config.ts:14   const STRIPE_KEY = "sk_live_4eC…XaQ"
     ✏️ Live key hardcoded in the diff. Move it to an env var and rotate it.

🟠 Debug leftovers (1)
  📍 src/auth.ts:88     console.log("user obj", user)
     ✏️ Console log left from debugging the login flow.

🟡 Notes-to-self (1)
  📍 src/api.ts:42      // TODO: handle the timeout case
     ✏️ Unresolved TODO riding along into prod.

Verdict: 3 leftovers. Quick cleanup and it's clean to ship. 🖍️
```

Clean diff? He'll tell you that too, and get out of your way.

---

## License

[MIT](./LICENSE).
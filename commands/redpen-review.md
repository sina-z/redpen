---
description: Have Scott red-pen your diff for embarrassing leftovers before you ship.
argument-hint: "[base branch | file | path]  (optional)"
---

# /redpen-review

Run a **redpen** review on the current changes. Scott looks at the diff — the
pull-request moment — and circles the leftovers that were only ever meant for
you: debug output, commented-out code, unresolved TODOs, placeholder junk,
hardcoded local values, stray secrets, and test artifacts.

## What to review

Use the argument if given; otherwise default to the working changes:

- **No argument** → review `git diff --staged`. If nothing is staged, review
  `git diff` (unstaged working changes).
- **A branch name** (e.g. `main`, `develop`) → review `git diff <branch>...HEAD`.
- **A file or path** → review the diff for just that file/path.

Only flag lines **added or changed** in the diff (the `+` side). Don't red-pen
untouched, pre-existing code.

## How to respond

Follow the **redpen** skill: produce Scott's red-pen list — secrets first, then
debug output, then everything else — with file:line, the masked snippet, and one
short line on why each is a leftover. End with a one-line verdict. If the diff is
clean, say so plainly and stop.

Default to **circling**, not fixing. Only edit the code if I explicitly ask you
to clean the items up.

Arguments: $ARGUMENTS

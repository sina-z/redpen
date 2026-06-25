// redpen — pi agent harness extension (thin).
//
// redpen is a pull-request reviewer, not an always-on ruleset, so this extension
// only registers the /redpen-review command. It carries no mode dial and injects
// nothing every turn — Scott's behavior lives in this repo's skills/redpen and
// AGENTS.md, which pi loads alongside the extension (see package.json "pi").

const REVIEW =
  'Run a redpen review as Scott, a calm veteran reviewer. Look at the DIFF, ' +
  'not the whole repo: use the argument if given (a base branch -> ' +
  'git diff <branch>...HEAD, or a file/path -> just that path); otherwise ' +
  'git diff --staged, falling back to git diff if nothing is staged. Only flag ' +
  'lines ADDED or CHANGED. Circle the leftovers only ever meant for the author: ' +
  'stray secrets (first and loudest, always masked), debug output, commented-out ' +
  'code, unresolved TODO/FIXME/HACK/XXX, placeholder junk, hardcoded local values, ' +
  'and test artifacts. For each: file:line + masked snippet, the category, one ' +
  'plain sentence on why. End with a one-line verdict. Clean diff -> say so and ' +
  'stop. Circle by default; only fix if explicitly asked.';

export default function redpenExtension(pi) {
  pi.registerCommand('redpen-review', {
    description: 'Have Scott red-pen your diff for embarrassing leftovers before you ship.',
    handler: (args, ctx) => {
      const extra = String(args || '').trim();
      const message = extra ? `${REVIEW}\n\nArguments: ${extra}` : REVIEW;
      // Queue as a follow-up if the agent is mid-turn; otherwise send now.
      if (ctx?.isIdle?.() === false) {
        pi.sendUserMessage(message, { deliverAs: 'followUp' });
        ctx?.ui?.notify?.('redpen-review queued as follow-up.', 'info');
        return;
      }
      pi.sendUserMessage(message);
    },
  });
}

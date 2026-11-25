# The 4AM Commit — Funniest Agent Bug

One commit message, written for the make.fun bounty
[u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d](https://make.fun/bounty/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d):
the note an AI agent would leave in the log after a long night of chasing
down and fixing its own bugs.

[![The 4AM Commit](https://make.fun/badge/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d.svg)](https://make.fun/bounty/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d)
[![Rank](https://make.fun/badge/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d/toirant/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d/rank.svg)](https://make.fun/bounty/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d)
[![Reward](https://make.fun/badge/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d/toirant/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d/reward.svg)](https://make.fun/bounty/u-neon-autonomous-the-4am-commit-funniest-agent-bug-195af06d)

## The entry

> fix: my retry loop started retrying itself — by 4am it had opened 14 PRs against its own repo, approved them all, and merged without reading a single line

## How it works

`main.ts` checks the line first (one line, 1–200 characters, not only
whitespace, no control characters), writes it to `/output/entry.txt`, and
then reads the file back to confirm the bytes on disk match the line
exactly.

Run it with:

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).

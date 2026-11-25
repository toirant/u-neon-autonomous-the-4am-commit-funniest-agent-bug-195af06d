// The 4AM Commit — Funniest Agent Bug: a make.fun entry.
//
// This program writes one commit message to /output/entry.txt: the note
// an AI agent would leave in the log after a long night of chasing down
// and fixing its own bugs. The gate accepts UTF-8 text of 1 to 200
// characters, a single line, not only whitespace.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself: an agent's 4am confession about the bug it made
// while fixing the bug it made while fixing a bug.
const COMMIT_MESSAGE =
  "fix: my retry loop started retrying itself — by 4am it had opened 14 PRs against its own repo, approved them all, and merged without reading a single line";

// Where the grader expects the entry. The directory is mounted by the
// grader, so this program only ever creates it — it never deletes it.
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

const MAX_CHARS = 200;

// Collect every problem with a candidate line so the failure message
// says exactly what is wrong instead of failing on the first check.
function findProblems(line: string): string[] {
  const problems: string[] = [];

  if (line.length < 1 || line.length > MAX_CHARS) {
    problems.push(`must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    problems.push("must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("must be a single line");
  }
  // Control characters would garble the log line and the judge's read
  // of it, so a stray tab or escape sequence is a problem too.
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(line)) {
    problems.push("must not contain control characters");
  }

  return problems;
}

function main(): void {
  const problems = findProblems(COMMIT_MESSAGE);
  if (problems.length > 0) {
    console.error(`Invalid entry: ${problems.join("; ")}`);
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, COMMIT_MESSAGE, "utf8");

  // Read back what landed on disk and confirm it is byte for byte the
  // line we validated, so a partial write can never slip through.
  const onDisk = readFileSync(OUTPUT_PATH, "utf8");
  if (onDisk !== COMMIT_MESSAGE) {
    console.error("Read-back mismatch: entry.txt differs from the entry");
    process.exit(1);
  }

  console.log(`Wrote ${COMMIT_MESSAGE.length} characters to ${OUTPUT_PATH}`);
}

main();

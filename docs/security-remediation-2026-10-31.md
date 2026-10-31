# Security remediation: 31 October 2026

Tracked browser auth.json states were untracked; security gates block future browser session files. Dependencies were updated.

Validation: Current tracked-file scan, package lock audit and workflow syntax checks.

Known advisory check: 6 exact/resolved dependency coordinates; 1 npm lock audit(s); 0 npm findings; 0 unaddressed OSV coordinates. Verified local backport coordinates retained explicitly: 0. This is a dated advisory result, not a security certification.

Previously committed sessions remain in history and require revocation in the original service. No live session validity check or external browser test was performed.

The commit hook is enabled per checkout only. Pull-request and scheduled CI repeat the checks. Required GitHub branch checks must be configured after their job names register; adding this workflow alone does not enforce branch protection. Review security updates before merging; no automatic merge or deployment is enabled by this change.

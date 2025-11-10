<!--
Sync Impact Report

- Version change: TEMPLATE -> 1.0.0
- Modified principles: template placeholders -> Code Quality; Testing Standards; User Experience Consistency; Performance Requirements; Cross-cutting Practices
- Added sections: Development Workflow, Governance (expanded)
- Removed sections: none
- Templates requiring updates: .specify/templates/plan-template.md ✅ updated
									   .specify/templates/spec-template.md ✅ updated
									   .specify/templates/tasks-template.md ✅ updated
- Follow-up TODOs: none
-->

# learn-redux Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

- All code MUST be statically typed where language support exists (TypeScript/Flow/Swift/Kotlin) and pass the project's type checks before merge.
- Linting and formatting MUST run in CI and be enforced as a pre-merge gate (errors block merges).
- Code MUST be modular, have a single responsibility, and expose clear boundaries (public API vs internal). Large changes require a design note.

Rationale: High code quality reduces defects, improves maintainability, and enables safer, faster change.

### II. Testing Standards (NON-NEGOTIABLE)

- Tests MUST be written before or alongside implementation (TDD preferred). Every new feature or bug fix MUST include unit tests.
- Integration and end-to-end tests are REQUIRED for critical flows (auth, data persistence, sync, CI-deploy paths). Contract tests are REQUIRED for public interfaces.
- Coverage expectations: Core libraries and critical paths SHOULD aim for >=80% line coverage; coverage targets must be documented in the feature plan when stricter goals apply.
- CI MUST run unit, integration, and smoke tests; failing tests MUST block merges.

Rationale: Automated tests are the primary safety net. They make refactors safe and speed up delivery.

### III. User Experience Consistency (MUST / GUIDED)

- Visual and interaction patterns MUST follow the project's design tokens and component library. Deviations require design approval and documented rationale.
- Accessibility: UI components MUST meet WCAG AA where applicable. Keyboard navigation, semantic labels, and readable contrast are required for primary flows.
- UX changes MUST include user scenarios, acceptance criteria, and measurable success criteria in the spec.

Rationale: Consistent UX reduces user confusion, support costs, and increases product trust.

### IV. Performance Requirements (MUST / MEASURABLE)

- Feature plans MUST declare performance goals (p95 latency, memory, throughput) and measurable benchmarks. If none declared, default goals apply: UI interactions <200ms p95; API p95 <300ms under expected load.
- Performance tests or benchmarks MUST be included for features impacting loading, rendering, network, or CPU-heavy operations.
- Any change that increases memory or CPU usage by >15% in critical paths MUST include mitigation or justification and an approved rollback plan.

Rationale: Explicit performance targets keep the product responsive and scalable as features are added.

### V. Cross-cutting Practices

- Observability: Services and critical components MUST emit structured logs and metrics. Errors MUST be captured with context and correlated to traces where available.
- Security & Privacy: Sensitive data MUST be handled according to legal and company guidelines; secrets MUST NOT be checked into source control.
- Simplicity: Prefer the simplest solution that satisfies requirements. Avoid premature optimization and unnecessary abstraction.

Rationale: These practices reduce operational risk and keep the system understandable.

## Development Workflow

- All work MUST be driven by a spec in `/specs/<feature-name>/spec.md` and a short implementation plan in `plan.md`.
- Pull requests MUST include: the related spec/plan link, tests that demonstrate the change, and a short performance and security impact note when applicable.
- Code review MUST verify: typechecks, linting, tests passing, adherence to design tokens for UI changes, and that performance/security notes were considered.
- Quality gates in CI: lint → typecheck → unit tests → integration tests → smoke tests. Any failing gate blocks merge.

## Governance

- Amendment procedure: Proposals to change the constitution are made as a spec and PR. Minor clarifications (patch) can be amended with a simple PR and two approving reviewers. Material changes (new principles or removals) require an explicit discussion and a 2/3 approval from active maintainers and increment the MAJOR or MINOR version as appropriate.
- Versioning rules: Use semantic versioning for the constitution file itself. MAJOR: removes or redefines principles in incompatible ways. MINOR: adds a new principle or materially expands guidance. PATCH: wording, clarifications, or typo fixes.
- Compliance reviews: At every major release the team MUST run a constitution compliance check (automated checklist) that validates CI gates, tests presence, and performance measurements for high-impact features.

**Version**: 1.0.0 | **Ratified**: 2025-11-10 | **Last Amended**: 2025-11-10

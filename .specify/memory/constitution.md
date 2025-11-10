# learn-redux Constitution

## Core Principles

### Small and Simple
The project must remain small and with a limited scope. New features must be justified and approved.

### Clean Code
Code must be clear, readable, and follow best practices. Avoid duplication and maintain consistency in style.

### No Automated Tests
The project must not include automated tests. Quality assurance will rely on code reviews and manual testing.

### Composition Over Inheritance
Components should prioritize composition over inheritance. This ensures better reusability, flexibility, and simpler code structures.

Rationale: Composition allows for more modular and maintainable code, avoiding the pitfalls of deep inheritance hierarchies.

### Changelog Maintenance
Every commit must be documented in a `changelogs.md` file, summarizing the changes made.

Rationale: This ensures transparency and provides a clear history of project evolution.

## Additional Constraints
- Use React Native, Android, and iOS natively.
- Avoid unnecessary dependencies.

## Development Workflow
- Use branches for new features.
- Code reviews are mandatory for significant changes.

## Governance
Changes to this constitution must be approved by the main maintainer.

### Git Flow
The project follows the Git Flow branching model. Development occurs in feature branches, which are merged into `develop`. Releases are prepared in `release` branches and merged into `main`.

Rationale: Git Flow provides a structured workflow for managing features, releases, and hotfixes.

### Conventional Commits
All commit messages must follow the Conventional Commits specification. This ensures consistent and meaningful commit history.

Rationale: Conventional Commits improve readability and enable automated tools to generate changelogs and versioning.

**Version**: 1.1.0 | **Ratified**: 2025-11-06 | **Last Amended**: 2025-11-09

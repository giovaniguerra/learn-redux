# Data Model: Mobile — Users (two screens)

This document captures the primary data model for the feature and local
metadata required for offline-first behavior and synchronization.

Entity: User

- Source of truth: remote API (JSONPlaceholder-style schema used as reference)

Fields (core remote fields)

- id: string | integer (external id assigned by backend) — optional for local-only records
- name: string (required)
- username: string (optional)
- email: string (required, validate format)
- address: object (optional)
  - street: string
  - suite: string
  - city: string
  - zipcode: string
- phone: string (optional)
- website: string (optional)
- company: object (optional)
  - name: string

Local metadata (required for offline-first)

- localId: string (UUID) — unique identifier for local-only records
- lastModifiedAt: ISO8601 timestamp — when this record was last changed locally
- syncState: enum { synced, pending, error } — sync status for the record
- remoteId: string|int — the backend id once acknowledged
- conflictCount: integer — number of unresolved sync conflicts (optional)

Validation rules

- `name` and `email` are required for create/save operations.
- `email` must pass a standard email regex validation.
- `phone` can be validated with a lenient pattern (digits, spaces, +, -).

State transitions (sync lifecycle)

1. Local Create (offline): create record with `localId`, set `syncState = pending`, set `lastModifiedAt`.
2. Sync Attempt: syncManager attempts to POST/PUT. On success, set `remoteId`, `syncState = synced`.
3. Sync Failure: set `syncState = error`, record metadata for retry/backoff.
4. Local Edit while pending: update record, bump `lastModifiedAt`, keep `syncState = pending`.
5. Conflict: if remote version has newer timestamp, apply last-write-wins by timestamp (default); increment `conflictCount` and surface to UI if >0.

Relationships

- No additional entities for MVP. Address and company kept as nested objects.

# Data Model

## Entities

### User
- id: number | string (server IDs are numeric; local additions may use UUID)
- name: string
- email: string
- phone?: string
- username?: string
- website?: string
- address?: { city?: string; street?: string }
- company?: { name?: string }

## Relationships
- None (flat list managed in Redux store)

## Validation
- name: required, min 2 chars
- email: required, valid email format

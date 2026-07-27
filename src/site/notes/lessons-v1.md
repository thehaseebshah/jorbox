---
category: Shabab Skills Curriculum
dg-publish: true
name: Shabab Skills v1 Lessons (Feb 2025)
---

# Shabab Skills v1 Lessons (Feb 2025)

```base
properties:
  file.name:
    displayName: "#"
views:
  - type: table
    name: Table
    filters:
      and:
        - note["lesson-batch"] == "Feb 2025"
    order:
      - file.name
      - note.name
      - lesson-batch
      - module
    sort:
      - property: file.name
        direction: ASC
```

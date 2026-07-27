---
category: Shabab Tarbiyah Curriculum
dg-publish: true
name: Shabab Skills Lessons
---

# Shabab Skills Lessons

```base
properties:
  file.name:
    displayName: "#"
views:
  - type: table
    name: Table
    filters:
      and:
        - note["lesson-batch"] == "July 2026"
    order:
      - file.name
      - note.name
      - lesson-batch
      - module
    sort:
      - property: file.name
        direction: ASC
```

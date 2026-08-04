---
{"dg-publish":true,"permalink":"/v1/lessons-v1/","dg-note-properties":{"category":"Shabab Skills Curriculum"}}
---

### Shabab Skills Lessons (Feb 2025)
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

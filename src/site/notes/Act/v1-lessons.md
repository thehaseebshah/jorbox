---
{"dg-publish":true,"permalink":"/act/v1-lessons/","dg-note-properties":{"category":"JorBox Activity","name":"V1 Lessons","type":"shabab-act","final":false,"added-to-shabab":false,"tried":false,"rating":null}}
---

### Shabab Skills v1 Lessons (Feb 2025)
#### How to Play
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

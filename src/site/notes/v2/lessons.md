---
{"dg-publish":true,"permalink":"/v2/lessons/","dg-note-properties":{"category":"JorBox Activity","type":"shabab-act","difficulty":3,"rating":null}}
---

### Shabab Skills Lessons
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
      - name
      - lesson-batch
      - module
    sort:
      - property: file.name
        direction: ASC
      - property: name
        direction: DESC
    columnSize:
      note.name: 162

```

---
{"dg-publish":true,"permalink":"/act/lessons/","dg-note-properties":{"category":"Shabab Tarbiyah Curriculum","name":"Shabab Skills Lessons"}}
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

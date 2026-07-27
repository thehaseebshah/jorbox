---
{"dg-publish":true,"permalink":"/lessons/","dg-note-properties":{"category":"Shabab Tarbiyah Curriculum"}}
---

# Shabab Skills Lessons

```base
formulas:
  name: readH1(file.inputPath)
views:
  - type: table
    name: Table
    filters:
      and:
        - note["lesson-batch"] == "July 2026"
    order:
      - file.name
      - formula.name
      - lesson-batch
      - module
    sort:
      - property: file.name
        direction: ASC
```

---
dg-publish: true
---
# Shabab Skills Lessons

```base
views:
  - type: table
    name: Table
    filters:
      and:
        - note["lesson-batch"] == "July 2026"
    order:
      - file.name
      - lesson-batch
      - module
    sort:
      - property: file.name
        direction: ASC
```

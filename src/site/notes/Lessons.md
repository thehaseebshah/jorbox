---
dg-publish: true
---
# July 2026 Lessons Table

```base
views:
  - type: table
    name: Table
    filters:
      and:
        - note["lesson-batch"] == "July 2026"
    order:
      - file.name
      - file.ctime
      - lesson-batch
      - module
    sort:
      - property: file.name
        direction: ASC
```

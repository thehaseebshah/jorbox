---
category: JorBox Activity
dg-publish: true
name: "Lessons V1"
type: shabab-act
final: false
added-to-shabab: false
tried: false
rating:
---
### Shabab Skills v1 Lessons (Feb 2025)

#### How to Play
### How to Play

### How to Play

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

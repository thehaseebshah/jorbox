---
category: JorBox Activity
dg-publish: true
name: "Lessons"
type: shabab-act
final: false
added-to-shabab: false
tried: false
rating:
---
### Shabab Skills Lessons

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

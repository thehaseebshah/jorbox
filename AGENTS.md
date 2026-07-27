# Agent Instructions & Project Rules

## Markdown Notes Synchronization Rule
- Whenever any markdown notes in `src/site/notes/` are created, updated, modified, or deleted, you MUST replicate all changes to `D:\Shabab` (`/mnt/d/Shabab/`).
- `src/site/notes/` and `D:\Shabab` (`/mnt/d/Shabab/`) MUST be kept strictly in sync at all times.
- Note: `D:\JorBox` has been renamed to `D:\Shabab`.

## Obsidian Digital Garden Publishing
- We use the **Obsidian Digital Garden plugin** to publish notes directly from the Obsidian Vault located at `D:\Shabab` (`/mnt/d/Shabab/`).
- Publishing via the Digital Garden plugin ensures that all attachments, image embeds (`![[...]`), and Obsidian wikilinks are properly converted and resolved for the site.

## Attachment & Image Embed Link Syntax Rule
- Standard Markdown image links (e.g. `![alt](/img/user/Attachments/Pasted%20image...)` or `![alt](/img/user/...)`) CANNOT render inside the Obsidian Vault.
- In both `src/site/notes/` and `D:\Shabab` (`/mnt/d/Shabab/`), ALL image attachments MUST use Obsidian Wikilink embed syntax: `![[Pasted image 20260727004152.png]]` or `![[filename.ext]]`.
- Never leave converted/raw HTML or standard Markdown path image links in notes; always convert them to Obsidian Wikilink embeds (`![[Pasted image ...]]`).

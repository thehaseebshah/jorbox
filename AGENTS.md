# Agent Instructions & Project Rules

## Markdown Notes Synchronization Rule
- Whenever any markdown notes in `src/site/notes/` are created, updated, modified, or deleted, you MUST replicate all changes to `D:\Shabab` (`/mnt/d/Shabab/`).
- `src/site/notes/` and `D:\Shabab` (`/mnt/d/Shabab/`) MUST be kept strictly in sync at all times.
- Note: `D:\JorBox` has been renamed to `D:\Shabab`.

## Obsidian Digital Garden Publishing
- We use the **Obsidian Digital Garden plugin** to publish notes directly from the Obsidian Vault located at `D:\Shabab` (`/mnt/d/Shabab/`).
- Publishing via the Digital Garden plugin ensures that all attachments, image embeds (`![[...]`), and Obsidian wikilinks are properly converted and resolved for the site.

## Attachment & Image Embed Link Syntax Rule
- Notes in Obsidian Vault `D:\Shabab` (`/mnt/d/Shabab/`) use Obsidian Wikilink embed syntax: `![[Pasted image ...]]` or `![[filename.ext]]`.
- The user uses the Obsidian Digital Garden plugin to publish notes from `D:\Shabab` to `src/site/notes/`, which automatically converts wikilink embeds into standard web image links.
- NEVER manually write raw Obsidian-style wikilink attachments (`![[Pasted image ...]]`) directly into markdown notes in `src/site/notes/`. Notes in `src/site/notes/` must use resolved standard web image paths (e.g. `![alt](/img/user/Attachments/...)` or `<img>` tags).

## Build & Verification Rule
- **Never run `npm run build`** to verify changes. It takes 30+ seconds and is unnecessary.
- Use **`npm test`** instead — it runs all unit tests in under 1 second and is sufficient to confirm nothing is broken.
- The user manages builds and deployments themselves.

## Metadata & Synchronization Integrity Rule
- **NO `permalink:` Frontmatter:** NEVER add or restore `permalink:` in the YAML frontmatter of any markdown notes.
- **NO Blind Copying/Overwriting:** NEVER blindly copy-paste files or overwrite notes between `src/site/notes/` and `D:\Shabab` (`/mnt/d/Shabab/`).
- **Frontmatter Differences:** Notes in `D:\Shabab` (`/mnt/d/Shabab/`) use clean top-level YAML keys (`category`, `lesson-batch`, `module`). When published via the Digital Garden plugin, metadata is generated as `dg-note-properties: {...}` in `src/site/notes/`.
- Always preserve clean metadata and respect vault vs site format distinctions when manually editing or synchronizing files.

## Dual Git Repositories Commit Rule
- Both the site repository (`/home/haseeb/Personal-Dev/Shabab-Skills/shabab/`) and the Obsidian Vault repository (`D:\Shabab` / `/mnt/d/Shabab/`) are independent git repositories.
- Whenever any notes or files are modified, created, or deleted, you MUST commit the changes to BOTH repositories (`git commit` in site repo and `git -C /mnt/d/Shabab commit` in vault repo) on each change.

## Extra Caution & Precision Rule
- **Be Extra Cautious:** ALWAYS exercise extreme care, thoroughness, and precision before performing batch edits, file modifications, or script executions.
- **Verify Original Intent & Structure:** NEVER blindly overwrite, copy, or refactor notes without verifying the exact original content and structure of both the vault and site files.
- **Surgical Modifications Only:** Make exact, targeted edits without deleting required links, headings, or metadata unless explicitly requested.



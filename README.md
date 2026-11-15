# TXT · Starlight Puzzle

Play: https://tobychito92.github.io/txt-starlight-puzzle/

## v0.5: Save codes

Use **Save code** on the home screen or inside a puzzle. Copy the complete `TXT1.…` code and keep it in Notes; paste it on another device or in the offline version to restore. Codes are snapshots, so export again after further play. Codes are not accounts or automatic cloud sync.

The code includes stage records, unlocked-card progress, equipped photos, language, daily results, the last stage and unfinished boards including notes, hearts and timers. Undo history is not persisted by the existing game. A checksum catches accidental corruption; strict format validation rejects invalid versions, records and placements. The code is not encrypted or a competitive anti-cheat mechanism. No save data leaves the browser when exporting or importing.

Imports require a preview and explicit confirmation before replacing the current save. A local backup under `txt-starlight-before-import-v1` can be previewed and restored from the same menu. If storage fails, the import does not replace the active in-memory progress. Clearing website data also clears this local backup.

## v0.4

- 120 unique-solution puzzles, all freely selectable from a fresh save. First 60 boards and their save identifiers are unchanged.
- 40 distinct member photo cards, eight per member, using official BIGHIT MUSIC minisode 3 concept photographs. Original card IDs, equipped choices, progress and sessions stay compatible.
- Cards 1–20 unlock after 1–20 distinct stage completions. Cards 21–40 unlock after 25, 30, 35 … 120 completions. Playing stage 120 first counts as one completion; replaying it does not add another. Daily challenges do not add collection progress.
- Meowdoku-style controls: single tap for ×, double-tap to place, drag for notes; three hearts, accepted placements locked, no automatic × marks. Traditional Chinese / English.

## Development

Requires Node.js 20.19+ (or 22.12+) and Python 3.

```
npm ci
npm test
npm run build
python3 -m http.server 8000
```

Open the repository root for the GitHub Pages entry, or `/dist/` for the modular source entry. `npm run build` produces `dist/TXT_Starlight_Offline.html`, embedding all 40 photos and all code. No network access is needed for the offline game's gameplay. The generated offline file is ignored by Git. Root `index.html` uses the same modular app with a relative `dist/` base and versioned scripts; commit source changes and the root entry to `main` for Pages deployment. `.nojekyll` serves assets directly.

## Validation

19 automated tests cover 120 unique solutions, connected regions, combat-free puzzle rules, notes and heart persistence, all 120 stage choices from a fresh save, last-stage resume, 40 cards/eight per member, milestone boundaries, no rewards for skipped/replayed stages, existing equipped-photo retention and newly unlocked photo equipment. Physical iOS/Android touch testing has not been performed.

## Photo sources

Official gallery: https://ibighit.com/legacy/txt/minisode-3-en.html

Exact per-image URLs are recorded in `photo-sources.json`. New selections checked 2026-11-15. Images © BIGHIT MUSIC / HYBE. This is an unofficial fan game with no official affiliation. Attribution does not constitute a commercial asset license.

Browser progress is stored per origin in `txt-starlight-v1`. The existing GitHub Pages URL retains its progress; the ChatGPT-hosted origin and downloaded HTML have separate browser storage.

# TXT · Starlight Puzzle
An unofficial fan puzzle game, with real TXT member photographs.

## Play

Public game: https://txt-starlight-puzzle-toby.tobychito.chatgpt.site/

Open the hosted Site, or generate `dist/TXT_Starlight_Offline.html` with `python3 scripts/build-offline.py` and open it in a browser. The offline HTML embeds every image, puzzle and script and has no gameplay network dependencies. Browser file preview applications may not execute HTML; use an actual browser.

60 puzzles across 5×5, 6×6, 7×7 and 8×8 boards. Place exactly one member per row, column and region; members may not touch, including diagonally. Photos are automatically assigned by region and member identity adds no extra constraint. Uses the Oakever mobile-style input and mistake rules: single tap toggles × notes, double-tap places a member, drag paints/erases notes. Correct placements stay locked. Wrong placements cost one of three hearts; the third mistake ends the attempt. Note undo/redo never restores hearts or removes accepted members. Correct placements never add automatic × marks. Only the player’s own notes are displayed. Supports restart, hints, saved progress, daily puzzle and Traditional Chinese/English. Daily challenge rotates through the shipped 6–8 grids rather than generating new puzzles. Progress is local to each browser/origin; not synced across devices. Twenty different photo cards (four per member) unlock after twenty distinct stage completions. Cards can be filtered by member, viewed full-size and equipped as board/home portraits. Hint counts are disclosed on completion.

## Assets
Photos retrieved 2026-11-14 from BIGHIT MUSIC’s official concept gallery https://ibighit.com/legacy/txt/minisode-3-en.html (Romantic + Ethereal), selected for clear faces and natural color. Exact asset URLs are in photo-sources.json: SOOBIN, YEONJUN, BEOMGYU, TAEHYUN, HUENINGKAI, and group photograph. Original images © BIGHIT MUSIC / HYBE. This game is fan-made and does not claim official affiliation or ownership of the photographs. Attribution does not constitute a commercial asset license.

## Verify
`node --test tests/*.test.cjs`
`node --check dist/app.js`

All shipped boards were checked for a unique solution, connected color regions and valid constraints. Chromium UI checks passed for placement conflicts, marking, undo/redo, hints, reload persistence, winning, next stage, card unlocks and language switch. Responsive layout visually checked in a 390×844 iframe viewport. Physical iPhone/Safari and Android testing was not performed.

## v0.2 verification
Nine automated tests pass: all 60 boards unique and connected; marks, placement locks, 3-heart game over, note-only undo/redo, auto exclusions, save migration/persistence and victory. Chromium UI verified single-tap notes, double-click placements, 5-cell drag with one-step undo/redo, heart loss surviving reload, third-error failure, retry reset, toggleable auto-cross and victory. Mobile layout checked at 390×844 via an iframe viewport; physical iOS touch/Safari not tested. These changes match the reference mobile game’s core logic and mistake/input model, not its advertisements or online leaderboard services. Reference: https://play.google.com/store/apps/details?id=com.oakever.meowdoku

## v0.3 verification
12 automated tests pass. New collection checks cover 20 unique photo assets, four per member, distinct-stage unlock thresholds and locked/wrong-member equipment rejection. Browser checks confirmed zero automatic X after a correct placement, preserved manual notes, 20 cards/4-per-member filtering, the sixth-stage reward, equipping an alternate card and persistence after reload. Original first-five unlock thresholds and existing progress are preserved. Additional photographs use the same official concept gallery, exact URLs in photo-sources.json.

## Local preview
Run `python3 -m http.server 8000 --directory dist`, then open http://localhost:8000. No package installation is needed. The generated single-file HTML is intentionally omitted from Git because it duplicates all source files and images; rebuild it with the command above.

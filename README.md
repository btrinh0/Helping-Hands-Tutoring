# Helping Hands Peer Tutoring

A static GitHub Pages site for the high school tutoring program co-founded by Brandon Trinh and Sai Uppuluri.

## Run locally

From this folder, run `python -m http.server 8000` and open [the local site](http://localhost:8000).

## Update the site

- Edit `index.html` for the program description, impact, courses, and recommendation spaces.
- Edit `match.html` and `match.js` for the course-and-teacher request form. Requests are prepared in the visitor’s browser for copying, sharing, or downloading.
- Set `tutoringEmail` in `site-config.js` when the program has an inbox. This replaces the labeled placeholder and enables a pre-addressed email draft with the request details.
- GitHub Pages serves the root of the `main` branch. Assets use relative paths so the site works under `/test2/`.

The original editorial illustrations are bundled in `assets/`. The locally hosted fonts include their SIL Open Font Licenses in `assets/fonts/`.

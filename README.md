# Nickerson’s Creative Services

A responsive, static marketing website for the family-owned Anacortes contractor. Uses the supplied logo and original SVG artwork. No dependencies, external fonts, stock photo services, or build step.

## Preview

From this folder, run `npm run dev`, then open http://localhost:5174. Set `PORT` to use another port. You can also open `index.html` directly.

## Publish

Upload `index.html`, `styles.css`, `script.js`, `NickersonsCS_SmallLogo.jpg`, and the `assets` folder to any static website host. The development server and package files are not required for hosting.

## Content

Business name, services, founding year, location, names, and phone numbers come from the supplied marketing email. Phone and text links connect visitors directly with Chris or Kelly Ann. The contact section also links to the user-provided business email, nickersonscreativeservices@gmail.com. No contact form backend is needed.

The house illustration is conceptual artwork, not a completed NCS project. Replace it with an approved project photo if desired, updating its alt text in `index.html`. The blue palette follows the supplied logo. No customer reviews, credentials, service areas beyond Anacortes, or project claims have been invented. Scheduling availability is left open so the site stays current.

## GitHub Pages

Random repository name: `cedar-lantern-35b227`. The GitHub Actions workflow publishes only the website files on pushes to `main`. It follows the [GitHub Pages custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Run `bash publish.sh` from a network-enabled terminal authenticated with `gh`. This creates a public repository, pushes the committed site, enables GitHub Pages, and triggers deployment. It prints the repository and Pages URLs; check the repository’s Actions tab for deployment completion. The script reuses an existing `origin` on subsequent runs.

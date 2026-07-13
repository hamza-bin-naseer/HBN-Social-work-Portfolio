# Hamza Bin Naseer — Social Work & Volunteer Portfolio

A complete, responsive, single-page portfolio website built with plain HTML, CSS and JavaScript. It has no external library or internet dependency.

## Open the website

Double-click `index.html`, or upload the whole folder to any static host such as GitHub Pages, Netlify, Vercel, Cloudflare Pages or your own hosting account.

## What is included

- Responsive hero section using the supplied portrait
- About, JZT journey, activities, impact, achievements and skills sections
- Filterable gallery
- Certificate placeholders
- Contact form that prepares a message in the visitor's email app
- Mobile navigation, scroll reveal effects and impact counters
- Accessibility labels, keyboard focus states and reduced-motion support

## Replace the sample images

Image files are inside `assets/images/`.

You can replace any SVG placeholder with a JPG, PNG or WebP. If the file extension changes, also update its path in `index.html`.

Suggested image ratio:

- Activity and gallery images: 1600 × 900 pixels
- Certificates: 1400 × 1000 pixels
- Hero portrait: keep the provided image or replace `hamza-hero.webp` and `hamza-hero.jpg`

## Add the CV

1. Put your CV PDF inside `assets/` and name it `Hamza-Bin-Naseer-CV.pdf`.
2. In `index.html`, find the link with `id="cv-download"` and change it to:

```html
<a class="btn btn-ghost" href="assets/Hamza-Bin-Naseer-CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
```

3. In `js/script.js`, remove the small block beginning with `// CV placeholder action`.

## Update contact information

In `index.html`, replace:

- `your.email@example.com`
- `+92 XXX XXXXXXX`
- `linkedin.com/in/your-profile`

In `js/script.js`, replace:

```js
const portfolioEmail = 'your.email@example.com';
```

## Publish for free

### GitHub Pages

Create a repository, upload the files, open **Settings → Pages**, and publish from the main branch.

### Netlify

Drag the entire extracted folder into Netlify's manual deploy area.

### Vercel

Create a new project and import the folder/repository. No build command is required because this is a static site.

## Important

The contact form is a front-end form. It opens the visitor's email application. A serverless form service can be connected later if you want messages to be stored online.

# ThreeSync Website

Static site for ThreeSync, a Roblox development group. It showcases our free Creator Store models.

## Structure

```
index.html            Page markup
style.css             All styles
script.js             Mobile menu, scroll reveal, active nav link
.nojekyll             Serve files as-is on GitHub Pages
assets/
  brand/
    threesync-icon.png            Pink 3S app icon (hero, product badge)
    threesync-wordmark-white.png  White "ThreeSync" wordmark, transparent (nav, footer)
    threesync-mark-white.png      White 3S mark, transparent (community banner)
    threesync-social-banner.png   1920×1080 link-preview image (og:image)
    favicon.png                   64×64 favicon
    apple-touch-icon.png          180×180 home-screen icon
  products/
    donation-board.png
    time-played-board.png
```

There is no product image for the Admin System yet. Its cover is drawn in HTML/CSS in the same style as the other product images. To replace it, add `assets/products/admin-system.png` and change the first card's `.product-media` block in `index.html` to use an `<img>`, like the other two cards.

## Adding a model

Copy one of the `<li class="product-card">` blocks in `index.html` and update the image, title, description and the two links.

## Deploying

1. Push to the `main` branch of `3Sync/website`.
2. On GitHub, open **Settings → Pages**, set **Source** to *Deploy from a branch*, then pick `main` and `/ (root)`.
3. The site will be live at `https://3sync.github.io/website/`.

All asset paths are relative, so the site also works on a custom domain or at a different repo path. If you use a custom domain, update the `og:url` and `og:image` URLs in `index.html`.

## Local preview

Open `index.html` directly, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

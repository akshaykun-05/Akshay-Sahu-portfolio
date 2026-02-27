SEO Actions & Next Steps for akshaysahu.online

1) Google Analytics (GA4)
- Create a GA4 property and copy Measurement ID (format: G-XXXXXXXX).
- Replace `G-XXXXXXXX` in `portfolio.html` (and optionally `index.html`) with your ID.
- Verify events: page_view will appear automatically.

2) Google Search Console (GSC)
- Add property (prefer Domain or URL-prefix).
- Verify ownership (recommended: DNS TXT for domain, or HTML file verification).
- Submit sitemap: https://akshaysahu.online/sitemap.xml
- Inspect important pages (index, portfolio) and request indexing if needed.

3) Bing Webmaster Tools
- Add site, verify, and submit sitemap (same sitemap URL).

4) Image optimization (recommended)
- Convert images to WebP and generate responsive sizes. Example using ImageMagick & cwebp:

  # ImageMagick resize + cwebp (Windows WSL or install tools):
  magick dragon.jpg -resize 1200x -quality 85 dragon-1200.jpg
  cwebp -q 80 dragon-1200.jpg -o dragon-1200.webp

- Place generated files alongside originals and ensure `srcset` references them.

5) Lighthouse / PageSpeed
- Run Lighthouse in Chrome DevTools or use PageSpeed Insights for mobile+desktop.
- Address top opportunities: unused JS, render-blocking resources, image formats, caching.

6) Robots & Sitemap
- `robots.txt` and `sitemap.xml` are in the project root. Keep them on the live domain root.

7) Structured Data
- JSON-LD for `Person` and `WebSite` added. Validate at https://search.google.com/test/rich-results

8) Backlinks & Monitoring
- Use GSC, Ahrefs, Moz, or SEMrush to monitor backlinks.
- Outreach template is in `outreach_template.md`.

9) Verification file
- If you prefer HTML verification, create a file named `googleXXXXXXXXXXXX.html` at the site root with the content GSC provides.

If you want, I can:
- Replace the GA4 placeholder with your Measurement ID.
- Prepare converted WebP images (I can provide commands or convert if you upload originals).
- Walk through Search Console submission step-by-step and generate verification HTML.

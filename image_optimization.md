Image Optimization Guide

Goal: Convert large JPG/PNG to WebP, generate responsive sizes, and update `srcset`.

Tools (choose one):
- ImageMagick + cwebp (recommended)
- Squoosh CLI
- Photoshop export

Example commands (ImageMagick + cwebp)

# Resize to 1280 wide and convert to WebP
magick input.jpg -resize 1280x -quality 85 input-1280.jpg
cwebp -q 80 input-1280.jpg -o input-1280.webp

# Create multiple sizes
magick input.jpg -resize 800x -quality 82 input-800.jpg
cwebp -q 80 input-800.jpg -o input-800.webp

# Optional: remove intermediate JPEGs after verifying WebP

Batch example (bash):
for f in *.jpg; do
  base=$(basename "$f" .jpg)
  magick "$f" -resize 1280x -quality 85 "${base}-1280.jpg"
  cwebp -q 80 "${base}-1280.jpg" -o "${base}-1280.webp"
  magick "$f" -resize 800x -quality 82 "${base}-800.jpg"
  cwebp -q 80 "${base}-800.jpg" -o "${base}-800.webp"
done

After conversion
- Place `*-1280.webp` and `*-800.webp` in the site root or `images/`.
- Update `srcset` entries in the HTML (examples were added to the repo).

Caching & CDN
- Serve images with far-future cache headers and an efficient CDN (CloudFront, Cloudflare).
- Use `Cache-Control: public, max-age=31536000, immutable` for versioned images.

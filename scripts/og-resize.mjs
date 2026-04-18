import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, "../public/og-image.png");
const dest = join(__dirname, "../public/og-image.png");

const OG_W = 1200;
const OG_H = 630;

const meta = await sharp(src).metadata();
console.log(`Original: ${meta.width}x${meta.height}`);

// Scale image to fit within canvas while preserving aspect ratio
await sharp({
  create: {
    width: OG_W,
    height: OG_H,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(src)
        .resize(OG_W, OG_H, { fit: "inside", withoutEnlargement: false })
        .toBuffer(),
      gravity: "centre",
    },
  ])
  .png()
  .toFile(dest);

console.log(`Saved: ${OG_W}x${OG_H} → ${dest}`);

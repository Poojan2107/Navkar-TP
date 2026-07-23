import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const brainDir = 'C:\\Users\\pooja\\.gemini\\antigravity-ide\\brain\\37efc124-c587-4e42-965a-7ff2c8627d7d';
const targetDir = 'd:\\Navkar\\public\\images\\navkar';

const imageMap = [
  { artifact: 'hero_main_1784721093576.png', targetName: 'hero-main' },
  { artifact: 'hero_sign_panel_1784721112219.png', targetName: 'hero-sign-panel' },
  { artifact: 'facility_signed_1784721124768.png', targetName: 'facility-signed' },
  { artifact: 'hero_yard_1784721140687.png', targetName: 'hero-yard' },
  { artifact: 'about_facility_1784721157738.png', targetName: 'about-facility' },
  { artifact: 'office_vatva_1784721170104.png', targetName: 'office-vatva' },
  { artifact: 'office_rakhial_1784721185432.png', targetName: 'office-rakhial' },
  { artifact: 'shripal_shah_1784721196649.png', targetName: 'shripal-shah' },
  { artifact: 'harsh_shah_1784721214523.png', targetName: 'harsh-shah' },
  { artifact: 'refinery_1784721230693.png', targetName: 'refinery' },
  { artifact: 'cement_1784721244674.png', targetName: 'cement' },
  { artifact: 'oilgas_1784721259060.png', targetName: 'oilgas' },
  { artifact: 'chemical_1784721273879.png', targetName: 'chemical' },
];

async function processImages() {
  console.log('Processing generated images...');

  for (const item of imageMap) {
    const srcPath = path.join(brainDir, item.artifact);
    const dstPng = path.join(targetDir, `${item.targetName}.png`);
    const dstWebp = path.join(targetDir, `${item.targetName}.webp`);

    if (!fs.existsSync(srcPath)) {
      console.error(`Artifact missing: ${srcPath}`);
      continue;
    }

    // 1. Copy PNG
    fs.copyFileSync(srcPath, dstPng);
    console.log(`Copied -> ${dstPng}`);

    // 2. Convert to WebP
    await sharp(srcPath)
      .webp({ quality: 85 })
      .toFile(dstWebp);
    console.log(`Converted -> ${dstWebp}`);

    // Special handling for hero responsive images from hero-main
    if (item.targetName === 'hero-main') {
      const heroSizes = [640, 960, 1280, 1600];
      for (const w of heroSizes) {
        const responsiveWebp = path.join(targetDir, `hero-${w}.webp`);
        await sharp(srcPath)
          .resize({ width: w })
          .webp({ quality: 85 })
          .toFile(responsiveWebp);
        console.log(`Generated responsive hero -> ${responsiveWebp}`);
      }
    }
  }

  console.log('All image processing completed successfully!');
}

processImages().catch(err => {
  console.error('Processing failed:', err);
  process.exit(1);
});

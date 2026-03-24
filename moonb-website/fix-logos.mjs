import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const LOGOS_DIR = '/Users/lorenzonicolini/Vibe Coding Projects/moonb/moonb-website/public/assets/logos/';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('//')) loc = 'https:' + loc;
        downloadFile(loc, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function main() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // === FIX LHAC ===
  console.log('\n=== Fixing LHAC ===');
  try {
    await page.goto('https://www.lhac.com', { waitUntil: 'networkidle2', timeout: 30000 });
    // Get ALL image sources on the page to find the real logo
    const lhacImgs = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.slice(0, 20).map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        classes: img.className,
        parent: img.parentElement?.className || ''
      }));
    });
    console.log('LHAC images:', JSON.stringify(lhacImgs, null, 2));
    
    // Try to find real logo - look for header images
    const lhacLogo = await page.evaluate(() => {
      // Look more broadly
      const header = document.querySelector('header') || document.querySelector('nav') || document.querySelector('.header');
      if (header) {
        const imgs = header.querySelectorAll('img');
        for (const img of imgs) {
          if (img.src && !img.src.includes('Facebook') && !img.src.includes('facebook')) {
            return img.src;
          }
        }
      }
      // Look for any SVG with logo-like attributes
      const svgs = document.querySelectorAll('svg');
      for (const svg of svgs) {
        const parent = svg.closest('a[href="/"], a[href="https://lhac.com"]');
        if (parent) return 'INLINE_SVG';
      }
      return null;
    });
    console.log('LHAC real logo:', lhacLogo);
    
    if (lhacLogo && lhacLogo !== 'INLINE_SVG') {
      await downloadFile(lhacLogo, path.join(LOGOS_DIR, 'lhac.png'));
      console.log('Downloaded LHAC logo');
    } else {
      // Screenshot the header logo area
      const logoEl = await page.$('header img, .logo img, a[class*="logo"] img, nav img');
      if (logoEl) {
        await logoEl.screenshot({ path: path.join(LOGOS_DIR, 'lhac.png'), omitBackground: true });
        console.log('Screenshot LHAC logo');
      } else {
        // Screenshot top-left area where logo typically is
        console.log('Trying header screenshot...');
        const header = await page.$('header, nav, .header');
        if (header) {
          await header.screenshot({ path: path.join(LOGOS_DIR, 'lhac.png'), omitBackground: true });
          console.log('Screenshot LHAC header');
        }
      }
    }
  } catch(e) { console.log('LHAC error:', e.message); }

  // === FIX JAGUAR ===
  console.log('\n=== Fixing Jaguar Gene Therapy ===');
  try {
    await page.goto('https://jaguargenetherapy.com', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Find all images to locate the real logo
    const jagImgs = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.slice(0, 15).map(img => ({
        src: img.src,
        alt: img.alt,
        classes: img.className,
        parent: img.parentElement?.tagName + '.' + (img.parentElement?.className || '')
      }));
    });
    console.log('Jaguar images:', JSON.stringify(jagImgs, null, 2));
    
    // Look for actual logo
    const jagLogo = await page.evaluate(() => {
      const selectors = [
        '.custom-logo',
        'header .logo img',
        'a.custom-logo-link img',
        '.site-logo img',
        'header img',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const src = el.src || el.getAttribute('src');
          if (src && !src.includes('Patients') && !src.includes('1030x')) return src;
        }
      }
      return null;
    });
    console.log('Jaguar real logo URL:', jagLogo);
    
    if (jagLogo) {
      const ext = jagLogo.includes('.svg') ? 'svg' : 'png';
      await downloadFile(jagLogo, path.join(LOGOS_DIR, `jaguar.${ext}`));
      console.log(`Downloaded Jaguar logo as ${ext}`);
    } else {
      // Screenshot the logo
      const logoEl = await page.$('.custom-logo, header img:first-of-type, .site-logo img');
      if (logoEl) {
        await logoEl.screenshot({ path: path.join(LOGOS_DIR, 'jaguar.png'), omitBackground: true });
        console.log('Screenshot Jaguar logo');
      }
    }
  } catch(e) { console.log('Jaguar error:', e.message); }

  // === FIX GENE THERAPY ===
  console.log('\n=== Fixing Gene Therapy ===');
  try {
    await page.goto('https://www.genetherapy.com', { waitUntil: 'networkidle2', timeout: 30000 });
    const currentUrl = page.url();
    console.log('Gene Therapy redirected to:', currentUrl);
    
    const gtImgs = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.slice(0, 15).map(img => ({
        src: img.src,
        alt: img.alt,
        classes: img.className,
      }));
    });
    console.log('Gene Therapy images:', JSON.stringify(gtImgs, null, 2));
    
    const gtLogo = await page.evaluate(() => {
      const selectors = [
        'header img',
        '.logo img',
        '[class*="logo"] img',
        'nav img',
        'img[alt*="logo" i]',
        'img[src*="logo" i]',
        'img:first-of-type',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.src) return el.src;
      }
      return null;
    });
    
    if (gtLogo) {
      console.log('Gene Therapy logo:', gtLogo);
      const ext = gtLogo.includes('.svg') ? 'svg' : 'png';
      await downloadFile(gtLogo, path.join(LOGOS_DIR, `genetherapy.${ext}`));
      console.log(`Downloaded Gene Therapy logo as ${ext}`);
    } else {
      // Try screenshot
      const logoEl = await page.$('header img, .logo img, nav img');
      if (logoEl) {
        await logoEl.screenshot({ path: path.join(LOGOS_DIR, 'genetherapy.png'), omitBackground: true });
        console.log('Screenshot Gene Therapy logo');
      } else {
        console.log('Gene Therapy: No logo element found. Trying page source for SVGs...');
        const pageSvgs = await page.evaluate(() => {
          const svgs = document.querySelectorAll('svg');
          return Array.from(svgs).slice(0, 5).map(s => ({
            classes: s.className?.baseVal || '',
            id: s.id,
            width: s.getAttribute('width'),
            viewBox: s.getAttribute('viewBox'),
          }));
        });
        console.log('SVGs on page:', JSON.stringify(pageSvgs));
      }
    }
  } catch(e) { console.log('Gene Therapy error:', e.message); }

  await browser.close();
}

main().catch(console.error);

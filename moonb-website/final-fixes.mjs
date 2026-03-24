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

  // === Gene Therapy - try Wayback Machine ===
  console.log('\n=== Gene Therapy via Wayback Machine ===');
  try {
    await page.goto('https://web.archive.org/web/2024/https://www.genetherapy.com/', { waitUntil: 'networkidle2', timeout: 45000 });
    const wbUrl = page.url();
    console.log('Wayback URL:', wbUrl);
    
    const wbImgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).slice(0, 15).map(i => ({
        src: i.src,
        alt: i.alt,
        classes: i.className,
      }));
    });
    console.log('Wayback images:', JSON.stringify(wbImgs, null, 2));
    
    // Check for logo
    const wbLogo = await page.evaluate(() => {
      const selectors = ['header img', '.logo img', '[class*="logo"] img', 'nav img', 'img[alt*="logo" i]', 'img[src*="logo" i]'];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el && el.src) return el.src;
      }
      return null;
    });
    if (wbLogo) {
      console.log('Found Wayback logo:', wbLogo);
      const ext = wbLogo.includes('.svg') ? 'svg' : 'png';
      try {
        await downloadFile(wbLogo, path.join(LOGOS_DIR, `genetherapy.${ext}`));
        console.log('Downloaded via Wayback');
      } catch(e) { 
        console.log('Wayback download failed:', e.message);
      }
    } else {
      console.log('No logo found on Wayback. Gene Therapy Inc site appears to have always been a landing page.');
    }
  } catch(e) { console.log('Wayback error:', e.message); }

  // === Verify BAM Capital - check if we need bigger logo ===
  console.log('\n=== Checking BAM Capital ===');
  try {
    await page.goto('https://bamcapital.com', { waitUntil: 'networkidle2', timeout: 30000 });
    const bamLogo = await page.evaluate(() => {
      const imgs = document.querySelectorAll('header img, .logo img, [class*="logo"] img, nav img');
      for (const img of imgs) {
        if (img.src && (img.src.includes('logo') || img.src.includes('Logo'))) return img.src;
      }
      // Any header image
      const headerImg = document.querySelector('header img');
      if (headerImg) return headerImg.src;
      return null;
    });
    console.log('BAM Capital logo URL:', bamLogo);
    if (bamLogo) {
      const ext = bamLogo.includes('.svg') ? 'svg' : 'png';
      await downloadFile(bamLogo, path.join(LOGOS_DIR, `bamcapgroup.${ext}`));
      console.log(`Downloaded BAM Capital as ${ext}`);
      const stat = fs.statSync(path.join(LOGOS_DIR, `bamcapgroup.${ext}`));
      console.log(`  Size: ${stat.size} bytes`);
    }
  } catch(e) { console.log('BAM Capital error:', e.message); }
  
  // === Verify Jumo Health quality ===
  console.log('\n=== Checking Jumo Health ===');
  try {
    await page.goto('https://jumohealth.com', { waitUntil: 'networkidle2', timeout: 30000 });
    const jumoLogo = await page.evaluate(() => {
      const imgs = document.querySelectorAll('header img, .logo img, [class*="logo"] img, nav img');
      for (const img of imgs) {
        if (img.src && img.src.includes('.svg')) return img.src;
      }
      // Check for SVG in header links
      const svgs = document.querySelectorAll('header svg, nav svg');
      if (svgs.length > 0) return 'INLINE_SVG';
      return null;
    });
    console.log('Jumo logo check:', jumoLogo);
    if (jumoLogo && jumoLogo !== 'INLINE_SVG') {
      await downloadFile(jumoLogo, path.join(LOGOS_DIR, 'jumohealth.svg'));
      console.log('Downloaded Jumo SVG');
    }
  } catch(e) { console.log('Jumo error:', e.message); }

  // === Check Brainfuse for SVG ===
  console.log('\n=== Checking Brainfuse for SVG ===');
  try {
    await page.goto('https://home.brainfuse.com', { waitUntil: 'networkidle2', timeout: 30000 });
    const bfLogo = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      for (const img of imgs) {
        if (img.src && img.src.toLowerCase().includes('logo') && img.src.includes('.svg')) return img.src;
      }
      return null;
    });
    console.log('Brainfuse SVG logo:', bfLogo);
    if (bfLogo) {
      await downloadFile(bfLogo, path.join(LOGOS_DIR, 'brainfuse.svg'));
      console.log('Downloaded Brainfuse SVG');
    }
  } catch(e) { console.log('Brainfuse error:', e.message); }

  await browser.close();
}

main().catch(console.error);

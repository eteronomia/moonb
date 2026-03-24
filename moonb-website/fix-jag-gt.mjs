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

  // === FIX JAGUAR ===
  console.log('\n=== Fixing Jaguar Gene Therapy ===');
  try {
    await page.goto('https://jaguargenetherapy.com', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Check the header/nav area more carefully - logo might be background image or SVG
    const headerInfo = await page.evaluate(() => {
      const header = document.querySelector('#header, .header_container, header, #header_main');
      if (!header) return { html: 'NO HEADER' };
      
      // Check for logo in header
      const logoLink = header.querySelector('.logo a, .main-logo, a.logo, .avia-logo');
      if (logoLink) {
        const img = logoLink.querySelector('img');
        if (img) return { type: 'img', src: img.src, srcset: img.srcset };
        
        const svg = logoLink.querySelector('svg');
        if (svg) return { type: 'svg', html: svg.outerHTML.substring(0, 200) };
        
        const bg = window.getComputedStyle(logoLink).backgroundImage;
        if (bg && bg !== 'none') return { type: 'bg', url: bg };
      }
      
      // Get a snippet of header HTML
      return { html: header.innerHTML.substring(0, 1000) };
    });
    console.log('Jaguar header info:', JSON.stringify(headerInfo, null, 2));
    
    // Try to find the logo image from the page source
    const pageSource = await page.content();
    const logoMatches = pageSource.match(/logo[^"]*\.(png|svg|jpg|webp)/gi) || [];
    console.log('Logo file references:', logoMatches.slice(0, 10));
    
    // Try direct screenshot of the logo area
    const logoArea = await page.$('#header_main .logo, #header .logo, .avia-logo, header .logo');
    if (logoArea) {
      await logoArea.screenshot({ path: path.join(LOGOS_DIR, 'jaguar.png'), omitBackground: true });
      console.log('Screenshot Jaguar logo area');
    } else {
      // Clip the top-left corner of the page
      console.log('Taking clip screenshot of top area...');
      await page.screenshot({ 
        path: path.join(LOGOS_DIR, 'jaguar.png'),
        clip: { x: 0, y: 0, width: 350, height: 100 },
        omitBackground: true 
      });
      console.log('Clipped screenshot saved');
    }
  } catch(e) { console.log('Jaguar error:', e.message); }

  // === FIX GENE THERAPY ===
  console.log('\n=== Fixing Gene Therapy ===');
  try {
    // Check if genetherapy.com has any useful content
    await page.goto('https://www.genetherapy.com', { waitUntil: 'networkidle2', timeout: 30000 });
    const gtUrl = page.url();
    console.log('Redirected to:', gtUrl);
    
    // Check the full page HTML for any logo references
    const gtSource = await page.content();
    const gtLogoMatches = gtSource.match(/logo[^"']*\.(png|svg|jpg|webp)/gi) || [];
    console.log('Gene Therapy logo refs:', gtLogoMatches.slice(0, 10));
    
    // Try direct URL patterns
    const possibleUrls = [
      'https://www.genetherapy.com/logo.svg',
      'https://www.genetherapy.com/logo.png',
      'https://www.genetherapy.com/images/logo.svg',
      'https://www.genetherapy.com/images/logo.png',
    ];
    
    // Check page structure
    const gtPage = await page.evaluate(() => {
      return {
        title: document.title,
        bodyHtml: document.body?.innerHTML?.substring(0, 500) || 'EMPTY',
        allImgs: Array.from(document.querySelectorAll('img')).map(i => i.src),
      };
    });
    console.log('GT page:', JSON.stringify(gtPage, null, 2));
    
    // If the page is mostly empty, take a screenshot and see what's there
    await page.screenshot({ path: '/tmp/genetherapy-page.png' });
    console.log('Full page screenshot saved to /tmp/genetherapy-page.png');
    
    // Check if there's anything in the lander
    if (gtPage.allImgs.length > 0) {
      const logoImg = gtPage.allImgs[0];
      const ext = logoImg.includes('.svg') ? 'svg' : 'png';
      await downloadFile(logoImg, path.join(LOGOS_DIR, `genetherapy.${ext}`));
      console.log('Downloaded Gene Therapy logo');
    } else if (gtSource.includes('<svg')) {
      // Extract first SVG
      const svgMatch = gtSource.match(/<svg[^>]*>[\s\S]*?<\/svg>/);
      if (svgMatch) {
        fs.writeFileSync(path.join(LOGOS_DIR, 'genetherapy.svg'), svgMatch[0]);
        console.log('Extracted inline SVG');
      }
    } else {
      // Take screenshot of the visible area
      const bodyEl = await page.$('body');
      if (bodyEl) {
        const box = await bodyEl.boundingBox();
        if (box && box.height > 0) {
          await page.screenshot({
            path: path.join(LOGOS_DIR, 'genetherapy.png'),
            clip: { x: 0, y: 0, width: Math.min(box.width, 400), height: Math.min(box.height, 150) },
            omitBackground: true
          });
          console.log('Clipped screenshot of Gene Therapy page');
        }
      }
    }
  } catch(e) { console.log('Gene Therapy error:', e.message); }

  await browser.close();
}

main().catch(console.error);

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const LOGOS_DIR = '/Users/lorenzonicolini/Vibe Coding Projects/moonb/moonb-website/public/assets/logos/';

async function main() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // === EXTRACT JAGUAR SVG ===
  console.log('\n=== Extracting Jaguar SVG ===');
  await page.goto('https://jaguargenetherapy.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  const svgContent = await page.evaluate(() => {
    const logoSvg = document.querySelector('.logo svg, #header .logo svg, .avia-logo svg');
    if (logoSvg) {
      return logoSvg.outerHTML;
    }
    return null;
  });
  
  if (svgContent) {
    fs.writeFileSync(path.join(LOGOS_DIR, 'jaguar.svg'), svgContent);
    console.log('Saved Jaguar SVG (' + svgContent.length + ' chars)');
  } else {
    console.log('No SVG found, keeping screenshot');
  }
  
  // === GENE THERAPY - wait for React to render ===
  console.log('\n=== Gene Therapy with wait ===');
  await page.goto('https://www.genetherapy.com', { waitUntil: 'networkidle0', timeout: 45000 });
  await page.waitForFunction(() => document.querySelector('#root')?.innerHTML?.length > 10, { timeout: 10000 }).catch(() => {});
  
  const gtContent = await page.evaluate(() => {
    const root = document.querySelector('#root');
    return {
      html: root?.innerHTML?.substring(0, 2000) || 'empty',
      imgs: Array.from(document.querySelectorAll('img')).map(i => ({ src: i.src, alt: i.alt })),
      svgs: Array.from(document.querySelectorAll('svg')).length,
    };
  });
  console.log('Gene Therapy after wait:', JSON.stringify(gtContent, null, 2));
  
  // If still empty, take a full page screenshot to see what's there
  await page.screenshot({ path: '/tmp/genetherapy-full.png', fullPage: true });
  console.log('Full screenshot saved');
  
  // Also check the favicon/touch icon as fallback
  const favicons = await page.evaluate(() => {
    const links = document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]');
    return Array.from(links).map(l => ({ rel: l.rel, href: l.href }));
  });
  console.log('Gene Therapy favicons:', JSON.stringify(favicons));

  await browser.close();
}

main().catch(console.error);

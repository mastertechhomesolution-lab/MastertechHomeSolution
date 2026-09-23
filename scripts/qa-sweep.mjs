// Local QA sweep: loads the listed routes in headless Edge at several widths and reports
// non-200 responses, horizontal overflow, broken images and console errors.
// Start the site first (npm.cmd run build && npm.cmd run start), then: node scripts/qa-sweep.mjs
import puppeteer from 'puppeteer-core';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = process.env.QA_BASE_URL ?? 'http://localhost:3000';
const WIDTHS = [1440, 1024, 768, 390, 320];
const ROUTES = [
  '/',
  '/products',
  '/products/traction-home-elevator',
  '/services',
  '/projects',
  '/about',
  '/news',
  '/news/traction-vs-steel-belt-home-lift',
  '/news/elevator-door-interior',
  '/contact',
];

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});
const problems = [];
for (const route of ROUTES) {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
    page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));
    await page.setViewport({ width, height: 900 });
    const res = await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 });
    if (![200, 304].includes(res.status())) problems.push(`${route} @${width} status ${res.status()}`);
    const info = await page.evaluate(() => {
      const de = document.documentElement;
      return {
        overflow: de.scrollWidth > de.clientWidth,
        widest: [...document.querySelectorAll('body *')]
          .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
          .slice(0, 5)
          .map((el) => el.tagName + '.' + (el.className?.toString?.().slice(0, 40) || '')),
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
      };
    });
    if (info.overflow) problems.push(`${route} @${width} horizontal overflow :: ${info.widest.join(' | ')}`);
    if (info.broken.length) problems.push(`${route} @${width} broken images: ${info.broken.join(', ')}`);
    if (errors.length) problems.push(`${route} @${width} console: ${errors.slice(0, 3).join(' | ')}`);
    await page.close();
  }
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'NO PROBLEMS FOUND');
process.exit(problems.length ? 1 : 0);

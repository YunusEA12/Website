const puppeteer = require('C:\\Users\\yunus\\AppData\\Local\\Temp\\puppeteer-test\\node_modules\\puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const dir = path.join(__dirname, 'temporary screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));

  // Hero
  await page.screenshot({ path: path.join(dir, 'screenshot-2-hero.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Stats + About
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(dir, 'screenshot-3-about.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  // Menu
  await page.evaluate(() => window.scrollTo(0, 2200));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(dir, 'screenshot-4-menu.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  await browser.close();
  console.log('Screenshots saved.');
})();

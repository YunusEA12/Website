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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Full page
  await page.screenshot({ path: path.join(dir, 'screenshot-5-full.png'), fullPage: true });
  console.log('Full page saved.');

  await browser.close();
})();

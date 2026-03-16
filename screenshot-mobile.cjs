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
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  const sections = [
    { id: 'hero',         scroll: 0 },
    { id: 'mittagstisch', anchor: 'mittagstisch' },
    { id: 'menu',         anchor: 'menu' },
    { id: 'reservations', anchor: 'reservations' },
  ];

  for (const s of sections) {
    if (s.anchor) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, s.anchor);
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    await new Promise(r => setTimeout(r, 700));
    await page.screenshot({ path: path.join(dir, `mobile-${s.id}.png`) });
    console.log(`Saved mobile-${s.id}.png`);
  }

  await browser.close();
})();

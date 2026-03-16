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
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const sections = [
    { id: 'hero',        scroll: 0 },
    { id: 'mittagstisch', scroll: null, anchor: 'mittagstisch' },
    { id: 'menu',        scroll: null, anchor: 'menu' },
    { id: 'gallery',     scroll: null, anchor: 'gallery' },
    { id: 'gutschein',   scroll: null, anchor: 'gutschein' },
    { id: 'reservations',scroll: null, anchor: 'reservations' },
  ];

  for (const s of sections) {
    if (s.anchor) {
      await page.evaluate((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'instant' });
      }, s.anchor);
    } else {
      await page.evaluate((y) => window.scrollTo(0, y), s.scroll);
    }
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(dir, `section-${s.id}.png`) });
    console.log(`Saved section-${s.id}.png`);
  }

  await browser.close();
})();

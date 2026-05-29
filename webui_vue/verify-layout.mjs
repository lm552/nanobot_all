import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:5173/analytics.html', { waitUntil: 'networkidle' });
await page.waitForSelector('.app-shell', { timeout: 10000 });
await page.waitForTimeout(2000);

// Element presence
const checks = [
  '.top-nav', '.nav-tab.active', '.chip', '.welcome-row',
  '.main-grid', '.kpi-card', '.right-panel', '.rp-kpi', '.rp-chart',
  '.chart-card-square', '.chart-card-wide', '.chart-card-full',
  '.strategy-section', '.strategy-card', '.export-btn',
  '.bubble-cell', '.chord-ribbon', '.tree-path', '.part-dot',
  '.ring-seg-lbl', '.contour-marker-lbl',
];

console.log('=== ELEMENT CHECK ===');
for (const sel of checks) {
  const el = await page.$(sel);
  console.log((el ? 'OK' : 'MISSING') + ' | ' + sel);
}

// Grid layout check
const gridInfo = await page.evaluate(() => {
  const grid = document.querySelector('.main-grid');
  if (!grid) return null;
  const style = window.getComputedStyle(grid);
  return {
    columns: style.gridTemplateColumns,
    rows: style.gridTemplateRows,
  };
});
console.log('\n=== GRID LAYOUT ===');
console.log('Columns:', gridInfo?.columns);
console.log('Rows:', gridInfo?.rows);

// KPI cards
const kpiCount = await page.$$eval('.kpi-card', els => els.length);
console.log('KPI cards:', kpiCount);

// Right panel span
const rightPanel = await page.evaluate(() => {
  const el = document.querySelector('.right-panel');
  if (!el) return null;
  const s = window.getComputedStyle(el);
  return { gridColumn: s.gridColumn, gridRow: s.gridRow, width: Math.round(el.getBoundingClientRect().width), height: Math.round(el.getBoundingClientRect().height) };
});
console.log('Right panel:', JSON.stringify(rightPanel));

// KPI card sizing
const kpiSizes = await page.evaluate(() => {
  const cards = document.querySelectorAll('.kpi-card');
  return Array.from(cards).map(c => {
    const r = c.getBoundingClientRect();
    const val = c.querySelector('.kpi-value')?.textContent?.trim();
    return { val, w: Math.round(r.width), h: Math.round(r.height) };
  });
});
console.log('KPI sizes:', JSON.stringify(kpiSizes));

// Chart card sizing
const chartSizes = await page.evaluate(() => {
  const square = document.querySelector('.chart-card-square');
  const wide = document.querySelector('.chart-card-wide');
  const sqR = square?.getBoundingClientRect();
  const wR = wide?.getBoundingClientRect();
  return {
    square: sqR ? `${Math.round(sqR.width)}x${Math.round(sqR.height)}` : 'N/A',
    wide: wR ? `${Math.round(wR.width)}x${Math.round(wR.height)}` : 'N/A',
  };
});
console.log('Chart sizes:', JSON.stringify(chartSizes));

// Verify no glass blur or neon strips
const hasBlur = await page.evaluate(() => {
  const cards = document.querySelectorAll('.kpi-card, .card, .right-panel');
  for (const c of cards) {
    const bf = window.getComputedStyle(c).backdropFilter;
    if (bf && bf !== 'none') return true;
  }
  return false;
});
console.log('Glass blur present:', hasBlur);

const hasNeon = await page.$('.panel-strip');
console.log('Neon strips present:', !!hasNeon);

await browser.close();
console.log('\nDone');

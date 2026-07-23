const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);

  const info = await p.evaluate(() => {
    const img = document.querySelector('.hero-split-emblem');
    const r = img.getBoundingClientRect();
    const chain = [];
    let el = img;
    while (el) {
      const cs = getComputedStyle(el);
      chain.push({
        tag: el.tagName,
        class: String(el.className || '').slice(0, 90),
        overflow: cs.overflow,
        overflowX: cs.overflowX,
        overflowY: cs.overflowY,
        clipPath: cs.clipPath,
        contain: cs.contain,
        transform: cs.transform,
        hasFilter: cs.filter !== 'none',
        isolation: cs.isolation,
        z: cs.zIndex,
        mixBlend: cs.mixBlendMode,
        w: Math.round(el.getBoundingClientRect().width),
      });
      el = el.parentElement;
    }

    // Sample page pixels near logo right edge via temporary canvas isn't available;
    // instead report overlapping elements at a point just inside/outside right tip.
    const midY = r.top + r.height / 2;
    const insideX = r.right - 4;
    const outsideX = r.right + 8;
    const sample = (x, y) => {
      const stack = document.elementsFromPoint(x, y).slice(0, 8).map((n) => ({
        tag: n.tagName,
        class: String(n.className || '').slice(0, 70),
      }));
      return stack;
    };

    return {
      imgRect: { left: r.left, top: r.top, width: r.width, height: r.height, right: r.right },
      inside: sample(insideX, midY),
      outside: sample(outsideX, midY),
      chain,
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await p.screenshot({ path: 'd:/Navkar/hero-logo-check.png', clip: { x: 450, y: 160, width: 560, height: 450 } });
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

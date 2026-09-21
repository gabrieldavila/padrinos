import { test, expect } from '@playwright/test';

async function verifyLayout(page: import('@playwright/test').Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const collisions = await page.locator('.scene').evaluateAll((scenes) => scenes.flatMap((scene) => {
    const container = scene.getBoundingClientRect();
    return Array.from(scene.querySelectorAll('h1,h2,.prose,figure,.dedication')).filter((child) => {
      const box = child.getBoundingClientRect();
      return box.left < container.left - 1 || box.right > container.right + 1 || box.bottom > container.bottom + 1;
    }).map((child) => child.tagName);
  }));
  expect(collisions).toEqual([]);
}

for (const [width, height] of [[320, 640], [390, 844], [768, 1024], [1440, 900], [844, 390]]) {
  test(`recorrido completo ${width}x${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('section')).toHaveCount(5);
    await expect(page.locator('h1')).toHaveText('Una historia para vos.');
    for (const scene of await page.locator('.scene-inner').all()) {
      await scene.scrollIntoViewIfNeeded();
      await expect(scene).toHaveCSS('opacity', '1');
      await expect(scene.locator('img')).toBeVisible();
    }
    expect(await page.locator('img').evaluateAll((images) => images.every((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true);
    await verifyLayout(page);
    await page.screenshot({ path: testInfo.outputPath(`story-${width}.png`), fullPage: true });
    await expect(page.locator('section').last().locator('h2')).toHaveText('Vas a ser padrino.');
    await page.screenshot({ path: testInfo.outputPath(`final-${width}.png`) });
    await page.getByRole('link', { name: 'Volver a leer' }).click();
    await expect(page.locator('h1')).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`opening-${width}.png`) });
    expect(errors).toEqual([]);
  });
}

test('scroll rápido, recarga y regreso conservan la lectura', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.locator('.scene--final .scene-inner')).toHaveCSS('opacity', '1');
  await page.locator('#camino').scrollIntoViewIfNeeded();
  await page.reload();
  await expect(page.locator('#camino .scene-inner')).toHaveCSS('opacity', '1');
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('.scene--opening .scene-inner')).toHaveCSS('opacity', '1');
});

test('movimiento reducido inicial y dinámico', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.awaiting-reveal')).toHaveCount(0);
  await expect(page.locator('.scene--final .scene-inner')).toHaveCSS('transition-duration', '0s');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.reload();
  expect(await page.locator('.awaiting-reveal').count()).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.awaiting-reveal')).toHaveCount(0);
});

test('sin JavaScript todo el relato permanece visible', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/');
  for (const scene of await page.locator('.scene-inner').all()) await expect(scene).toHaveCSS('opacity', '1');
  await page.getByRole('link', { name: 'Seguí bajando' }).click();
  await expect(page.locator('#comienzo')).toBeInViewport();
  await context.close();
});

for (const failure of ['missing', 'throws']) {
  test(`observador ${failure}: contenido visible`, async ({ page }) => {
    await page.addInitScript((mode) => {
      if (mode === 'missing') delete (window as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;
      else window.IntersectionObserver = class { constructor() { throw new Error('Observer unavailable'); } } as unknown as typeof IntersectionObserver;
    }, failure);
    await page.goto('/');
    await expect(page.locator('.awaiting-reveal')).toHaveCount(0);
    await expect(page.locator('.scene--final .scene-inner')).toHaveCSS('opacity', '1');
  });
}

test('texto al 200 por ciento, teclado y metadatos', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  await verifyLayout(page);

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Seguí bajando' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Seguí bajando' })).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.locator('#comienzo')).toBeInViewport();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-AR');
  expect(await page.locator('head').innerHTML()).not.toMatch(/padrino/i);
  expect(await page.locator('.scene').first().innerText()).not.toMatch(/padrino/i);
  expect(await page.locator('h1,h2').evaluateAll((headings) => headings.map((heading) => heading.tagName))).toEqual(['H1', 'H2', 'H2', 'H2', 'H2']);
});

test('imagen fallida no impide leer y mantiene alternativa', async ({ page }) => {
  await page.route('**/images/booties.svg', (route) => route.abort());
  await page.goto('/');
  await page.locator('#comienzo').scrollIntoViewIfNeeded();
  const image = page.locator('#comienzo img');
  await expect(image).toHaveAttribute('alt', /escarpines/);
  await expect(page.locator('#comienzo .prose')).toContainText('Una nueva vida.');
  await page.locator('.scene--final').scrollIntoViewIfNeeded();
  await expect(page.locator('.scene--final .scene-inner')).toHaveCSS('opacity', '1');
});

test('contraste de los colores de texto', () => {
  const luminance = (hex: string) => {
    const channels = hex.match(/\w\w/g)!.map((value) => parseInt(value, 16) / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  for (const background of ['f8f5ee', 'eeeee4', 'f0e8df']) {
    for (const foreground of ['363b34', '626457', '8e503c', '5c6157']) {
      expect((luminance(background) + .05) / (luminance(foreground) + .05)).toBeGreaterThanOrEqual(4.5);
    }
  }
});

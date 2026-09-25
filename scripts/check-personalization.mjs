import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const contentPath = new URL('../src/content/story.ts', import.meta.url);
const original = await readFile(contentPath, 'utf8');
const babyPhotoBlock = /\n  babyPhoto: \{\n    src: '[^']+',\n    alt: '[^']+',\n    width: \d+,\n    height: \d+,\n  \},/;
const build = () => {
  const result = spawnSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build'], { stdio: 'inherit' });
  assert.equal(result.status, 0, 'El build debe completarse');
};

try {
  const personalized = original
    .replace(/recipient: '[^']*'/, "recipient: 'Destinatario de prueba'")
    .replace(/baby: '[^']*'/, "baby: 'Bebé de prueba'")
    .replace('Con todo nuestro amor.', 'Firma de prueba.')
    .replace('Hay noticias que merecen', 'Texto temporal de prueba')
    .replace("src: '/images/letter.svg'", "src: '/images/stars.svg'")
    .replace("src: '/images/baby/bebe.jpeg'", "src: '/images/stars.svg'")
    .replace("alt: 'Fotografía de Vicente.'", "alt: 'Foto alternativa de prueba.'");
  await writeFile(contentPath, personalized);
  build();
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  for (const value of ['Destinatario de prueba', 'Bebé de prueba', 'Firma de prueba.', 'Texto temporal de prueba', 'Foto alternativa de prueba.']) assert.ok(html.includes(value), value);
  assert.ok(!html.includes('/images/letter.svg'));
  assert.ok(html.includes('/images/stars.svg'));
  assert.ok(html.indexOf('Firma de prueba.') < html.indexOf('Foto alternativa de prueba.'), 'La foto debe aparecer después de la firma');

  assert.match(original, babyPhotoBlock, 'La configuración debe incluir un bloque babyPhoto reemplazable');
  await writeFile(contentPath, original.replace(babyPhotoBlock, ''));
  build();
  const htmlWithoutPhoto = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.ok(!htmlWithoutPhoto.includes('class="baby-photo"'), 'La foto se omite cuando babyPhoto no está configurada');
  console.log('Personalización verificada: nombres, firma, textos, imágenes y foto opcional.');
} finally {
  await writeFile(contentPath, original);
  build();
  assert.equal(await readFile(contentPath, 'utf8'), original);
  console.log('Contenido inicial restaurado y build final regenerado.');
}

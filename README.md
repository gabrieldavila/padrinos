# Una historia para vos

Cuento web en cinco escenas para anunciar un padrinazgo. Sitio estático en español, con Astro, TypeScript, CSS e ilustraciones SVG originales incluidas. Sin backend, fuentes remotas ni servicios de imágenes.

## Desarrollo

```sh
npm ci
npm run dev
```

Abrir `http://127.0.0.1:4321`. Para generar y revisar la versión estática:

```sh
npm run build
npm run preview
```

El resultado se genera en `dist/`. No es necesario un servidor Node en el alojamiento; este cambio no publica el sitio.

### Entorno

Usar preferentemente Node 24 y npm 10 o superior. Se incluye Node 24.21.0 como dependencia de desarrollo local para que los scripts npm también funcionen en este equipo, que tiene Node 20.20.0. Los scripts usan el ejecutable local a través de `node_modules/.bin`; no se reemplaza el Node del sistema. `npm ci` ejecutado desde Node 20 puede mostrar avisos `EBADENGINE` durante la instalación: usar Node 24 para evitarlos. No instalar con `--omit=dev` para desarrollar o construir el proyecto.

## Personalizar

Editar `src/content/story.ts`:

- `personal.recipient`: nombre del destinatario; vacío se omite.
- `personal.baby`: nombre del bebé, opcional.
- `personal.signature`: firma de la familia.
- `story.dedication`: dedicatoria final.
- `story.scenes`: textos, títulos, énfasis, notas y referencias a imágenes. Mantener el orden de las cinco escenas; la quinta contiene la revelación.
- `story.title` y `story.description`: metadatos neutrales del enlace, sin anticipar la sorpresa.

Los textos son texto plano, no HTML. Para incorporar fotos, copiarlas a `public/images/` y cambiar `image.src`, `alt`, `width` y `height` en la escena correspondiente. `src` comienza con `/images/`. Indicar las dimensiones reales para reservar espacio y evitar saltos al cargar; escribir una alternativa breve que describa lo relevante. Usar `alt: ''` únicamente para imágenes decorativas.

Optimizar fotos a WebP o JPEG, con unos 1200px de ancho como punto de partida y preferentemente menos de 200KB. Las imágenes se muestran completas sin recorte. Revisar el encuadre, lectura y rendimiento en móvil después de cambiarlas. Las ilustraciones incluidas son recursos locales propios y pueden reemplazarse libremente.

Reconstruir con `npm run build` después de personalizar. Revisar todos los capítulos antes de compartir. Si en el futuro se publica, configurar la URL y una imagen social raster neutra con URL absoluta para las plataformas que la requieran; los metadatos actuales no revelan el desenlace.

## Estructura

```text
src/content/story.ts             Contenido y personalización
src/components/StoryScene.astro  Escena semántica reutilizable
src/pages/index.astro            Página y metadatos
src/styles/global.css           Diseño responsive
src/scripts/reveal.ts            Apariciones progresivas
public/images/                  Ilustraciones locales
tests/story.spec.ts             Verificaciones en navegador
scripts/check-personalization.mjs  Prueba temporal de personalización
```

El texto completo se genera como HTML y permanece legible sin JavaScript. Las animaciones respetan movimiento reducido, no interceptan el scroll y solo se ejecutan una vez por escena. El cuento funciona con rueda, tacto y teclado.

## Verificaciones

```sh
npm run check
npm run build
npm test
npm run test:personalization
```

Las pruebas usan Microsoft Edge instalado en este equipo, en modo headless. Para otros entornos se puede cambiar `channel` en `playwright.config.ts` a un navegador disponible o quitarlo y ejecutar `npx playwright install chromium`. Las pruebas inician automáticamente la vista previa local; el build debe existir.

La suite cubre anchos 320, 390, 768 y 1440px, orientación horizontal, scroll y relectura, restauración del scroll, imágenes locales y fallidas, texto al 200%, teclado, contraste, metadatos, ausencia de JavaScript, observador no disponible y movimiento reducido inicial/dinámico. Las capturas de apertura y cierre quedan en `test-results/`.

`test:personalization` modifica temporalmente el contenido, verifica el HTML generado y restaura el original en un bloque `finally`, reconstruyendo al finalizar. Ejecutarlo sin otras compilaciones simultáneas.

Resultados y alcance de la revisión: [docs/verification.md](docs/verification.md).

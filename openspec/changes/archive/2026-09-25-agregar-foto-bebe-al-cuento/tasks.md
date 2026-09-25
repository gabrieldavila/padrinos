# Tasks

## 1. Contenido y recurso fotográfico

- [x] 1.1 Incorporar la fotografía elegida en `public/images/baby/` con un nombre apto para URL y verificar que el archivo pueda abrirse y quede incluido en el build estático.
- [x] 1.2 Agregar el objeto tipado opcional `babyPhoto` a la configuración personal en `src/content/story.ts`, con ruta pública, texto alternativo descriptivo y dimensiones reales, y verificarlo con `npm run check`.
- [x] 1.3 Documentar junto a la configuración cómo reemplazar la foto y qué ruta, formatos y dimensiones/peso se recomiendan; verificar que las instrucciones funcionen sustituyendo la ruta durante la prueba de personalización.

## 2. Renderizado y presentación del cierre

- [x] 2.1 Extender las propiedades de `StoryScene.astro` y renderizar condicionalmente una figura fotográfica inmediatamente después de `.dedication`, con `alt`, `width`, `height`, carga diferida y decodificación asíncrona; verificar en el HTML generado que la imagen aparezca después de la firma.
- [x] 2.2 Agregar estilos de pantalla para centrar la foto, limitar su ancho y conservar su proporción en escritorio y móvil; verificar con la prueba de navegador existente o una inspección a anchos de 375 px y 1280 px que no haya desborde ni deformación.
- [x] 2.3 Agregar estilos de impresión para conservar la fotografía después de la firma y evitar su división entre páginas cuando sea posible; verificar mediante vista previa de impresión.

## 3. Validación integrada

- [x] 3.1 Ampliar `scripts/check-personalization.mjs` para cambiar temporalmente ruta y texto alternativo de `babyPhoto`, comprobar su presencia y orden en el HTML, y confirmar que restaura el contenido original ejecutando `npm run test:personalization`.
- [x] 3.2 Ejecutar `npm run check`, `npm run build` y las pruebas del proyecto, y verificar que el cuento existente, la fotografía final y el comportamiento sin `babyPhoto` funcionen sin regresiones.

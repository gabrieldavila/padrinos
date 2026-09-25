# Proposal

## Why

El cierre del cuento actualmente termina con la firma de los padres, pero no muestra una imagen personal del bebé. Incorporar una fotografía inmediatamente después de «Con todo nuestro amor.....» hará que la revelación sea más emotiva y permitirá personalizarla usando un archivo incluido en el proyecto.

## What Changes

- Agregar a la configuración de contenido una fotografía del bebé referenciada desde la carpeta pública de imágenes del proyecto, junto con su texto alternativo y dimensiones.
- Mostrar la fotografía en la escena final, inmediatamente después de la firma que comienza con «Con todo nuestro amor».
- Mantener la fotografía adaptable a pantallas móviles, escritorio e impresión, sin deformarla ni alterar el orden narrativo existente.
- Documentar y validar el mecanismo para reemplazar la fotografía por otro archivo local del proyecto.

## Capabilities

### New Capabilities

- `foto-bebe-cierre`: Presentación configurable, accesible y adaptable de una fotografía local del bebé después de la firma final del cuento.

### Modified Capabilities

Ninguna.

## Impact

- Afecta el modelo de contenido en `src/content/story.ts`, el renderizado de la escena final en `src/components/StoryScene.astro` y sus estilos en `src/styles/global.css`.
- Requiere incorporar el archivo fotográfico en `public/images/` (o una subcarpeta estable dentro de ella) para que Astro lo sirva como recurso estático.
- Requiere ampliar las verificaciones de personalización y presentación para cubrir la ruta de la fotografía, su texto alternativo, su ubicación después de la firma y su comportamiento adaptable.
- No modifica APIs externas ni agrega dependencias de ejecución.

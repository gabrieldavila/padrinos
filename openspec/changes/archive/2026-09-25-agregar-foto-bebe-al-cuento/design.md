# Design

## Context

La escena final se genera en `StoryScene.astro` cuando `index === 4`. Allí el bloque `.dedication` contiene la dedicatoria y la firma, que hoy es el último contenido de la escena. La personalización vive en `src/content/story.ts`, mientras que las ilustraciones estáticas se sirven desde `public/images/`. Véase `proposal.md` para la motivación y `specs/foto-bebe-cierre/spec.md` para el contrato observable.

El sitio es Astro estático: no existe backend, almacenamiento de archivos ni interfaz de administración. Por ello, «subir desde una carpeta del proyecto» se interpreta como copiar la foto a los recursos públicos y configurar su ruta antes del build.

## Goals / Non-Goals

**Goals:**

- Mantener la foto como dato personalizable, separada del marcado del componente.
- Integrarla al flujo estático existente y conservar dimensiones intrínsecas para reducir saltos de diseño.
- Darle un tratamiento visual específico de fotografía, adaptable y apto para impresión.
- Hacer que el procedimiento de reemplazo sea simple y verificable durante el build.

**Non-Goals:**

- Crear un selector de archivos, formulario de carga o almacenamiento persistente en la página.
- Aplicar recorte, edición o compresión automática a la imagen original.
- Reemplazar la ilustración del corazón que ya forma parte de la escena final.

## Decisions

### Modelar la foto como contenido tipado

Se agregará a la configuración personal un objeto opcional `babyPhoto` compatible con la forma de imagen existente (`src`, `alt`, `width`, `height`). El componente recibirá este dato como propiedad y solo renderizará el elemento si está configurado.

Esto mantiene la personalización centralizada en `story.ts` y permite retirar temporalmente la foto sin cambiar el componente. Se descartó codificar la ruta directamente en `StoryScene.astro`, porque mezclaría datos personales con estructura visual y haría menos seguro el reemplazo.

### Servir el archivo desde una subcarpeta pública estable

La fotografía se copiará a `public/images/`, preferentemente `public/images/baby/`, y se referenciará con una ruta absoluta web como `/images/baby/bebe.jpg`. Astro copiará el archivo al resultado estático sin agregar una dependencia de procesamiento.

Se descartó importar la foto desde `src/` mediante un pipeline de optimización porque la aplicación actual usa rutas públicas y el objetivo es que el reemplazo manual sea evidente. También se descartó una URL externa para no introducir disponibilidad, privacidad ni configuración de red adicionales.

### Renderizar una figura separada después de la firma

La fotografía se colocará en un `<figure>` propio, hermano posterior de `.dedication`, con una clase específica. La imagen declarará sus dimensiones, usará carga diferida y decodificación asíncrona, y tomará el texto alternativo de la configuración. No se reutilizará `.scene-art`, ya que esa figura representa la ilustración narrativa y tiene tamaños distintos.

El CSS limitará el ancho con una medida fluida, mantendrá `height: auto`, centrará la foto y podrá aplicar bordes/radio/sombra acordes al diseño existente. En impresión se evitará el corte interno de la figura cuando sea posible.

### Extender la verificación automatizada de personalización

El script de personalización cambiará temporalmente la ruta y el texto alternativo, ejecutará el build y comprobará que ambos aparezcan en el HTML final y en el orden posterior a la firma. Una comprobación de navegador cubrirá, si ya existe la infraestructura adecuada, la ausencia de desborde en un viewport móvil.

Se eligió extender la prueba existente porque ya valida el patrón de personalización de imágenes y restaura `story.ts` al terminar.

## Risks / Trade-offs

- [Una foto grande aumenta el peso y el tiempo de carga] → Documentar formatos web y una dimensión/peso razonables; usar carga diferida para que no bloquee el contenido inicial.
- [Una ruta incorrecta produce una imagen rota que el build estático puede no detectar] → Incluir una validación automatizada de que el recurso configurado existe o de que el build generado lo referencia correctamente.
- [La proporción o encuadre varía entre fotos] → Preservar la proporción completa con `height: auto`; cualquier recorte será una decisión explícita posterior.
- [La fotografía de un bebé es un dato sensible] → Mantenerla solo en el repositorio y despliegue definidos por sus responsables; no enviarla a servicios de terceros como parte de este cambio.

## Migration Plan

1. Incorporar la fotografía elegida en la subcarpeta pública acordada.
2. Agregar su metadato a la configuración personal y conectar el componente y los estilos.
3. Ejecutar las comprobaciones de tipos, personalización, build y presentación adaptable.
4. Desplegar el nuevo build estático.

Para revertir, se elimina o deja sin definir `babyPhoto` y se vuelve a generar el sitio; el renderizado condicional conserva el cierre existente sin la fotografía.

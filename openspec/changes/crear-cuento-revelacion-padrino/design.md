# Design

## Context

Proyecto nuevo: solo existen OpenSpec y sus skills; no hay código, dependencias, documentación de aplicación ni especificaciones previas. Ver `proposal.md` para la motivación. Este diseño establece la arquitectura inicial y la mejora progresiva necesaria para que la sorpresa no dependa de JavaScript.

## Goals / Non-Goals

**Goals:** generar HTML completo, ofrecer una lectura liviana en móviles y separar el contenido de la presentación y las animaciones.

**Non-Goals:** motor de historias genérico, editor visual, SPA, backend, persistencia de respuestas, autenticación y despliegue en este cambio.

## Decisions

### Sitio estático con Astro, TypeScript y CSS

Usar Astro para generar HTML en build desde `src/pages/index.astro`, componentes de escena y `src/content/story.ts`. Un script pequeño manejará las apariciones con IntersectionObserver, sin framework de interfaz ni biblioteca de animación. Incluir scripts de desarrollo, build y preview, lockfile y README. Elegir versiones compatibles al implementar y fijarlas en el lockfile.

Alternativas: una SPA agrega hidratación innecesaria y exige resolver la lectura sin JavaScript; HTML manual simplifica dependencias pero dispersa la personalización. Astro permite contenido centralizado y salida estática completa con poco código cliente.

### Dirección editorial cálida

Fondo marfil, texto carbón, acento terracota apagado y grandes espacios vacíos. Serif de sistema para frases protagonistas y sans serif de sistema para apoyos, sin descargas de fuentes. Columna de texto de aproximadamente 38–42rem, cuerpo entre 18 y 22px y títulos fluidos con límites apropiados para móvil. Comprobar contraste de los colores finales.

En móvil, texto e imagen se apilan; en escritorio algunas escenas pueden alternar dos columnas dentro de un contenedor limitado. Usar alturas mínimas fluidas y padding, nunca alturas fijas que recorten textos. Evitar menús, tarjetas y elementos ajenos a la historia. Frente a una composición cinematográfica con paneles fijados, esta disposición conserva lectura y reflujo sencillos.

### Guion inicial de cinco escenas

1. **Una historia para vos.** «Hay noticias que merecen contarse despacito.» Apoyo: «Seguí bajando». Imagen sutil de un sobre o un libro.
2. **Algo pequeño está por cambiarlo todo.** «Una nueva vida. Mil primeras veces. Y una historia que recién empieza.» Imagen ilustrativa de pequeños escarpines.
3. **Nadie crece solo.** «Cada paso se vuelve más lindo cuando hay alguien cerca para compartirlo.» Imagen de un camino o pequeñas huellas.
4. **Y cuando imaginamos quién podría estar ahí…** «Pensamos en vos. En tu cariño, tus historias y todo lo que tenés para dar.» Un motivo de dos estrellas refuerza el vínculo sin adelantar el rol.
5. **Vas a ser padrino.** «Queremos que seas parte de esta aventura y de la vida de nuestro bebé.» Cierre: «Con todo nuestro amor.»

Se asume voz de la familia dirigida a «vos» y anuncio afirmativo, acorde con el pedido. Los textos son una base editable, no hechos personales. Usar ilustraciones locales coherentes y optimizadas; pueden ser SVG propios sencillos. Fotos reales y nombres son opcionales y no bloquean una primera versión terminada. No usar fotografías remotas ni dejar placeholders visibles.

### Mejora progresiva del scroll

El HTML generado contiene todas las escenas visibles por defecto y en orden de lectura. Inicializar el observador antes de activar estados de animación; ante falta de soporte o error, mantener todo visible. Animar opacidad y una traslación vertical corta durante unos 500–700ms, una sola vez por escena. Evitar esconder escenas ya visibles al iniciar o al restaurar scroll. Con `prefers-reduced-motion: reduce`, omitir animación y mostrar cualquier escena pendiente incluso si la preferencia cambia durante la visita.

No interceptar rueda, tacto, teclas ni navegación del navegador. La última escena aparece por su ubicación natural; no hay un estado secreto que restrinja a lectores de pantalla ni un botón de desbloqueo. La alternativa de scroll secuestrado o parallax continuo dificulta acceso, lectura rápida y rendimiento.

### Recursos y contenido

Definir una fuente tipada con escenas, títulos, párrafos, imagen, alternativa textual y dedicatoria. Renderizarla durante build escapando texto; no aceptar HTML arbitrario. Omitir limpiamente los nombres opcionales. Imágenes con dimensiones o relación de aspecto declaradas; carga diferida bajo el primer pantallazo. Las imágenes informativas llevan texto alternativo y las decorativas alternativa vacía. Mantener el sentido completo de la historia en el texto.

Título neutral «Una historia para vos», descripción e imagen social neutras. No usar el anuncio en metadatos. Esto protege la sorpresa casual, sin pretender ocultar el HTML a quien lo inspeccione.

## Risks / Trade-offs

- [Animaciones ocultan texto ante fallos] → Visibilidad por defecto, inicialización defensiva y verificación con JavaScript deshabilitado y movimiento reducido.
- [Historia genérica menos personal] → Fuente centralizada y guía para reemplazar textos y recursos sin cambiar componentes.
- [Fotos futuras demasiado pesadas o recortadas] → Documentar optimización, dimensiones y revisión visual en móvil al reemplazarlas.
- [Pantallas bajas o zoom rompen el ritmo] → Secciones que crecen con su contenido; comprobar orientación horizontal y zoom al 200 por ciento.
- [Un sitio estático no restringe acceso a fotos] → No incluir datos privados por defecto; definir alojamiento y audiencia si posteriormente se solicita publicar.

## Migration Plan

No hay datos ni versión anterior que migrar. La implementación entregará código y build estático local verificado. El despliegue se decidirá en un pedido posterior; un futuro alojamiento puede servir el directorio generado. Antes de compartir con el destinatario, revisar el relato y las imágenes finales.

## Open Questions

- Nombre del destinatario, nombre del bebé si se desea incluirlo y firma de la familia.
- Fotos personales o recuerdos concretos que podrán sustituir el contenido inicial sin cambiar requisitos ni arquitectura.

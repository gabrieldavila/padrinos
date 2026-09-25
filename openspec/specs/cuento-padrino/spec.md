# cuento-padrino Specification

## Purpose

Ofrecer un cuento visual íntimo que se descubre mediante scroll y comunica a su destinatario que va a ser padrino de un bebé.

## Requirements

### Requirement: Relato secuencial y revelación
La página SHALL presentar cinco escenas en español en este orden: invitación a leer, nueva historia, acompañamiento, persona especial y revelación explícita «Vas a ser padrino». El recorrido SHALL combinar texto e imágenes y permitir llegar al final con scroll nativo, sin clics obligatorios, temporizadores ni reproducción automática.

#### Scenario: Lectura completa
- **WHEN** una persona abre la página al inicio y se desplaza hasta el final
- **THEN** encuentra las cinco escenas en orden y la noticia explícita únicamente en la última escena, acompañada de una dedicatoria

#### Scenario: Desplazamiento libre
- **WHEN** la persona avanza rápidamente o vuelve hacia arriba mediante tacto, rueda o teclado
- **THEN** puede recorrer el contenido sin bloqueos ni saltos impuestos y releer las escenas

### Requirement: Sorpresa en la entrada
La página SHALL usar un título, descripción y metadatos de vista previa neutrales, sin mencionar el padrinazgo ni mostrar el desenlace. La primera escena SHALL indicar de forma discreta que se continúe bajando.

#### Scenario: Apertura del enlace
- **WHEN** se inspeccionan los metadatos de la página y su primera escena
- **THEN** presentan una invitación a descubrir una historia sin anticipar la noticia

### Requirement: Presentación responsive y legible
La página SHALL adaptarse desde 320 píxeles CSS de ancho a pantallas grandes, en ambas orientaciones, sin desbordamiento horizontal ni texto cortado. SHALL priorizar espacios en blanco, tipografía legible y una jerarquía clara, con texto de cuerpo de al menos 16 píxeles y contraste mínimo de 4.5:1 para texto normal.

#### Scenario: Lectura en diferentes pantallas
- **WHEN** se visita en anchos de 320, 390, 768 y 1440 píxeles y se cambia la orientación
- **THEN** todo el texto y las imágenes permanecen dentro del ancho disponible y la revelación puede leerse completa

#### Scenario: Ampliación del contenido
- **WHEN** se amplía el texto al 200 por ciento
- **THEN** las escenas crecen según su contenido sin solapamientos ni pérdida de información

### Requirement: Animación progresiva y accesibilidad
Las escenas SHALL aparecer con transiciones sutiles al entrar en pantalla, sin impedir la lectura. Con preferencia de movimiento reducido o JavaScript deshabilitado, la página SHALL mostrar el relato completo en su orden normal sin depender de animaciones. SHALL incluir idioma español, encabezados ordenados, alternativas para imágenes informativas y foco visible en los elementos interactivos.

#### Scenario: Aparición durante el scroll
- **WHEN** una escena entra en pantalla con JavaScript y movimiento habilitados
- **THEN** su contenido aparece suavemente y permanece visible para poder releerlo

#### Scenario: Movimiento reducido
- **WHEN** el dispositivo solicita reducir el movimiento
- **THEN** el contenido se muestra sin desplazamientos animados ni transiciones de aparición

#### Scenario: JavaScript no disponible
- **WHEN** se carga la página con JavaScript deshabilitado
- **THEN** se pueden leer todas las escenas y la revelación mediante scroll normal

### Requirement: Contenido e imágenes personalizables
El proyecto SHALL permitir sustituir nombres opcionales, textos, dedicatoria e imágenes desde una fuente de contenido documentada sin modificar el comportamiento de scroll. La versión inicial SHALL tener un relato completo e imágenes locales sin nombres ficticios, marcadores visibles ni solicitudes de datos personales.

#### Scenario: Versión inicial sin personalización
- **WHEN** se construye la página con el contenido incluido
- **THEN** muestra una historia coherente dirigida a «vos», imágenes ilustrativas y una dedicatoria sin campos pendientes visibles

#### Scenario: Sustitución de contenido
- **WHEN** se actualizan los textos y una imagen en la fuente documentada y se reconstruye la página
- **THEN** aparecen los nuevos contenidos conservando la secuencia y el comportamiento del recorrido

#### Scenario: Imagen no disponible
- **WHEN** falla la carga de una imagen informativa
- **THEN** su alternativa textual permite comprenderla y todo el relato sigue siendo legible

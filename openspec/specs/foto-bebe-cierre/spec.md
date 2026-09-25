# foto-bebe-cierre Specification

## Purpose

Permitir que el cierre del cuento muestre una fotografía personal del bebé, tomada de los recursos locales del proyecto, de forma accesible y adaptable.

## Requirements

### Requirement: Fotografía configurable desde el proyecto
El sistema SHALL permitir configurar la fotografía del bebé mediante una ruta a un archivo de imagen disponible dentro de la carpeta pública del proyecto, junto con un texto alternativo descriptivo y dimensiones intrínsecas.

#### Scenario: Se configura una fotografía local válida
- **WHEN** el contenido del cuento define una ruta válida a una fotografía del bebé dentro de los recursos públicos
- **THEN** la página SHALL cargar esa fotografía como parte del cierre sin depender de un servicio externo

#### Scenario: Se reemplaza la fotografía
- **WHEN** se incorpora otra imagen en la carpeta pública y se actualiza la ruta configurada
- **THEN** el siguiente build SHALL mostrar la nueva fotografía sin requerir cambios en la estructura de la escena

### Requirement: Ubicación después de la firma
El sistema SHALL renderizar la fotografía del bebé inmediatamente después del bloque de firma final cuyo texto comienza con «Con todo nuestro amor», conservando el orden del resto del relato.

#### Scenario: Se visualiza el cierre completo
- **WHEN** una persona llega a la escena final del cuento
- **THEN** SHALL encontrar primero la dedicatoria y la firma, y a continuación la fotografía del bebé

### Requirement: Presentación accesible y adaptable
El sistema SHALL conservar la proporción de la fotografía, limitarla al ancho disponible y exponer el texto alternativo configurado a las tecnologías de asistencia tanto en pantalla como en la versión imprimible.

#### Scenario: Visualización en una pantalla angosta
- **WHEN** la fotografía se muestra en un dispositivo móvil
- **THEN** SHALL ajustarse al ancho disponible sin desbordarse ni deformarse

#### Scenario: La imagen no puede verse
- **WHEN** una persona utiliza una tecnología de asistencia o la fotografía no se carga
- **THEN** SHALL estar disponible el texto alternativo descriptivo configurado

#### Scenario: Impresión del cuento
- **WHEN** se imprime la página
- **THEN** la fotografía SHALL permanecer después de la firma, conservar su proporción y evitar dividirse entre páginas cuando el motor de impresión lo permita

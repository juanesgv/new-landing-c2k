# prompt-claude-code-landing-bogota

# Prompt para Claude Code — Landing Crédito Taxistas Bogotá (Clave 2000)

## Instrucción inicial para Claude Code

Vas a construir una **primera iteración del rediseño de la landing de captación de leads** de Clave 2000 para crédito de taxistas en Bogotá. Es un mockup para socializar con la gerente de mercadeo antes de pasar a desarrollo en WordPress + Elementor.

El sitio web de Clave 2000 es: [https://www.clave2000.com.co/](https://www.clave2000.com.co/)

**Antes de empezar, descarga e implementa el sistema de diseño de Clave 2000:**

> Fetch this design file, read its README, and implement the relevant aspects of the design.
https://api.anthropic.com/v1/design/h/w73E9dxoiDK0kE9Ix15vIw
> 
> 
> Implement: the designs in this project.
> 

El sistema incluye: tokens de color (navy `#243C4F`, rojo `#C63025`, sus variantes), tipografía Montserrat, sistema de spacing, radios, componentes (botones, inputs, cards, navbar), y assets (logo, fotografías, iconos). **Úsalo de forma rigurosa** — no inventes colores ni tipografías.

**Stack del entregable:**
- Archivo HTML único, self-contained.
- CSS embebido (puede usar las variables del sistema de diseño cargadas desde `colors_and_type.css`).
- JavaScript mínimo solo para la lógica del formulario.
- Mobile-first. Validar render correcto en 375px, 768px, 1280px.
- Material Icons via CDN para iconografía.
- No frameworks JS (no React, no Vue). HTML/CSS/JS vanilla.

---

## Contexto del proyecto

### La empresa

**Clave 2000** es una financiera colombiana con más de 30 años financiando vehículos productivos, especializada en **crédito para taxistas**. Más de 23.000 taxis financiados. Sede principal en Cali, con oficinas en Bogotá, Medellín, Cartagena, Barranquilla.

### El problema que estamos resolviendo

Hace 3 meses se lanzó un rediseño del sitio. Desde entonces, **las conversiones desde Google Ads cayeron drásticamente** — hay días con cero leads en las landings geográficas (`/credito-para-taxistas-bogota/`, `/credito-para-taxistas-cali/`, `/credito-para-taxistas-medellin/`).

**Validaciones técnicas previas:**
- El formulario funciona correctamente (probado manualmente).
- El CRM recibe los leads que sí se envían.
- El tráfico es humano (31s de interacción media).
- **El problema no es técnico, es de comportamiento del usuario:** los usuarios llegan, exploran la página y deciden no convertir.

### Causas diagnosticadas

1. **Propuesta de valor desalineada con la intención del tráfico.** El usuario llega de un Google Ad con intención transaccional (“¿me prestan?”) y la landing le ofrece “asesoría”. El CTA principal actual es *“Recibir asesoría”*, framing consultivo en lugar de transaccional.
2. **Formulario con fricción excesiva.** Pide ~12 interacciones (incluyendo día/hora de llamada y dos checkboxes legales) antes de enviar.
3. **Bugs visibles que erosionan confianza.** “Más de 0 vehículos financiados” (contador roto), testimonios duplicados, “50” sin contexto.
4. **Falta de alternativas de contacto.** No hay WhatsApp ni teléfono visible. Colombia es mercado WhatsApp-first.
5. **Diferenciadores fuertes enterrados.** “Sin codeudor”, “84 meses”, “72 horas”, “80% + cupo” están en la mitad inferior, no en el hero.
6. **Sin localización real.** La URL es `/credito-para-taxistas-bogota/` pero el contenido no se siente de Bogotá.

### Decisión estratégica acordada con la gerente

La landing es de **performance marketing puro** — su objetivo es **generar leads, no posicionar marca**. Cualquier decisión de diseño debe priorizar conversión sobre branding/consultivo.

---

## Especificación de la nueva landing

A continuación, sección por sección de arriba hacia abajo.

### 1. Navbar

Mantener el navbar existente del sistema de diseño (logo izquierda, navegación centro, CTA “Paga aquí” + redes a la derecha). Altura 72px. Logo de `assets/logo.svg`.

En mobile colapsar nav a hamburguesa, mantener visible el logo + un botón compacto de WhatsApp en lugar del “Paga aquí”.

### 2. Hero (sección crítica)

**Layout:** dos columnas en desktop (≥1024px), apiladas en mobile.

**Columna izquierda (60% del ancho):**

- **Imagen de fondo o ilustración:** taxi amarillo de Bogotá con conductor real (no IA), ciudad de Bogotá ligeramente desenfocada al fondo. Para esta iteración usa una imagen placeholder de `assets/photo-taxi.jpg` o equivalente del sistema de diseño, con una capa de overlay navy (`#243C4F` al 60–70% de opacidad) sobre la foto para garantizar contraste del texto blanco.
- **Headline (H1):**
    
    ```
    Financia tu taxi en Bogotá
    ```
    
    Montserrat Bold, ~48px desktop / ~32px mobile, color blanco. Una sola línea en desktop, máximo dos en mobile.
    
- **Subtítulo:**
    
    ```
    Aunque no tengas historial crediticio. Valoramos tu experiencia como conductor.
    ```
    
    Montserrat Regular, ~18px desktop / 16px mobile, color blanco con ~85% de opacidad.
    
- **Diferenciadores rápidos (chips horizontales con icono + texto):**
    - ✓ Sin codeudor
    - ✓ Hasta 84 meses
    - ✓ Respuesta en menos de 72 horas
    
    Cada chip: fondo blanco semitransparente (`rgba(255,255,255,0.12)`), borde sutil, icono Material `check_circle` en rojo (`#C63025`), texto blanco 14px Montserrat Medium. Pill shape (border-radius 200px). Padding 8px 14px. Gap 10px entre chips. En mobile pueden apilarse verticalmente o quedar en flex-wrap.
    
- **Trust signal de cierre (debajo de los chips):**
Texto pequeño en blanco semitransparente: *“Más de 23.000 taxis financiados en Colombia”*

**Columna derecha (40% del ancho — formulario):**

Card blanca con `border-radius: 12px`, `box-shadow: 0px 20px 48px rgba(0,0,0,0.3)`. Padding 28px.

- **Header del formulario:**
    
    ```
    Solicita tu crédito ahora
    ```
    
    Montserrat Bold 22px, color navy. Debajo, en gris muted: *“Te contactamos en menos de 24 horas”*.
    
- **Campos (4 únicamente):**
    1. **Nombre completo** — input texto, required.
    2. **Celular** — input tel, required. Validación: solo números, 10 dígitos (formato colombiano).
    3. **Correo electrónico** — input email, **opcional**. Marcar visualmente con “(opcional)” en el label.
    4. **Actividad** — select con dos opciones:
        - “Conductor de taxi”
        - “Propietario de taxi”
    
    Cada input según el sistema de diseño: altura 48px, border `#D1D1D1`, border-radius 8px, padding lateral 14px, leading icon Material en navy (`person`, `phone`, `mail`, `local_taxi`). Label arriba en Roboto Medium 12px color `#333`.
    
- **Checkbox único de aceptación:**
    
    ```
    Acepto la política de privacidad y autorizo el contacto.
    ```
    
    Con link a `/politicas-de-privacidad/`. Más conciso que los dos checkboxes legales originales (consolidar en uno solo donde sea legalmente posible — esto es una decisión a validar con el área legal de Clave 2000, dejar comentario en código).
    
- **CTA principal:**
    
    ```
    Quiero financiar mi taxi →
    ```
    
    Botón ancho completo (`width: 100%`), altura 48px, fondo rojo `#C63025`, texto blanco Montserrat SemiBold 16px, border-radius 8px. Icono `arrow_forward` a la derecha. Hover: `#C52B27`.
    
- **Debajo del CTA, fila horizontal con alternativas de contacto:**
    
    ```
    ¿Prefieres hablar con alguien?
    [WhatsApp]  [Llamar ahora]
    ```
    
    Dos botones outline (border navy, fondo blanco, texto navy). El de WhatsApp con icono Material `chat` (o emoji solo si el sistema de diseño lo permite — preferentemente icono SVG). El de Llamar con icono `phone`.
    WhatsApp link: `https://wa.me/57XXXXXXXXXX?text=Hola%2C%20quiero%20información%20sobre%20crédito%20para%20mi%20taxi%20en%20Bogotá`
    Tel link: `tel:+57XXXXXXXXXX`
    (Usar placeholders para que el cliente complete con los números reales).
    

**Mobile del hero:**
- La columna del formulario va debajo de la imagen + texto.
- La imagen reduce su altura a ~280px.
- El formulario card mantiene el padding pero queda full-width con márgenes laterales de 16px.

### 3. Banda delgada de confianza (debajo del hero)

Banda horizontal, fondo `#F6F6F6`, padding vertical 24px. Tres elementos en fila con divisores sutiles entre ellos. En mobile apilados verticalmente.

1. **Icono** `workspace_premium` rojo · **#1 en financiación de taxis en Colombia**
2. **Icono** `local_taxi` rojo · **Más de 23.000 taxis financiados**
3. **Icono** `schedule` rojo · **Más de 30 años de experiencia**

Texto cada uno en Montserrat SemiBold 14px navy. **Nota importante:** dejar comentario en el código indicando que el claim “#1 en financiación de taxis” debe ser validado por el cliente con fuente verificable antes de publicar.

### 4. Sección de productos

Mantener la estructura de 2 cards (no 3) — solo conductores y propietarios. Quitar el de “emprendedores” para que no compita con el foco taxi de esta landing.

**Encabezado de sección:**

```
¿Cuál crédito necesitas?
```

H2 Montserrat Bold 30px navy, centrado. **NO incluir el subtítulo “Te orientamos hacia la mejor opción…” ni similar.** Sin subtítulo.

**Card 1 — Crédito para conductores:**

- Foto: **solo taxi**, sin camión, sin vehículo productivo genérico. Si no hay foto adecuada en el sistema de diseño, usar placeholder con icono Material `local_taxi` grande en fondo `#F6F6F6`.
- Eyebrow (tipo de producto): “PARA CONDUCTORES” — Montserrat Bold 10px, color rojo, uppercase, letter-spacing 0.06em.
- Título: **Quiero tener mi propio taxi** — Montserrat Bold 20px navy.
- Descripción: *“Financiamos tu primer taxi aunque no tengas historial crediticio.”*
- Bullets con icono `check_circle` rojo:
    - Hasta el 80% + cupo
    - Sin codeudor
    - Hasta 84 meses
- CTA: botón rojo **“Quiero mi taxi →”** que hace scroll al formulario del hero.

**Card 2 — Crédito para propietarios:**

- Foto: solo taxi (otro ángulo o color de taxi).
- Eyebrow: “PARA PROPIETARIOS”
- Título: **Quiero crecer con mi taxi**
- Descripción: *“Renueva tu vehículo, obtén liquidez o compra un taxi adicional.”*
- Bullets:
    - Hasta el 100% + cupo *(⚠️ NOTA EN CÓDIGO: este claim del 100% debe ser validado con el área de producto/crédito de Clave 2000 antes de publicar. Si no se cumple literalmente en la llamada de seguimiento, destruye conversión real.)*
    - Sin codeudor
    - Hasta 84 meses
- CTA: botón rojo **“Quiero crecer →”** que hace scroll al formulario del hero.

**Layout:** grid 2 columnas en desktop ≥768px, 1 columna en mobile. Cards con `border-radius: 12px`, `border: 1px solid #E7E7E7`, hover con `box-shadow: 0 8px 28px rgba(36,60,79,0.12)` y `transform: translateY(-3px)`.

### 5. Sección de testimonios

Mantener la sección de testimonios del diseño existente con **dos correcciones críticas**:

1. **DEDUPLICAR.** No mostrar el mismo testimonio dos veces. Si solo hay 4 testimonios únicos, mostrar 4. No 8.
2. **Priorizar testimonios de Bogotá** si los hay (esta es la landing de Bogotá).

Estructura: fondo navy `#243C4F`, grid de 4 cards en desktop, 2 en tablet, 1 en mobile. Cada testimonio con foto, nombre y quote corta con quotation marks rojas.

### 6. Sección de oficina en Bogotá (nueva)

**Esta es una sección nueva que la landing actual no tiene.** Va antes del footer.

Fondo blanco. Layout dos columnas:

**Izquierda:** Mapa embebido de Google Maps con la oficina de Clave 2000 en Bogotá. Placeholder iframe:

```html
<iframe src="https://www.google.com/maps/embed?pb=PLACEHOLDER_BOGOTA"...></iframe>
```

**Derecha:**
- H2: **Visítanos en Bogotá**
- Datos de la oficina (placeholders):
- 📍 Dirección: *[Dirección oficina Bogotá]*
- 📞 Teléfono: *[Teléfono Bogotá]*
- 🕐 Horario: Lunes a viernes 8:00 AM – 6:00 PM, sábados 9:00 AM – 1:00 PM
- Dos botones:
- **WhatsApp** (botón verde `#00A63E` solo aquí por convención de WhatsApp, con icono)
- **Cómo llegar** (link a Google Maps directions)

Usar Material Icons `location_on`, `phone`, `schedule` para los datos.

### 7. Footer

Mantener el footer existente del sistema de diseño. Asegurarse de que la sección de “Contáctanos” liste claramente Bogotá entre las ciudades.

---

## Lo que NO debe estar en esta landing

Explícitamente eliminar / no incluir:

- ❌ Referencias a “vehículos productivos” genéricos (camiones, busetas).
- ❌ Imágenes con camiones de fondo.
- ❌ Subtítulos consultivos tipo “Te orientamos hacia la mejor opción”.
- ❌ El CTA “Recibir asesoría” en cualquier parte.
- ❌ El bloque del wizard de 4 pasos (esta iteración usa formulario simple en el hero, el wizard puede vivir en otra página).
- ❌ El contador “Más de 0 vehículos financiados” o cualquier métrica con cifras rotas o placeholder.
- ❌ Testimonios duplicados.
- ❌ El card de “Crédito para emprendedores” en la sección de productos.

---

## Consideraciones técnicas y de UX

### Mobile-first

La mayoría del tráfico de Google Ads para taxistas es mobile. Validar específicamente:

- Hero respira sin scroll excesivo: imagen + headline + 1 chip + formulario inicio visible en viewport de 375x812 (iPhone SE/12 mini).
- Formulario card no se siente apretado en mobile.
- CTAs con touch targets de al menos 44x44px.
- Diferenciadores rápidos quedan legibles (no se rompen feo) en pantallas pequeñas.

### Accesibilidad mínima

- Contraste AA en todo texto (especialmente el blanco sobre la imagen del hero — overlay navy garantiza esto).
- Labels asociados a inputs con `for` / `id`.
- Botones con texto, no solo icono.
- `alt` descriptivo en imágenes.
- Estados de focus visibles en inputs y botones.

### Performance

- Imagen del hero optimizada (formato WebP si es posible, lazy loading false para LCP).
- Resto de imágenes con `loading="lazy"`.
- No cargar JS innecesario. Vanilla puro.
- Una sola carga de Google Fonts (preconnect).

### Tracking (preparar pero no implementar)

Dejar comentarios en HTML indicando dónde van los siguientes eventos para el equipo que conecte GTM:

```html
<!-- GTM: dispatch event 'envio_formulario_hero_bogota' on submit success -->
<!-- GTM: dispatch event 'click_whatsapp_hero' on WhatsApp button -->
<!-- GTM: dispatch event 'click_telefono_hero' on phone button -->
<!-- GTM: dispatch event 'click_cta_producto_conductor' on CTA -->
<!-- GTM: dispatch event 'click_cta_producto_propietario' on CTA -->
```

### Validación del formulario

- Cliente-side: nombre mínimo 3 caracteres, celular 10 dígitos numéricos, email válido si se llena.
- Mensajes de error claros debajo del campo, no en alert.
- Botón de submit deshabilitado mientras valida / envía.
- Estado de éxito: card del formulario se reemplaza por un mensaje de confirmación con icono `check_circle` verde, texto **“¡Listo! Te contactamos en menos de 24 horas.”**, y opción de “Volver al inicio”.

---

## Decisiones que requieren input del cliente (dejar marcadas en código)

Comentarios `<!-- TODO_CLIENTE -->` en los siguientes puntos:

1. Imagen real del hero (taxi + conductor + Bogotá).
2. Número de WhatsApp real.
3. Teléfono de la oficina Bogotá.
4. Dirección exacta de la oficina Bogotá.
5. Validación legal de consolidar los dos checkboxes en uno solo.
6. Validación del claim “Hasta el 100% + cupo” en crédito para propietarios.
7. Validación del claim “#1 en financiación de taxis” con fuente verificable.
8. Coordenadas exactas para el iframe de Google Maps.
9. Testimonios reales priorizados de Bogotá.

---

## Entregable final

Un único archivo HTML llamado `landing-taxistas-bogota-v1.html` que:

1. Implementa rigurosamente el sistema de diseño descargado.
2. Cumple todas las especificaciones de arriba.
3. Es responsive desde 375px hasta 1440px+.
4. Tiene comentarios `<!-- TODO_CLIENTE -->` en los puntos identificados.
5. Tiene comentarios `<!-- GTM: -->` para los eventos de tracking.
6. Es socializable visualmente (la gerente debe poder abrir el archivo en un navegador y ver una propuesta clara).

Adicionalmente, al final del archivo o en un comentario al inicio, incluye una breve **changelog inline** que liste los cambios principales frente a la landing original, para facilitar la conversación con la gerente:

```html
<!--
  CAMBIOS PRINCIPALES vs LANDING ACTUAL:
  1. Hero rediseñado: copy transaccional, geo-específico Bogotá, sin historial crediticio destacado
  2. Formulario en hero, simplificado a 4 campos (nombre, celular, correo opcional, actividad)
  3. WhatsApp y teléfono visibles en hero como canales alternativos
  4. Diferenciadores fuertes (sin codeudor, 84 meses, 72h) en hero, no enterrados
  5. Banda de trust con cifras reales (#1, 23.000+ taxis, 30+ años) — pendiente validar #1
  6. Sección de productos reducida a 2 cards (solo taxistas), copies outcome-focused
  7. Eliminadas referencias a camiones / vehículos productivos genéricos
  8. Nueva sección de oficina Bogotá con mapa
  9. Bugs corregidos: testimonios deduplicados, contador "Más de 0" reemplazado
  10. CTA principal: "Quiero financiar mi taxi" (outcome) reemplaza "Recibir asesoría" (process)
-->
```

---

## Cómo proceder

1. Empieza descargando el sistema de diseño del enlace al inicio. Lee su README y carga `colors_and_type.css` como base.
2. Genera el HTML completo en orden top-down (navbar → hero → trust band → productos → testimonios → oficina → footer).
3. Valida visualmente que se vea bien en 375px, 768px, 1280px.
4. Guarda como `landing-taxistas-bogota-v1.html` y devuélvelo listo para abrir en navegador.

**Una sola iteración. Una sola entrega.** Después de eso, el humano lo revisa con la gerente y devuelve feedback para la v2.
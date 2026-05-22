/* =========================================================
   Clave 2000 — Formulario standalone
   - Soporta múltiples instancias del shortcode en la misma página.
   - No depende de jQuery ni de ningún framework.
   - Toda la lógica está dentro de un IIFE para no contaminar
     el scope global de WordPress.
   - Engancha cualquier <form data-c2k-form> dentro de un
     contenedor [data-c2k-form-card].

   NOTA: en esta iteración el envío NO está conectado a ningún
   endpoint. Al pasar la validación se muestra directamente el
   estado de éxito. La integración con la API se hará en una
   siguiente iteración (ver función handleSubmit).
   ========================================================= */
(function(){
  'use strict';

  // --- Validadores ---
  function isValidEmail(value){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  function digitsOnly(value){
    return (value || '').replace(/\D/g, '');
  }

  // --- Helpers de error por campo ---
  function fieldEl(form, name){
    return form.querySelector('[data-c2k-field="' + name + '"]');
  }
  function setError(form, name, hasErr){
    var f = fieldEl(form, name);
    if(!f) return;
    f.classList.toggle('is-error', !!hasErr);
    var input = f.querySelector('.c2k-input, .c2k-check-input');
    if(input){
      input.setAttribute('aria-invalid', hasErr ? 'true' : 'false');
    }
  }
  function clearAllErrors(form){
    form.querySelectorAll('.c2k-field.is-error, .c2k-check.is-error').forEach(function(el){
      el.classList.remove('is-error');
    });
  }

  // --- Validación completa ---
  function validate(form){
    var ok = true;
    var firstInvalid = null;

    function fail(name){
      if(!firstInvalid){
        var f = fieldEl(form, name);
        if(f){
          firstInvalid = f.querySelector('input, select, textarea') || f;
        }
      }
      ok = false;
    }

    var nombre = (form.elements['nombre'].value || '').trim();
    if(nombre.length < 3){ setError(form, 'nombre', true); fail('nombre'); }
    else setError(form, 'nombre', false);

    var celular = digitsOnly(form.elements['celular'].value);
    form.elements['celular'].value = celular;
    // Celular Colombia: 10 dígitos y debe empezar por 3
    if(celular.length !== 10 || celular.charAt(0) !== '3'){
      setError(form, 'celular', true); fail('celular');
    } else setError(form, 'celular', false);

    var correo = (form.elements['correo'].value || '').trim();
    if(correo.length > 0 && !isValidEmail(correo)){
      setError(form, 'correo', true); fail('correo');
    } else setError(form, 'correo', false);

    var actividad = form.querySelector('input[name="actividad"]:checked');
    if(!actividad){ setError(form, 'actividad', true); fail('actividad'); }
    else setError(form, 'actividad', false);

    var acepto = form.elements['acepto'];
    var aceptoWrap = form.querySelector('.c2k-check');
    if(!acepto.checked){
      ok = false;
      if(aceptoWrap) aceptoWrap.classList.add('is-error');
      if(!firstInvalid) firstInvalid = acepto;
    } else if(aceptoWrap){
      aceptoWrap.classList.remove('is-error');
    }

    if(firstInvalid && typeof firstInvalid.focus === 'function'){
      try{ firstInvalid.focus({preventScroll:false}); }catch(e){ firstInvalid.focus(); }
    }

    return ok;
  }

  // --- Inicialización de una instancia ---
  function initForm(card){
    var form = card.querySelector('[data-c2k-form]');
    if(!form || form.dataset.c2kReady === '1') return;
    form.dataset.c2kReady = '1';

    var body = card.querySelector('[data-c2k-form-body]');
    var success = card.querySelector('[data-c2k-success]');
    var submitBtn = form.querySelector('[data-c2k-submit]');
    var resetBtn = card.querySelector('[data-c2k-reset]');

    // Limpiar errores cuando el usuario empieza a corregir
    ['nombre','celular','correo'].forEach(function(name){
      var input = form.elements[name];
      if(!input) return;
      input.addEventListener('input', function(){ setError(form, name, false); });
      input.addEventListener('blur', function(){
        // Validación suave al perder foco (mejora microUX)
        if(name === 'correo'){
          var v = input.value.trim();
          if(v.length > 0 && !isValidEmail(v)) setError(form, name, true);
        }
        if(name === 'celular'){
          var d = digitsOnly(input.value);
          if(d.length > 0 && (d.length !== 10 || d.charAt(0) !== '3')) setError(form, name, true);
        }
      });
    });

    // Celular: solo dígitos, máximo 10
    var celEl = form.elements['celular'];
    if(celEl){
      celEl.addEventListener('input', function(){
        this.value = digitsOnly(this.value).slice(0,10);
      });
    }

    // Radio cards: limpiar error + clase fallback para navegadores sin :has()
    var radios = form.querySelectorAll('input[name="actividad"]');
    radios.forEach(function(r){
      r.addEventListener('change', function(){
        setError(form, 'actividad', false);
        radios.forEach(function(other){
          var parent = other.closest('.c2k-radio-card');
          if(parent) parent.classList.toggle('is-checked', other.checked);
        });
      });
    });

    // Checkbox legal: limpiar error al marcar
    var acepto = form.elements['acepto'];
    if(acepto){
      acepto.addEventListener('change', function(){
        var wrap = form.querySelector('.c2k-check');
        if(wrap && acepto.checked) wrap.classList.remove('is-error');
      });
    }

    // Mostrar estado de éxito (sin envío real en esta iteración)
    function showSuccess(){
      if(body) body.hidden = true;
      if(success){
        success.hidden = false;
        var okTitle = success.querySelector('.c2k-ok-title');
        if(okTitle){
          okTitle.setAttribute('tabindex', '-1');
          try{ okTitle.focus({preventScroll:true}); }catch(e){ okTitle.focus(); }
        }
      }
      try{ card.scrollIntoView({behavior:'smooth', block:'start'}); }catch(e){}
    }

    // Submit
    // TODO: conectar con endpoint propio en la próxima iteración.
    // Punto de integración: reemplazar el setTimeout por fetch(endpoint, {...}).
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(submitBtn && submitBtn.disabled) return;
      if(!validate(form)) return;

      // Estado de carga (sigue presente para que la UX final sea idéntica
      // cuando se conecte la API)
      if(submitBtn){
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitBtn.setAttribute('aria-busy', 'true');
      }

      setTimeout(function(){
        // GTM dataLayer (compatible con el evento del landing original)
        if(window.dataLayer && typeof window.dataLayer.push === 'function'){
          var sel = form.querySelector('input[name="actividad"]:checked');
          window.dataLayer.push({
            event: 'envio_formulario_hero_bogota',
            actividad: sel ? sel.value : '',
            ciudad: 'bogota'
          });
        }

        showSuccess();

        if(submitBtn){
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.removeAttribute('aria-busy');
        }
      }, 600);
    });

    // Reset desde el estado de éxito
    if(resetBtn){
      resetBtn.addEventListener('click', function(){
        form.reset();
        clearAllErrors(form);
        form.querySelectorAll('.c2k-radio-card.is-checked').forEach(function(el){
          el.classList.remove('is-checked');
        });
        if(success) success.hidden = true;
        if(body) body.hidden = false;
        var first = form.querySelector('input[name="nombre"]');
        if(first) first.focus();
      });
    }
  }

  // Inicializa todas las instancias visibles al cargar
  function initAll(){
    document.querySelectorAll('[data-c2k-form-card]').forEach(initForm);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expone un re-init manual por si el shortcode se inyecta vía AJAX
  // (ej. dentro de un modal o pestaña cargada después del DOMContentLoaded)
  window.C2KForm = window.C2KForm || {};
  window.C2KForm.init = initAll;
})();

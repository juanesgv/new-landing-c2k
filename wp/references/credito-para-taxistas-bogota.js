document.addEventListener("DOMContentLoaded", () => {
  console.log("? Script credito-conductores-form-bogota.js cargado correctamente");

  const form = document.getElementById("formulario_contacto");
  if (!form) {
    console.warn("?? Formulario #formulario_contacto no encontrado en esta página");
    return;
  }

  console.log("? Formulario encontrado, listeners activos");

  // -----------------------------
  // ALERTAS
  // -----------------------------
  const alertSuccess = form.querySelector(".alert-success");
  const alertError = form.querySelector(".alert-danger");

  const hideAlerts = () => {
    alertSuccess?.classList.add("d-none");
    alertError?.classList.add("d-none");
  };

  const showAlert = (type) => {
    hideAlerts();
    if (type === "success") alertSuccess?.classList.remove("d-none");
    if (type === "error") alertError?.classList.remove("d-none");
  };

  // -----------------------------
  // ACTIVIDAD -> OPCIONES SOLO PROPIETARIO
  // -----------------------------
  const actividadRadios = form.querySelectorAll('input[name="actividad"]');
  const bloqueObjetivoPropietario = document.getElementById("bloque_objetivo_propietario");
  const objetivoPropietarioRadios = form.querySelectorAll('input[name="objetivo_propietario"]');

  const toggleObjetivoPropietario = () => {
    const actividadSeleccionada = form.querySelector('input[name="actividad"]:checked')?.value || "";
    const esPropietario = actividadSeleccionada === "Propietario de taxi";

    bloqueObjetivoPropietario?.classList.toggle("d-none", !esPropietario);

    objetivoPropietarioRadios.forEach((radio) => {
      radio.required = esPropietario;

      if (!esPropietario) {
        radio.checked = false;
      }
    });
  };

  actividadRadios.forEach((radio) => {
    radio.addEventListener("change", toggleObjetivoPropietario);
  });

  // -----------------------------
  // FILTRO DEPTO -> CIUDAD
  // -----------------------------
  const departamentoSelect = document.getElementById("departamento");
  const ciudadSelect = document.getElementById("ciudad");

  const allCityOptions = ciudadSelect
    ? Array.from(ciudadSelect.querySelectorAll("option"))
    : [];

  const getCiudadPlaceholder = () =>
    allCityOptions.find((opt) => !opt.dataset.dpto);

  const resetCiudad = () => {
    if (!ciudadSelect) return;
    ciudadSelect.innerHTML = "";

    const placeholder = getCiudadPlaceholder();
    if (placeholder) ciudadSelect.appendChild(placeholder.cloneNode(true));

    ciudadSelect.value = "";
  };

  const filterCitiesByDepartamento = (deptoValue) => {
    if (!ciudadSelect) return;

    ciudadSelect.innerHTML = "";

    const placeholder = getCiudadPlaceholder();
    if (placeholder) ciudadSelect.appendChild(placeholder.cloneNode(true));

    allCityOptions.forEach((opt) => {
      if (opt.dataset.dpto && opt.dataset.dpto === deptoValue) {
        ciudadSelect.appendChild(opt.cloneNode(true));
      }
    });

    ciudadSelect.value = "";
  };

  if (departamentoSelect && ciudadSelect) {
    resetCiudad();

    departamentoSelect.addEventListener("change", () => {
      filterCitiesByDepartamento(departamentoSelect.value);
    });
  }

  // -----------------------------
  // ENDPOINT + PARAMS DINÁMICOS
  // -----------------------------
  const baseUrl = "https://www.indicar.com.co/server_siisa/servicios/service.php";

  const getActividadValue = () =>
    form.querySelector('input[name="actividad"]:checked')?.value || "";

  const getCampannaByActividad = () => {
    const actividad = getActividadValue();

    if (actividad === "Propietario de taxi") return "4012";
    return "3204";
  };

  const buildUrl = () => {
    const campanna = getCampannaByActividad();

    const params = new URLSearchParams({
      _p_action: "_landing",
      p_origen: "organica-c2k",
      p_campanna: campanna,
      p_tipo: "credito-para-taxistas-bogota",
    });

    return {
      fullUrl: `${baseUrl}?${params.toString()}`,
      campanna,
      actividad: getActividadValue(),
    };
  };

  // Inicializar estado del bloque propietario
  toggleObjetivoPropietario();

  // -----------------------------
  // SUBMIT REAL
  // -----------------------------
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideAlerts();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      console.warn("?? Formulario inválido: revisa los campos obligatorios.");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.innerHTML;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Enviando...";
    }

    const { fullUrl, campanna, actividad } = buildUrl();

    const formData = new FormData(form);
    const formattedData = {};

    formData.forEach((value, key) => {
      formattedData[`formulario[${key}]`] = value;
    });

    formattedData.idform = "conductores-form";

    console.log("?? Enviando formulario...");
    console.log("?? Actividad:", actividad);
    console.log("?? p_campanna:", campanna);
    console.log("?? URL:", fullUrl);
    console.table(formattedData);

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formattedData).toString(),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("? Respuesta del servidor:", data);

      showAlert("success");
      form.reset();
      form.classList.remove("was-validated");

      if (departamentoSelect) departamentoSelect.value = "";
      if (ciudadSelect) resetCiudad();

      toggleObjetivoPropietario();
    } catch (error) {
      console.error("? Error en el envío:", error);
      showAlert("error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
    }
  });
});

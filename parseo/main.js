"use strict";

/*document.addEventListener("DOMContentLoaded", function () {
  var obtenerUbicacionButton = document.getElementById("obtenerUbicacion");
  var ubicacionParrafo = document.getElementById("ubicacion");
  var resultadoParrafo = document.getElementById("resultadoParrafo"); // Nota: aquí debe ser "resultadoParrafo"

  obtenerUbicacionButton.addEventListener("click", obtenerUbicacion);

  function obtenerUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          ubicacionParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
          resultadoParrafo.textContent =
            "Obteniendo ubicación. Realizando solicitud a la API...";

          obtenerPronosticoLluvia(latitude, longitude);
        },
        function (error) {
          ubicacionParrafo.textContent = `Error: ${error.message}`;
        }
      );
    } else {
      ubicacionParrafo.textContent =
        "La geolocalización no está disponible en este navegador.";
    }
  }

  function obtenerPronosticoLluvia(latitude, longitude) {
    const apiKey = "80e51649ca0054038d08f10ffa6265c3"; // Reemplaza con tu clave de API de OpenMeteo
    var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=rain&timezone=Europe%2Berlin&forecast_days=1&current_weather=true&appid=${apiKey}`;

    resultadoParrafo.textContent = "Realizando la solicitud a la API...";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        if (data.hourly && data.hourly.rain && data.hourly.rain.length > 0) {
          // Obtén el pronóstico de lluvia actual
          const pronósticoLluviaActual = data.hourly.rain[0];

          if (pronósticoLluviaActual > 0) {
            resultadoParrafo.textContent = "Sí, va a llover.";
          } else {
            resultadoParrafo.textContent = "No, no va a llover.";
          }
        } else {
          resultadoParrafo.textContent =
            "No se encontraron datos de lluvia en el pronóstico.";
        }
      })
      .catch((error) => {
        resultadoParrafo.textContent =
          "Error al obtener el pronóstico: " + error.message;
      });
  }
});*/
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var obtenerUbicacionButton = document.getElementById("obtenerUbicacion");
  var ubicacionParrafo = document.getElementById("ubicacion");
  var resultadoParrafo = document.getElementById("resultadoParrafo"); // Nota: aquí debe ser "resultadoParrafo"

  obtenerUbicacionButton.addEventListener("click", obtenerUbicacion);

  function obtenerUbicacion() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          ubicacionParrafo.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
          resultadoParrafo.textContent =
            "Obteniendo ubicación. Realizando solicitud a la API...";

          obtenerPronosticoLluvia(latitude, longitude);
        },
        function (error) {
          ubicacionParrafo.textContent = `Error: ${error.message}`;
        }
      );
    } else {
      ubicacionParrafo.textContent =
        "La geolocalización no está disponible en este navegador.";
    }
  }

  function obtenerPronosticoLluvia(latitude, longitude) {
    const apiKey = "80e51649ca0054038d08f10ffa6265c3"; // Reemplaza con tu clave de API de OpenMeteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=rain&timezone=Europe%2FBerlin&start_date=2023-11-03&end_date=2023-11-03`;

    resultadoParrafo.textContent = "Realizando la solicitud a la API...";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        if (data.hourly && data.hourly.rain && data.hourly.rain.length > 0) {
          // Obtén el pronóstico de lluvia por horas
          var tiempos = data.hourly.time;
          var cantidadesLluvia = data.hourly.rain;

          resultadoParrafo.textContent = "Pronóstico de lluvia por horas:";

          for (let i = 0; i < tiempos.length; i++) {
            const tiempo = tiempos[i];
            const lluvia = cantidadesLluvia[i];

            resultadoParrafo.textContent += `\nHora: ${tiempo}, Lluvia: ${lluvia} mm`;
          }
        } else {
          resultadoParrafo.textContent =
            "No se encontraron datos de lluvia en el pronóstico.";
        }
      })
      .catch((error) => {
        resultadoParrafo.textContent =
          "Error al obtener el pronóstico: " + error.message;
      });
  }
});

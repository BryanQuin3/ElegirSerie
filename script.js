// id de la hoja de calculo
const SHEET_ID = "1Fne3wMWxCGu0ysGsyHx6XfSZhfzb-vnKCnPS_vT0ktE";
const ACCESS_TOKEN =
  "ya29.a0Aa4xrXMJTRNVaI5MVhgOpExfLKJIvSjvBm-5SbuQLNKJ3V2y5Yim8u02UP_Jp-mhO53JGW6DCrlnkTPVjoK_6Qj_Va_UjpjgFa0mT1i6cv2P6JjRKKouvL21FRRoyMJqz0Qh_ZRNiffplEftNKZubsvjuqQvaCgYKATASARMSFQEjDvL91sUXx_zX6WsONS6OKNjFdA0163";

const filtros = document.getElementById('filtros');
let contador = 0;
let serieRandom;
function onObtenerSerie() {
  fetch(
    // Obtenemos los datos de la planilla, de la hoja hoja Series, columnas A y B desde la segunda fila
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/series!A2:C`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
    //esperamos el response
  ).then(function (response) {
    //esperamos el json del response para poder utilizarlo
    response.json().then(function (data) {

      const values = data.values;
      contador++;
      // Obtenemos el elemento del dom
      const lista = document.getElementById("serie");
      lista.value = "";

      // Div que va a contener los datos de la serie
      const series = document.createElement("div");
      series.className = "serie-item";
      //obtiene longitud de array
      let longitudArray = values.length;
      //obtiene valor random
      let indiceRandom = Math.floor(Math.random() * longitudArray);
      //crea el elemento html span
      const nombreSeries = document.createElement("span");
      nombreSeries.className = "item serie";
      //agrega una serie de forma aleatoria al html
      nombreSeries.innerHTML = values[indiceRandom][0];
      let stringNombreSerie = values[indiceRandom][0];

      //limpia los elementos anteriores
      if (contador > 1) {
        document.getElementById("serie").innerHTML = "";
        document.getElementById(serieRandom).style.display = "none";
      }

      const itemDescripcion = document.createElement("span");
      itemDescripcion.className = "item categoria";
      //agrega una serie de forma aleatoria al html
      itemDescripcion.innerHTML = values[indiceRandom][1];
      //agrega los elementos
      series.appendChild(nombreSeries);
      series.appendChild(itemDescripcion);

      //agrega al div
      lista.appendChild(series);
      //muestra la imagen de la serie correspondiente
      serieRandom = stringNombreSerie.replace(/ /g, '-');
      document.getElementById(serieRandom).style.display = "block";

    });
  });
}

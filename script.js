// id de la hoja de calculo
const SHEET_ID = "1Fne3wMWxCGu0ysGsyHx6XfSZhfzb-vnKCnPS_vT0ktE";
const ACCESS_TOKEN =
  "ya29.a0Aa4xrXMWKQxtLwxlhqgUTuG0F-i3SmYJ2roc3OhIguuS0TLeW0F7aLKQegEbsKRtzow5-QfY7RTNovLyL5kRccNMZz4veBv_ARWWTWGlQUtoLRxcokw7j7TE2oDGmmKuQvYww_C1q5QAgUr_fSV0SVSIj7u4aCgYKATASARMSFQEjDvL9NP676Oy4e6L3kj9YWDWjUQ0163";

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
      document.getElementById("portadas").style.display = "none";
      document.getElementById(serieRandom).style.display = "block";

    });
  });
}

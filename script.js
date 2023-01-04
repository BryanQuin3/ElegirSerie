  let contador = 0;
  let serieRandom;
  let seriesLista=[];
  let datos;
  const url = "https://sheet2api.com/v1/Z9v24fyRqWlD/lista-series";
  async function onObtenerSerie(){
    try{
        const resul = await fetch(url);
        //recibe el JSON
        datos = await resul.json();
        //agrega al array bidimensional
        datos.forEach(elem=>seriesLista.push([elem.Serie,elem.Categoría]));
        //genera numero random
        let numeroRandom = Math.floor(Math.random()*seriesLista.length);
        contador++;
        // Obtenemos el elemento del dom
        const lista = document.getElementById("serie");
        lista.value = "";
        // Div que va a contener los datos de la serie
        const series = document.createElement("div");
        series.className = "serie-item";
        //crea el elemento html span
        const nombreSeries = document.createElement("span");
        nombreSeries.className = "item serie";
  
        //agrega una serie de forma aleatoria al html
        nombreSeries.innerHTML = seriesLista[numeroRandom][0];
        let stringNombreSerie = seriesLista[numeroRandom][0];
  
        //limpia los elementos anteriores
        if (contador > 1) {
            document.getElementById("serie").innerHTML = "";
            document.getElementById(serieRandom).style.display = "none";
        }
        const itemDescripcion = document.createElement("span");
        itemDescripcion.className = "item categoria";
        //agrega una serie de forma aleatoria al html
        itemDescripcion.innerHTML = seriesLista[numeroRandom][1];
  
        //agrega los elementos
        series.appendChild(nombreSeries);
        series.appendChild(itemDescripcion);
  
        //agrega al div
        lista.appendChild(series);
        //muestra la imagen de la serie correspondiente
        serieRandom = stringNombreSerie.replace(/ /g, '-');
        document.getElementById("portadas").style.display = "none";
        document.querySelector(".subTitulo").style.display = "none";
        document.getElementById(serieRandom).style.display = "block";
    }catch (error) {
        console.log(error)
    }
  }








function artistas(){
  discosDiv.innerHTML='<h1>Problemas de conección, El servidor puede tardar unos minutos en encenderse...</h1>'
  fetch(direccionApi + "/album") //traer los albums.
    // fetch( + "/album") //traer los albums.
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json(); // Convierte la respuesta a un objeto JSON
      })
      .then(albums => {
        discosDiv.innerHTML="";
        for (let i = 0; i < albums.length; i++) {
          let album = albums[i];
          let string = "";
          let imgSrc=encodeURIComponent(album.artista)+'/'
          +encodeURIComponent(album.titulo)+'/'
          +encodeURIComponent(album.img);

          string += '<img src=' + direccionApi+'/dameImagen/'+imgSrc  + ' alt="' + album.titulo + '"></img>';
          
          string += '<h3>' + album.titulo + '</h3>';
          string += '<h6>' + album.fecha + ' ' + album.artista + '</h6>'
          string += '<p> ' + album.descripcion + '</p>';

          let card = document.createElement('article');
          card.id = i;
          card.classList.add('album');
          card.addEventListener('click', function () { cardClick(this, album) });
          card.innerHTML += string;
          discosDiv.appendChild(card);
        }
        albumEnRocola = albums[0];
        cargarRocola(1, false);
      })
      .catch(error => {
        discosDiv.innerHTML='<h1>Problemas de conección, El servidor puede tardar unos minutos en encenderse...</h1>'
      });


      function cardClick(eCard, album) {
        albumEnRocola = album;
        cargarRocola(parseInt(eCard.id) + 1, sonando);
      }
  }

// Affiche de toutes les données saisies ou choisies

function chargement() {

  	   var titre=document.getElementById("titre");
	     const app = document.getElementById('root');
	     const container = document.createElement('div');
	     const films_disponibles = document.getElementById('films_disponibles');

	     container.setAttribute('class', 'jijhgd');

	     app.appendChild(container);

	     var request = new XMLHttpRequest();
	     var url =  'https://api.themoviedb.org/3/search/movie?api_key=f49536f8093a09d282d1034f36831fc6&language=fr-fr&page=1&include_adult=false&query=' + titre.value
	     request.open('GET', url, true);
	     request.onload = function(){
	 	   var data = JSON.parse(this.response);

       const card = document.createElement('div');
       card.setAttribute('class', 'vcbcb');

		   if (request.status >= 200 && request.status < 400) {

         const premier_film = data.results[0];
         const h1 = document.createElement('h1');
         h1.setAttribute('id', 'titreFilmOriginel');
         h1.textContent = premier_film.original_title;

         const h2 = document.getElementById('synopsis');
         const balise_titre = document.createElement('h3')
         balise_titre.setAttribute('id', 'titreFilm');
         balise_titre.textContent = premier_film.title;

         const balise_resume = document.createElement('p')
         balise_resume.setAttribute('id', 'resumeFilm');
         balise_resume.textContent = premier_film.overview;

         container.appendChild(card);
         card.appendChild(h1);
         h2.appendChild(balise_titre);
         h2.appendChild(balise_resume);

         data.results.shift();
			   data.results.forEach(movie => {
				       const card = document.createElement('div');
				       card.setAttribute('class', 'vcbcb');

				       const h1 = document.createElement('button');
			 	       h1.textContent =  movie.title;
               var titre_du_film = movie.title;

               h1.addEventListener("click", function () {
                 chargement_lien(titre_du_film);
               });


				      films_disponibles.appendChild(card);
				      card.appendChild(h1);
			})

      //traitement de l'image
      image = premier_film.backdrop_path;
      balise_image = document.getElementById('Affichage_FanArt');
      //const aff_img = document.createElement('img')
      balise_image.setAttribute('style', "background-image: url('https://image.tmdb.org/t/p/original"+ image+"')" );

      //aff_img.setAttribute('class', 'class="col-lg-6 text-white showcase-img"');
      //balise_image.appendChild(aff_img)

		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = 'Erreur URL API';
			app.appendChild(errorMessage);
		}
		//alert("fin traitement");
	}
	request.send()
	//alert("Envoie requête");
}

function chargement_lien(titre) {

    alert(titre);
	  const app = document.getElementById('root');
	  const container = document.createElement('div');
  	const films_disponibles = document.getElementById('films_disponibles');
    films_disponibles.innerHTML = "";
	  container.setAttribute('class', 'jijhgd');
	  app.appendChild(container);

	  var request = new XMLHttpRequest();
	  var url =  'https://api.themoviedb.org/3/search/movie?api_key=f49536f8093a09d282d1034f36831fc6&language=fr-fr&page=1&include_adult=false&query=' + titre
	  request.open('GET', url, true);
	  request.onload = function(){
		//alert("onload");
	 	var data = JSON.parse(this.response);

    const card = document.createElement('div');
    card.setAttribute('class', 'vcbcb');

    if (request.status >= 200 && request.status < 400) {

      const premier_film = data.results[0];
      alert(premier_film.title);
      const h1 = document.getElementById('titreFilmOriginel');
      h1.innerHTML = "";
      h1.textContent = premier_film.title;
    //TressSDFSQFD
      container.appendChild(card);
      card.appendChild(h1);

      data.results.shift();
			data.results.forEach(movie => {
				const card = document.createElement('div');
				card.setAttribute('class', 'vcbcb');

				const h1 = document.createElement('button');
				h1.textContent =  movie.title;
        var titre_du_film = movie.title;

       h1.addEventListener("click", function () {
         chargement_lien(titre_du_film);
       });

				films_disponibles.appendChild(card);
				card.appendChild(h1);
			})

		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = 'Erreur URL API';
			app.appendChild(errorMessage);
		}
		//alert("fin traitement");
	}
	request.send()
	//alert("Envoie requête");
}

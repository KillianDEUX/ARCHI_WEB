// Affiche de toutes les données saisies ou choisies

function chargement() {

  	  var titre=document.getElementById("titre");
	    const app = document.getElementById('root');
	    const films_disponibles = document.getElementById('films_disponibles');

	    var request = new XMLHttpRequest();
	    var url ='https://api.themoviedb.org/3/search/movie?api_key=f49536f8093a09d282d1034f36831fc6&language=fr-fr&page=1&include_adult=false&query=' + titre.value
	    request.open('GET', url, true);
	    request.onload = function(){
	 	  var data = JSON.parse(this.response);


		  if (request.status >= 200 && request.status < 400) {

        const premier_film = data.results[0];
        const h1 = document.getElementById('titreFilmOriginel');
        h1.innerHTML = "";
        h1.textContent = premier_film.original_title;

        const h2 = document.getElementById('synopsis');

        const balise_titre = document.getElementById('titreFilm');
        balise_titre.innerHTML = "";
        balise_titre.textContent = premier_film.title;

         const balise_resume = document.getElementById('resumeFilm')
         balise_resume.innerHTML = "";
         balise_resume.textContent = premier_film.overview;         

         data.results.shift();
         const boutons_propositions = document.getElementById('boutons_propositions');
         boutons_propositions.innerHTML = "";
			   data.results.forEach(movie => {
				       const h1 = document.createElement('button');
			 	       h1.textContent =  movie.title;
               var titre_du_film = movie.title;

               h1.addEventListener("click", function () {
                 chargement_lien(titre_du_film);
               });
				      boutons_propositions.appendChild(h1);
			  })

      //traitement de l'image
      image = premier_film.backdrop_path;
      balise_image = document.getElementById('Affichage_FanArt');
      balise_image.setAttribute('style', "background-image: url('https://image.tmdb.org/t/p/original"+ image+"')" );

      charger_acteur(premier_film);

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


function charger_acteur(premier_film){
      var request_acteur = new XMLHttpRequest();
      var api_acteurs= "https://api.themoviedb.org/3/movie/"+premier_film.id +"/credits?api_key=f49536f8093a09d282d1034f36831fc6&language=en-fr";
      request_acteur.open('GET', api_acteurs, true);
	    request_acteur.onload = function(){
	 	    var data = JSON.parse(this.response);
        
         if (request_acteur.status >= 200 && request_acteur.status < 400) {

            premier_acteur = data.cast[0];
            const img_premier_acteur = document.getElementById('img_premier_acteur');
            img_premier_acteur.setAttribute('src', "https://image.tmdb.org/t/p/original"+ premier_acteur.profile_path);
            
            const nom_premier_acteur = document.getElementById('nom_premier_acteur');
            nom_premier_acteur.innerHTML = "";
            nom_premier_acteur.textContent = premier_acteur.name;

            const role_premier_acteur = document.getElementById('role_premier_acteur');
            role_premier_acteur.innerHTML = "";
            role_premier_acteur.textContent = premier_acteur.character;

            deuxieme_acteur = data.cast[1];
            const img_deuxieme_acteur = document.getElementById('img_deuxieme_acteur');
            img_deuxieme_acteur.setAttribute('src', "https://image.tmdb.org/t/p/original"+ deuxieme_acteur.profile_path);
            
            const nom_deuxieme_acteur = document.getElementById('nom_deuxieme_acteur');
            nom_deuxieme_acteur.innerHTML = "";
            nom_deuxieme_acteur.textContent = deuxieme_acteur.name;

            const role_deuxieme_acteur = document.getElementById('role_deuxieme_acteur');
            role_deuxieme_acteur.innerHTML = "";
            role_deuxieme_acteur.textContent = deuxieme_acteur.character;

            troisieme_acteur = data.cast[2];
            const img_troisieme_acteur = document.getElementById('img_troisieme_acteur');
            img_troisieme_acteur.setAttribute('src', "https://image.tmdb.org/t/p/original"+ troisieme_acteur.profile_path);
            
            const nom_troisieme_acteur = document.getElementById('nom_troisieme_acteur');
            nom_troisieme_acteur.innerHTML = "";
            nom_troisieme_acteur.textContent = troisieme_acteur.name;

            const role_troisieme_acteur = document.getElementById('role_troisieme_acteur');
            role_troisieme_acteur.innerHTML = "";
            role_troisieme_acteur.textContent = troisieme_acteur.character;
        } 
        else{
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = 'Erreur URL API';
          app.appendChild(errorMessage);
        }
    }
    request_acteur.send()
}


function chargement_lien(titre) {

	  const app = document.getElementById('root');
  	const films_disponibles = document.getElementById('films_disponibles');

	  var request = new XMLHttpRequest();
	  var url =  'https://api.themoviedb.org/3/search/movie?api_key=f49536f8093a09d282d1034f36831fc6&language=fr-fr&page=1&include_adult=false&query=' + titre
	  request.open('GET', url, true);

	  request.onload = function(){
	 	    var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {

          const premier_film = data.results[0];
          const h1 = document.getElementById('titreFilmOriginel');
          h1.innerHTML = "";
          h1.textContent = premier_film.original_title;
        
          const h2 = document.getElementById('synopsis');
          const balise_titre = document.getElementById('titreFilm');
          balise_titre.innerHTML = "";
          balise_titre.textContent = premier_film.title;

          const balise_resume = document.createElement('p');
          balise_resume.setAttribute('id', 'resumeFilm');
          balise_resume.textContent = premier_film.overview;

          data.results.shift();
          data.results.forEach(movie => {
                  const h1 = document.createElement('button');
                  h1.textContent =  movie.title;
                  var titre_du_film = movie.title;

                  h1.addEventListener("click", function () {
                    chargement_lien(titre_du_film);
                  });
                  boutons_propositions.appendChild(h1);
          })

          //traitement de l'image
          image = premier_film.backdrop_path;
          balise_image = document.getElementById('Affichage_FanArt');
          balise_image.setAttribute('style', "background-image: url('https://image.tmdb.org/t/p/original"+ image+"')" );
          charger_acteur(premier_film);
        } 
        
        else{
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = 'Erreur URL API';
          app.appendChild(errorMessage);
        }
		//alert("fin traitement");
	}
	request.send()
	//alert("Envoie requête");
}


function doFormStuff() {
    return false;
}

function faire_alert(text){
  alert(text);
}


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
        // TITRE CHARGE
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
        if(data.results.length != 0){
          var j, html;
          html = "Voici une liste de résultats supplémentaires avec votre recherche :";
          html += "<form id=\"listes\" name=\"listes\">";
          html += "<span id=\"numero\"></span> <select name=\"liste\" onChange = chargement_lien(this.value) ><option value=\"\">Choisir...</option>";
          for (j=0; j<data.results.length; j++){
              html += "<option value=\""+data.results[j].title+"\" onSelect= faire_alert(\"" + "couc" + "\")>"+data.results[j].title+"</option>";
          }
          html += "</select><br>";
          html +="</form>";

          const lstderoule = document.getElementById('listederoulante');
          lstderoule.innerHTML = html;
        }

      //traitement de l'image
          image = premier_film.backdrop_path;
          if (image==null){
            balise_image = document.getElementById('Affichage_FanArt');
            balise_image.setAttribute('style', "background-image: url('img/bg-masthead.gif')" );
            charger_acteur(premier_film);
          }else{
            balise_image = document.getElementById('Affichage_FanArt');
            balise_image.setAttribute('style', "background-image: url('https://image.tmdb.org/t/p/original"+ image+"')" );
            charger_acteur(premier_film);
            //Traitement de la deuxième API
            nytimes_critics(premier_film);
          }
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
          nom_premier_acteur.setAttribute("href", "http://www.google.com/search?q="+premier_acteur.name);
          nom_premier_acteur.setAttribute("onclick", "window.open(this.href);return false");

          const role_premier_acteur = document.getElementById('role_premier_acteur');
          role_premier_acteur.innerHTML = "";
          role_premier_acteur.textContent = premier_acteur.character;
          
          if(data.cast.length > 1){
            deuxieme_acteur = data.cast[1];
            const img_deuxieme_acteur = document.getElementById('img_deuxieme_acteur');
            img_deuxieme_acteur.setAttribute('src', "https://image.tmdb.org/t/p/original"+ deuxieme_acteur.profile_path);
              
            const nom_deuxieme_acteur = document.getElementById('nom_deuxieme_acteur');
            nom_deuxieme_acteur.innerHTML = "";
            nom_deuxieme_acteur.textContent = deuxieme_acteur.name;
            nom_deuxieme_acteur.setAttribute("href", "http://www.google.com/search?q="+deuxieme_acteur.name)
            nom_deuxieme_acteur.setAttribute("onclick", "window.open(this.href);return false");

            const role_deuxieme_acteur = document.getElementById('role_deuxieme_acteur');
            role_deuxieme_acteur.innerHTML = "";
            role_deuxieme_acteur.textContent = deuxieme_acteur.character;
            if(data.cast.length > 2){
              troisieme_acteur = data.cast[2];
              const img_troisieme_acteur = document.getElementById('img_troisieme_acteur');
              img_troisieme_acteur.setAttribute('src', "https://image.tmdb.org/t/p/original"+ troisieme_acteur.profile_path);
                
              const nom_troisieme_acteur = document.getElementById('nom_troisieme_acteur');
              nom_troisieme_acteur.innerHTML = "";
              nom_troisieme_acteur.textContent = troisieme_acteur.name;
              nom_troisieme_acteur.setAttribute("href", "http://www.google.com/search?q="+troisieme_acteur.name);
              nom_troisieme_acteur.setAttribute("onclick", "window.open(this.href);return false");

              const role_troisieme_acteur = document.getElementById('role_troisieme_acteur');
              role_troisieme_acteur.innerHTML = "";
              role_troisieme_acteur.textContent = troisieme_acteur.character;
            }
            else{
              const img_troisieme_acteur = document.getElementById('img_troisieme_acteur');
              img_troisieme_acteur.style.display='none';
              const nom_troisieme_acteur = document.getElementById('nom_troisieme_acteur');
              nom_troisieme_acteur.innerHTML = "";
              nom_troisieme_acteur.setAttribute("href", "http://www.google.com/search?q="+troisieme_acteur.name)
              const role_troisieme_acteur = document.getElementById('role_troisieme_acteur');
              role_troisieme_acteur.innerHTML = "";
            }
          }
          else{
            const img_deuxieme_acteur = document.getElementById('img_deuxieme_acteur');
            img_deuxieme_acteur.style.display='none';
            const nom_deuxieme_acteur = document.getElementById('nom_deuxieme_acteur');
            nom_deuxieme_acteur.innerHTML = "";
            const role_deuxieme_acteur = document.getElementById('role_deuxieme_acteur');
            role_deuxieme_acteur.innerHTML = "";
            const img_troisieme_acteur = document.getElementById('img_troisieme_acteur');
            img_troisieme_acteur.style.display='none';
            const nom_troisieme_acteur = document.getElementById('nom_troisieme_acteur');
            nom_troisieme_acteur.innerHTML = "";
            const role_troisieme_acteur = document.getElementById('role_troisieme_acteur');
            role_troisieme_acteur.innerHTML = "";
          }
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
          if(data.results.length != 0){
            var j, html;
            html = "Voici une liste de résultats avec votre recherche :";
            html += "<form id=\"listes\" name=\"listes\">";
            html += "<span id=\"numero\"></span> <select name=\"liste\"><option value=\"\">Choisir ...</option>";
            for (j=0; j<data.results.length; j++){
              html += "<option value=\""+data.results[j].title+"\" onClick= chargement_lien(value)>"+data.results[j].title+"</option>";
            }
            html += "</select><br>";
            html +="</form>";

            const lstderoule = document.getElementById('listederoulante');
            lstderoule.innerHTML = html;
          }
          //traitement de l'image
          image = premier_film.backdrop_path;
          if (image==null){
            balise_image = document.getElementById('Affichage_FanArt');
            balise_image.setAttribute('style', "background-image: url('img/bg-masthead.gif')" );
            charger_acteur(premier_film);
          }else{
            balise_image = document.getElementById('Affichage_FanArt');
            balise_image.setAttribute('style', "background-image: url('https://image.tmdb.org/t/p/original"+ image+"')" );
            charger_acteur(premier_film);
            //Traitement de la deuxième API
            nytimes_critics(premier_film);
          }

        } 
        else{
          const errorMessage = document.createElement('marquee');
          errorMessage.textContent = 'Erreur URL API';
          app.appendChild(errorMessage);
        }
		//alert("fin traitement");
	}
	request.send();
	//alert("Envoie requête");
}


function nytimes_critics(premier_film){
  var request_critics= new XMLHttpRequest();
  var api_critics= "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+premier_film.original_title+"&api-key=08Sa5xGQhH3dH1ur38BAWl2rB6yDAJyF";
  request_critics.open('GET', api_critics, true);
	request_critics.onload = function(){
	  var data = JSON.parse(this.response);
    const extrait_critique = document.getElementById('critiqueFilm');
    const lien_critique = document.getElementById('lien_vers_critique');
    for(j=0; j<data.num_results; j++){
      if(data.results[j].display_title == premier_film.original_title){
        extrait_critique.innerHTML = "";
        extrait_critique.textContent = data.results[j].summary_short;
        lien_critique.innerHTML = "";
        lien_critique.textContent = "Lien vers la critique complète";
        lien_critique.setAttribute("href",data.results[j].link.url );
        lien_critique.setAttribute("onclick", "window.open(this.href);return false");
      }
      else if(j == data.num_results){
        extrait_critique.innerHTML = "";
        extrait_critique.textContent = "Aucunes critiques du NEW_YORK Times";

      }
    }
  }
  request_critics.send();
}
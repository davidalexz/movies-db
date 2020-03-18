 // fetch(`https://movies-api-siit.herokuapp.com/movies?take=1&skip=10`)

  function getMoviebyID () {
  let movieId = sessionStorage.getItem("movieId");

 fetch(`https://movies-api-siit.herokuapp.com/movies/${movieId}`)
  
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      //console.log(data);
      //console.log(data.results);
      showMovieDetails(data.results);
    });
  }
   
    function showMovieDetails(movies) {
     
        let MoviePage = document.querySelector('.MoviePage');
        
          movies.forEach(movie => {

          /* var poster = document.createElement('img');
          poster.src = 'https://movies-api-siit.herokuapp.com/movies/Poster'
          poster.alt = 'posterofmovie';
          document.getElementById('MoviePoster').appendChild(poster); */

          var title = document.createElement('h2');
          title.innerText = movie.Title;  
          document.getElementById('MovieTitle').appendChild(title);

          var year = document.createElement('p'); 
          year.innerText = movie.Year;   
          document.getElementById('MovieYear').appendChild(year);

          var genre = document.createElement('p'); 
          genre.innerText = movie.Genre;   
          document.getElementById('MovieGenre').appendChild(genre);

          var language = document.createElement('p'); 
          language.innerText = movie.Language;   
          document.getElementById('MovieLanguage').appendChild(language);
          
          var country = document.createElement('p'); 
          country.innerText = movie.Country;   
          document.getElementById('MovieCountry').appendChild(country);
          
          var runtime = document.createElement('p'); 
          runtime.innerText = movie.Runtime;   
          document.getElementById('MovieRuntime').appendChild(runtime);        
        });
    }

const AddMovieButton = document.getElementById("AddMovieButton");

// edit details for the movie
const EditMovie = movieDetails => {
delete movieDetails._id;
const id = sessionStorage.getItem("movieID");
fetch(`https://movies-api-siit.herokuapp.com/movies/${id}`, {
  headers: {
     // "x-auth-token": , To update
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(movieDetails)
  })
    .then(response => {
      console.log(response);
      if (response.ok) {
        successEdit();
      }
      return response.json();
    })
    .then(data => {
      movieDetails.displayMovieDetails(data);  
    })
    .catch(error => console.log(`Error: ${error}`));
};

// add a new movie
function AddMovie(addNewMovie) {
  fetch(apiURL, {
    headers: {
     // "x-auth-token": ,to update
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(addNewMovie)
  })
    .then(response => {
      if (ressponse.ok) {
        successAddedMovie();
      } else if (response.status == 409) {
      }
      if (response.status === 403) {
        alert("You need to be authenticated to be able to create a movie");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}
//delete a movie
const DeleteMovie = function() {
  const id = sessionStorage.getItem("movieID");
  fetch(`https://movies-api-siit.herokuapp.com/movies/${id}`, {
    headers: {
      //"x-auth-token": //to update
    },
    method: "DELETE"
  })
    .then(response => {
      console.log(response);
      return response.text();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
};

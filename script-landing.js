const apiURL = "https://ancient-caverns-16784.herokuapp.com/movies";

const moviesContainer = document.querySelector(".movie-list");

function movieSection(movies) {
	return movies.map(movie => {
		//check if movie poster has a value
		if (movie.Poster) {
			return `
			<img src=${movie.Poster} movie-id=${movie._id}/>
		 `;
		}
	});
}

function createMovieContainer(movies) {
	const movieElement = document.createElement("div");
	movieElement.setAttribute("class", "movie");

	const movieTemplate = `
        <section class="movie-items">
            ${movieSection(movies)}
        </section>
    `;

	movieElement.innerHTML = movieTemplate;
	return movieElement;
}

function renderMovies(data) {
	//mutata din functia de search - S
	moviesContainer.innerHTML = "";
	const movies = data.results;
	const movieBlock = createMovieContainer(movies);
	moviesContainer.appendChild(movieBlock);
	console.log(data);
}

fetch(apiURL)
	.then(response => response.json())
	.then(renderMovies);

//SEARCH FUNCTION

//create a fc that gets input value and listens for submit and searches

//inglobam totul intr-o functie

function filterMovies(title) {
	//asta e un query string -> un endpoint/path inspre URL care are param de querys
	//un qstring se incepe cu ? (interogare) si urmeaza param = value
	fetch(apiURL + "?Title=" + title)
		//var + string + var  . var is de tip string
		.then(response => response.json())
		.then(renderMovies);
}
//formu triggeruieste un event de tip submit
//cand se int un form submit se face un refresh cu transmitere de date
//prin method POST inspre URL din actionul formului
//daca formu are action gol => se da refresh
window.addEventListener("load", function() {
	document.querySelector(".searchForm").addEventListener("submit", function(event) {
		event.preventDefault();
		//tre sa apelam fulter movies cu un param care ii val din input
		const value = document.querySelector("#inputValue").value;
		//query selectoru ne returneaza un obj de tp node din html
		//daca elem ii un input atunci el are un value
		//tre sa cerem filmele filtrate
		filterMovies(value);
		return false;
	});
});

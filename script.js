document.addEventListener("DOMContentLoaded", () => {
    fetchMovieDetails(1); 
});

function fetchMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json()) 
        .then(movie => {
            displayMovieDetails(movie); 
        })
        .catch(error => console.error("Error fetching movie:", error));
}

function displayMovieDetails(movie) {

    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");

    const available = movie.capacity - movie.tickets_sold;


    poster.src = movie.poster; 
    poster.alt = movie.title;   
    title.textContent = movie.title; 
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
    showtime.textContent = `Showtime: ${movie.showtime}`; 
    availableTickets.textContent = `Available Tickets: ${available}`;

    if (available === 0) {
        buyTicketButton.textContent = "Sold Out"; 
        buyTicketButton.disabled = true; 
    } else {
        buyTicketButton.textContent = "Buy Ticket"; 

        buyTicketButton.disabled = false; 
    }

    buyTicketButton.onclick = () => buyTicket(movie);
}


function buyTicket(movie) {
    const available = movie.capacity - movie.tickets_sold;


    if (available > 0) {
        movie.tickets_sold += 1; 
        displayMovieDetails(movie);

        fetch(`http://localhost:3000/films/${movie.id}`, {
            method: "PATCH", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ tickets_sold: movie.tickets_sold }) 
        })
        .then(response => response.json()) 
        .then(updatedMovie => console.log("Updated movie:", updatedMovie)) 
        .catch(error => console.error("Error updating movie:", error)); 
    }
}


document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
});

function fetchMovies() {
    
    fetch("http://localhost:3000/films")
        .then(response => response.json()) 
        .then(movies => {
            const filmList = document.getElementById("films");
            filmList.innerHTML = ""; 

            movies.forEach(movie => {
                const li = document.createElement("li");
                li.textContent = movie.title;
                li.dataset.id = movie.id; 
                li.classList.add("film", "item"); 

                li.addEventListener("click", () => fetchMovieDetails(movie.id));

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-btn");
                deleteButton.addEventListener("click", (event) => {
                    event.stopPropagation(); 
                    deleteMovie(movie.id, li);
                });

                li.appendChild(deleteButton); 
                filmList.appendChild(li); 
            });
        })
        .catch(error => console.error("Error fetching movies:", error));
}


function buyTicket(movie) {
    const available = movie.capacity - movie.tickets_sold;
  
    if (available > 0) {
        movie.tickets_sold += 1; 
        displayMovieDetails(movie); 
  
        fetch(`http://localhost:3000/films/${movie.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tickets_sold: movie.tickets_sold })
        })
        .then(response => response.json())
        .then(updatedMovie => {
            console.log("Updated movie:", updatedMovie);
  
            
            if (updatedMovie.capacity - updatedMovie.tickets_sold === 0) {
                const buyButton = document.getElementById("buy-ticket");
                buyButton.textContent = "Sold Out";
                buyButton.disabled = true; 
            }
        })
        .catch(error => console.error("Error updating movie:", error));
    }
  }


  movies.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    li.classList.add("film");

    if (movie.capacity - movie.tickets_sold === 0) {
        li.classList.add("sold-out"); 
    }

    li.addEventListener("click", () => displayMovieDetails(movie));
    filmList.appendChild(li);
});



  

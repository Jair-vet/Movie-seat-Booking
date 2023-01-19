const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI();

let ticketPrice = +movieSelect.value

// Save selectec movie index and price
function setMovieData(moveIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', moveIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected') // Generar un arreglo de asientos seleccionados
    
    // Copy selected seats into arr
    const seatsIndex = [...selectedSeats].map((seat) =>  // Map throught array
        [...seats].indexOf(seat))  // Return a new array

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))  // Guardamos en el storage

    const selectedSeatsCount = selectedSeats.length // La cantidad de asientos

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice

}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('selected');
        }
      });
    }
  
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  
    if (selectedMovieIndex !== null) {
      movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', e => { // Nos trae todo el elemento al que le demos Clik
    if(e.target.classList.contains('seat') && 
            !e.target.classList.contains('occuppied')
        ){  // Le especificamos la clase que solo al darle Click funcione
            
        e.target.classList.toggle('selected')  // Le agregamos y fijamos la clase al hacer click
        updateSelectedCount();
    }
})

// Initial count and total set
updateSelectedCount();

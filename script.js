const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected') // Generar un arreglo de asientos seleccionados
    
    const selectedSeatsCount = selectedSeats.length // La cantidad de asientos

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice

}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    updateSelectedCount()
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


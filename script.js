const container =document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupid)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const moviSelect = document.getElementById('movie')
populateUI()

let tecktPrice = +moviSelect.value

// save selected movi index and price
function setMoviData(moviindex , moviprice){
   localStorage.setItem('selectedMoviIndex' , moviindex)
   localStorage.setItem('selectedMoviPrice' , moviprice)
}

// update total and count
function updateSelectedSeats(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat))
    
    localStorage.setItem('selectedseats' , JSON.stringify(seatIndex))
    

    const selectedSeatCount = selectedSeats.length
    
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * tecktPrice;
    
}

// get data from local storge
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedseats'))
    console.log(selectedSeats)
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat , index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMoviIndex = localStorage.getItem('selectedMoviIndex')
    if(selectedMoviIndex != null){
        moviSelect.selectedIndex = selectedMoviIndex
    }
}



// movi select event
moviSelect.addEventListener('change' , e =>{
    tecktPrice = +e.target.value
    setMoviData(e.target.selectedIndex , e.target.value)

    updateSelectedSeats()
})

container.addEventListener('click' , e =>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupid'))
    {
        e.target.classList.toggle('selected')

        updateSelectedSeats();
    }
    
})

// count and total
updateSelectedSeats()
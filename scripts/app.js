const changeLocation = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');
const error = document.querySelector('.error');
const forecast = new Forecast();


const updateUI = (data) => {
    //destructuring properties
    const {cityDets, weather} = data;
    console.log(cityDets);
   
   //if(cityDets.EnglishName)
    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;


    time.src = weather.IsDayTime? 'img/day.svg' : 'img/night.svg';
    icon.src = `img/icons/${weather.WeatherIcon}.svg`;



    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
        error.classList.add('d-none');
    }
};


const updateUIError = (err) => {
    console.log('this is error');
   
    //update Error details template
    error.innerHTML = `
    <h5 class="my-3">Please enter correct city name</h5>
    `;

    if(error.classList.contains('d-none')){
        error.classList.remove('d-none');
        card.classList.add('d-none');
    }




    // <div class="my-3">${weather.WeatherText}</div>
    // <div class="display-4 my-4">
    //     <span>${weather.Temperature.Metric.Value}</span>
    //     <span>&deg;C</span>
    // </div>

}

changeLocation.addEventListener('submit', e => {
    e.preventDefault();
    const city = changeLocation.city.value.trim();
    changeLocation.reset();
    
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => updateUIError(err));

    //set local storage
    localStorage.setItem('city', city);
    
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => updateUIError(err));

}
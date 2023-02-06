
var APIkey = '7a7c04d503977a6da6ac8ba6bdb48f18';
var cityInputEl = document.getElementById('city-input');
var submitBtn = document.querySelector('.btn');
var previousCityEl = document.getElementById('history');
var fiveResults = document.querySelector('.five-day');


function getWeather() {
  var city = cityInputEl.value;
  var fiveday = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;

  fetch(fiveday)
    .then(function (response) {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
    });
};

function displayResults(data) {
   var fiveResults = document.createElement('li');
   fiveResults.classList.add('weather');

   var cityName = data.city.name;
   var weatherCondition = data.list[0].weather[0].main;
   var weatherDescription = data.list[0].weather[0].description;
   var temperature = data.list[0].main.temp;

   weatherEl.innerHTML = '<h2>' + cityName + '</h2>' + '<p>weather: ' + weatherCondition + ' _ ' + weatherDescription + '</p>' +
   '<p>temperature:' + temperature + '</p>';

   previousCityEl.appendChild(fiveResults)
    .then(function(data){
      displayResults(data);
    });
};

submitBtn.addEventListener('click', getWeather);
var APIkey = '33ba9af51fbe9a62543d67bc2a30b9e8'
var city = 'miami';
var fiveday = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIkey;
var submitBtn = document.getElementById('btn');


var cityInputEl = document.getElementById('city-input');
var previousCityEl = document.getElementById('history');




function getWeather(){

 var city=cityInputEl.value.trim();
   if(city) {
      cityInfoEl(city);
      previousCityEl.textContent = '';
   }
   

    fetch(fiveday)
     .then(function(response){
        if(response.ok) {
            console.log(response.status);
            return response.json();
        } 
     }) .then(function(data){
        console.log(data);
     })
};

getWeather();


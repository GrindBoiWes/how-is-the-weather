var APIkey = '33ba9af51fbe9a62543d67bc2a30b9e8'
var city = 'seattle';
var fiveday = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+APIkey;
var submitBtn = document.getElementById('btn');

function getWeather(){

   // var searchcity = document.getElementById('city-input');
   

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


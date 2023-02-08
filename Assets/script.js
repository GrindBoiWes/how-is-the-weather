
var APIkey = '7a7c04d503977a6da6ac8ba6bdb48f18';
var cityInputEl = document.getElementById('city-input');
var submitBtn = document.querySelector('.btn');
//var previousCityEl = document.getElementById('history');
//var fiveResults = document.querySelector('.five-day');
var weatherEl = document.querySelector('.results');
var fivedayEl = document.querySelector('.five-day');


function getWeather() {
  var city = cityInputEl.value;
  var currentDay = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + APIkey;
  fetch(currentDay)
    .then(function (response) {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      displayResults(data);
    }); 
   };


function displayResults(data) {

   var cityName = data.city.name;
   var weatherCondition = data.list[0].weather[0].main;
   var weatherDescription = data.list[0].weather[0].icon;
   var temperature = data.list[0].main.temp;
   var windspeed = data.list[0].wind.speed;
   var humidity = data.list[0].main.humidity

   var iconLink ='http://openweathermap.org/img/wn/' + weatherDescription + '@2x.png';

   weatherEl.innerHTML = '<h2>' + cityName + '</h2>' + '<p>weather:'+ weatherCondition +  
   "<img src ='"+iconLink+"'/>" + '</p>' +'<p>temperature:' + temperature + '</p>' + '<p>windspeed ' + windspeed + '</p>' + '<p>Humidity: ' + humidity + '%</p>';

   //weatherEl.appendChild(weatherEl)
    };

    function fiveDayForecast(city) {
      
      var fiveDayUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + APIkey;
    
      
      fetch(fiveDayUrl)
        .then(function (response) {
         
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (data) {
          
          var forecastList = data.list;
          var fiveDayData = [];
          for (var i = 0; i < forecastList.length; i += 8) {

            var date = forecastList[i].dt_txt;
            var temperature = forecastList[i].main.temp;
            var weatherDescription = forecastList[i].weather[0].description;
            fiveDayData.push({ date, temperature, weatherDescription });
          }
          
          displayFiveDayForecast(fiveDayData);
        });
    }
    
    function displayFiveDayForecast(fiveDayData) {
      
      fivedayEl.innerHTML = '';
    
     
      for (var i = 0; i < fiveDayData.length; i++) {
        var date = fiveDayData[i].date;
        var temperature = fiveDayData[i].temperature;
        var weatherDescription = fiveDayData[i].weatherDescription;
    
       
        var dayEl = document.createElement('div');
        dayEl.innerHTML = '<h3>' + date + '</h3>' + '<p>Temperature: ' + temperature + '°F</p>' + '<p>Weather: ' + weatherDescription + '</p>';
    
        
        fivedayEl.appendChild(dayEl);
      }
    }
    

submitBtn.addEventListener('click', getWeather, fiveDayForecast);


 //http://openweathermap.org/img/wn/10d@2x.png
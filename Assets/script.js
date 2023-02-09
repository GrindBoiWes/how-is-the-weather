
var APIkey = '7a7c04d503977a6da6ac8ba6bdb48f18';
var cityInputEl = document.getElementById('city-input');
var submitBtn = document.querySelector('.btn');
var searchedCities = [];
var previousCityEl = document.getElementById('history');
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
      fiveDayForecast(data);
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

    function fiveDayForecast(data) {
      
          console.log(data);
          var forecastList = data.list;
          var fiveDayData = [];
          for (var i = 0; i < forecastList.length; i += 8) {

            var dateAndTime = forecastList[i].dt_txt;
            var date = dateAndTime.split(' ')[0];
            date = date.slice(5);
            var temperature = forecastList[i].main.temp;
            var weatherDescription = forecastList[i].weather[0].description;
            var windSpeed = forecastList[i].wind.speed;
            var humidity = forecastList[i].main.humidity;
            var icon = forecastList[i].weather[0].icon;
            fiveDayData.push({ date, temperature, weatherDescription, windSpeed, humidity, icon});
          }
          
          displayFiveDayForecast(fiveDayData);
       
    }
    
    function displayFiveDayForecast(fiveDayData) {
      
      fivedayEl.innerHTML = '';
      
      

      var forecastHeader = document.createElement('h2');
       forecastHeader.classList = ('five-day-header');
       forecastHeader.innerHTML = '5 Day Forecast';
       fivedayEl.appendChild(forecastHeader)
     
      for (var i = 0; i < fiveDayData.length; i++) {
        var date = fiveDayData[i].date;
        var temperature = fiveDayData[i].temperature;
        var weatherDescription = fiveDayData[i].weatherDescription;
        var windSpeed = fiveDayData[i].windSpeed;
        var humidity = fiveDayData[i].humidity;
        var icon = fiveDayData[i].icon;
        var iconLink ='http://openweathermap.org/img/wn/' + icon + '@2x.png';

        var dayEl = document.createElement('div');
        dayEl.classList = ('card-body');
        dayEl.innerHTML =  '<h3>' + date + '</h3>' + '<p>Temperature: ' + temperature + '°F</p>' + '<p>Weather: ' + weatherDescription + "<img src ='"+iconLink+"'/>" +  '</p>' + '<p>Wind Speed: ' + windSpeed + 'mph</p>' + '<p>Humidity: ' + humidity + '%</p>';
    
        
        fivedayEl.appendChild(dayEl);
        
      }
    };

    function displaySearchedCities() {
      
      previousCityEl.innerHTML = '';
      
      for (var i = 0; i < searchedCities.length; i++) {
        var city = searchedCities[i];

        var cityEl = document.createElement('p');
        cityEl.innerHTML = city;

        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
        searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];

       
        previousCityEl.appendChild(cityEl);
      }
    };
    

submitBtn.addEventListener('click', function() {
  var city = cityInputEl.value;
  searchedCities.push(city);
  displaySearchedCities();
  getWeather();
});


 //http://openweathermap.org/img/wn/10d@2x.png
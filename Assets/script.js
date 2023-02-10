// List of Dom Elements
var APIkey = '7a7c04d503977a6da6ac8ba6bdb48f18';
var cityInputEl = document.getElementById('city-input');
var submitBtn = document.querySelector('.btn');
var searchedCities = [];
var previousCityEl = document.getElementById('history');
var weatherEl = document.querySelector('#results');
var fivedayEl = document.querySelector('.five-day');
var clearSearch =  document.getElementById('clearBtn')
// This function will pull the api, and then return results based off of search
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
      displayCities();
    }); 
    
   };

// This function displays the current day's weather. It is set to display A name, 
function displayResults(data) {

   var cityName = data.city.name;
   var weatherCondition = data.list[0].weather[0].main;
   var weatherDescription = data.list[0].weather[0].icon;
   var temperature = data.list[0].main.temp;
   var windspeed = data.list[0].wind.speed;
   var humidity = data.list[0].main.humidity
   var date = new Date().toLocaleDateString();
   var iconLink ='http://openweathermap.org/img/wn/' + weatherDescription + '@2x.png';

   weatherEl.innerHTML = '<h2>' + cityName + ' '  + date  + "<img src ='"+iconLink+"'/>" + '</h2>' + '<p>Weather:'+ weatherCondition  + '</p>' +'<p>Temperature:' + temperature + '°F</p>' + '<p>Windspeed: ' + windspeed + 'mph</p>' + '<p>Humidity: ' + humidity + '%</p>';

   
    };
   // This function retrieves all of the data for the next 5 days. Inside this, you will see that we pull the same results from the current day, but we are splitting the date and time, while also starting i with a number besides 0 to pull a little further down in the array.
    function fiveDayForecast(data) {
      
          console.log(data);
          var forecastList = data.list;
          console.log(forecastList);
          var fiveDayData = [];
          for (var i = 0; i < forecastList.length; i += 8) {

            var dateAndTime = forecastList[i].dt_txt;
            var dateObj = new Date(dateAndTime);
            var month = dateObj.getMonth() + 1;  // months are zero-indexed
            var day = dateObj.getDate();
            var year = dateObj.getFullYear();
            var date = month + '/' + day + '/' + year;

            var temperature = forecastList[i].main.temp;
            var weatherDescription = forecastList[i].weather[0].description;
            var windSpeed = forecastList[i].wind.speed;
            var humidity = forecastList[i].main.humidity;
            var icon = forecastList[i].weather[0].icon;
            fiveDayData.push({ date, temperature, weatherDescription, windSpeed, humidity, icon});
          }
          
          displayFiveDayForecast(fiveDayData);
       
    }
    // This function is what will display all of the results from above, while setting the icon pulled from the API itself, matching the current weather.    
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


// This listener will start the process of pulling the data from your search. It will then store this function in the local storage inside inspect.
 submitBtn.addEventListener('click', function() {
  getWeather();
  searchedCities.push(cityInputEl.value);
  localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
});
// This function is set so it can store the searched results inside the local storage
function displayCities() {
  var storedCities = JSON.parse(localStorage.getItem('searchedCities'));
  if (storedCities !== null) {
    searchedCities = storedCities;
    displaySearchedCities();
  }
};
// This function creates buttons for the searched cities, so you can click on those to check the weather from the searched city again, without having to retype the city.
function displaySearchedCities() {
  previousCityEl.innerHTML = '';
  for (var i = 0; i < searchedCities.length; i++) {
    var cityBtn = document.createElement('button');
    cityBtn.classList = 'list-group-item list-group-item-action';
    cityBtn.textContent = searchedCities[i];
    cityBtn.addEventListener('click', function() {
      cityInputEl.value = this.textContent;
      getWeather();
    });
    previousCityEl.appendChild(cityBtn);
  }
}
 clearSearch.addEventListener('click', clearResults)
  
 


 function clearResults() {
  previousCityEl.innerHTML = '';
  localStorage.removeItem('searchedCities');
 }



 // Notes for myself, eventually go back and add the classlist add and remove to git rid of pesky box at the start of the screen
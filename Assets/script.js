
var APIKey ="33ba9af51fbe9a62543d67bc2a30b9e8";
var city;
var state;
var country;
var limit = 5;
var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?&appid=' + APIKey;
var searchBtn = document.getElementById('btn');

function getApi() {
   
    fetch(requestUrl)
    .then(function (response){
        console.log(response.status)
        return response.json();
    })
    .then(function (data){
        console.log(data);
    })
};


getApi();

// searchBtn.addEventListener('click', getApi());
    



















// Requirements to meet project below

// When I Search for a city
//Then presented with current and future conditions for that city and that city is added to the search history
// When I view current weather conditions for that city
// Then presented with the city name, date, and an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// When I view future weather conditions for that city
// Then I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind spide, and the humidity.
//When I click on a city in the search history
// Then I am again presented with current and future conditions for that city


// Notes 

// The functions for pulling information about the weather should be set in two different locations. One of them will pull the weather for that day, while the next function will pull a 5 day weather forecast once the search button is clicked.
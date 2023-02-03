
var apiKey ="33ba9af51fbe9a62543d67bc2a30b9e8"



function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}';

    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
}
























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
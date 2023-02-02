




function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={33ba9af51fbe9a62543d67bc2a30b9e8}';

    fetch(requestUrl)
    .then(function (response){
        return response.json();
    })
}
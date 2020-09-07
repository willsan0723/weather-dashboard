
var savedCities = [];
var cityStore = document.getElementById("city-store");
var fiveDay = document.getElementById("5day");

function getWeather(city) {    
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a2ad19dff1334775c857ddd51cc297c4&units=imperial'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // convert time from unix
            var unixTime = data.dt
            var date = new Date(unixTime * 1000);
            var newDate = date.toLocaleString();
            newDate = moment(newDate).format('M/D/YYYY');

            // clear out on each function call
            var responseContainerEl = document.querySelector('#response-container');
            responseContainerEl.innerHTML = '';
            var cityName = document.getElementById('cityName');
            cityName.innerHTML = '';
            // generate city name and weather image
            cityName.innerHTML = '<h2>' + data.name + '(' + newDate + ')<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png"></img></h2>'
            // save formatted city to local storage        
            if (data.name != null) {
                savedCities.push(data.name);
                localStorage.setItem("savedCities", JSON.stringify(savedCities));
            }

            var current = document.createElement('p');
            current.setAttribute("id", "current");
            current.innerHTML += 'Temperature: ' + data.main.temp.toFixed(1) + '\xB0F</br>';
            current.innerHTML += 'Humidity: ' + data.main.humidity + '%</br>';
            current.innerHTML += 'Wind Speed: ' + data.wind.speed + ' MPH</br>';
            responseContainerEl.appendChild(current);
            newCity(data.name);
            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat +
                '&lon=' + data.coord.lon + '&exclude=hourly,minutely&appid=a2ad19dff1334775c857ddd51cc297c4&units=imperial');
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            fiveDay.innerHTML = '';
            console.log(data);
            // convert time to usable
            for (var i = 1; i < 6; i++) {
            var unixTime = data.daily[i].dt;
            var date = new Date(unixTime * 1000);
            var newDate = date.toLocaleString();           
            fiveDay.innerHTML += '<h4>' + newDate + '</h4>';
            fiveDay.innerHTML += '<img src="http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png"></img>';
            fiveDay.innerHTML += 'Temperature: ' + data.daily[i].temp.day.toFixed(1) + '\xB0F</br>';
            fiveDay.innerHTML += 'Humidity: ' + data.daily[i].humidity + '%</br>';
            }
            
            current = document.getElementById("current");
            current.innerHTML += 'UV Index: <span id="UV">' + data.current.uvi + '</span>';
            var UV = document.getElementById("UV");
            if (data.current.uvi <= 2) {
                UV.style.backgroundColor = "green";
            }
            else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                UV.style.backgroundColor = "yellow";
                UV.style.color = "black";
            }
            else if (data.current.uvi > 5 && data.current.uvi <= 7) {
                UV.style.backgroundColor = "orange";
            }
            else if (data.current.uvi > 7 && data.current.uvi <= 10) {
                UV.style.backgroundColor = "red";
            }
            else {
                UV.style.backgroundColor = "purple";
            }
        })
        .catch(function (error) {
            alert("City not found! Please try again.")
        });
        
}

function clearStorage() {
    localStorage.clear();
    cityStore.innerHTML = '';    
}

// loadcities
function loadCities() {

var loadedCities = localStorage.getItem("savedCities");
if (!loadedCities) {
    return false;
}
loadedCities = JSON.parse(loadedCities);
for (var i = 0; i < loadedCities.length; i++) {
    savedCities.push(loadedCities[i]);
    var newCity = document.createElement('li');    
    newCity.textContent = loadedCities[i];    
    newCity.setAttribute("onclick", "getWeather($(this).text())");    
    cityStore.appendChild(newCity);
}
}

function newCity(name) {
    var newCity = document.createElement('li');
    newCity.textContent = name;
    newCity.setAttribute("onclick", "getWeather($(this).text())");    
    cityStore.appendChild(newCity);
}

loadCities();


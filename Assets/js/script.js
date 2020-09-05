

function getWeather() {
    var city = document.getElementById('city').value;    
    // var rating = document.getElementById("rating").value;
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a2ad19dff1334775c857ddd51cc297c4&units=imperial'
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var date = (moment().format('M/D/YYYY'));
        var responseContainerEl = document.querySelector('#response-container');
        responseContainerEl.innerHTML = '';
        var cityName = document.getElementById('cityName');
        cityName.textContent = data.name + '(' + date + ')';
        var current = document.createElement('p');
        current.setAttribute("id", "current");
        current.innerHTML += 'Temperature: ' + data.main.temp + '</br>';
        current.innerHTML += 'Humidity: ' + data.main.humidity +'%</br>';
        current.innerHTML += 'Wind Speed: ' + data.wind.speed + ' MPH</br>';

        responseContainerEl.appendChild(current);                
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat +
        '&lon=' + data.coord.lon + '&exclude=hourly,minutely&appid=a2ad19dff1334775c857ddd51cc297c4&units=imperial');
      })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data.current.uvi);
            current = document.getElementById("current");
            current.innerHTML += 'UV Index: ' + data.current.uvi;

        });
  }
 
//UVI
//onecall
// uv and 5 day forecast


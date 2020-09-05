

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
        // if (!data) {
        //     alert('Could not find a city by that name! Please try again.');
        //   }
        console.log(data);
        var unixTime = data.dt
        var date = new Date(unixTime * 1000);
        var newDate = date.toLocaleString();
        newDate = moment(newDate).format('M/D/YYYY');

        var responseContainerEl = document.querySelector('#response-container');
        responseContainerEl.innerHTML = '';
        var cityName = document.getElementById('cityName');
        cityName.innerHTML = '';
        cityName.innerHTML = '<h2>' + data.name + '(' + newDate + ')<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png"></img></h2>'
        
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

            var unixTime = data.current.dt;

            var date = new Date(unixTime * 1000);
            var newDate = date.toLocaleString();
            // console.log(newDate);            

            current = document.getElementById("current");
            current.innerHTML += 'UV Index: <span id="UV">' + data.current.uvi + '</span>';
            var UV = document.getElementById("UV");
            if (data.current.uvi <= 2) {
            UV.style.backgroundColor = "green";
            }
            else if (data.current.uvi > 2 && data.current.uvi <= 5) {
                UV.style.backgroundColor = "yellow";
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
        .catch(function(error){
            alert("City not found! Please try again.")
        });
  }
  
// // uv and 5 day forecast &exclude=hourly,minutely



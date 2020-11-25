let unitButtons = document.querySelectorAll(".unit");
let cityInput = document.querySelector("#city-input");
let featureTemp = document.querySelector("#feature-temp");
let featureIcon = document.querySelector("#feature-icon");
let dayIcon = document.querySelector("#dayIcon");
let farenheit;
let unitF = document.querySelector("#unitF");
let unitC = document.querySelector("#unitC");
let tempUnitF;
let temmpUnitC;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function displayDate() {
  let date = new Date();
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  // else if (hour !== 2300 && minute > 30) {
  //   hour = hour + 1;
  // } else if (hour == 23 && minute > 30) {
  //   hour = 00;
  // }

  if (minute < 10) {
    minute = `0${minute}`;
  }
  let dateDisplay = document.querySelector(".date-display");

  dateDisplay.innerHTML = `${day} ${hour}:${minute}`;
}

function displayWeatherIcon(response, icon) {
  if (response == 800) {
    icon.setAttribute("class", "fas fa-sun");
  } else if (response > 199 && response < 300) {
    icon.setAttribute("class", "fas fa-poo-storm");
  } else if (
    (response > 299 && response < 312) ||
    (response >= 500 && response < 502)
  ) {
    icon.setAttribute("class", "fas fa-cloud-rain");
  } else if (response >= 312 && response < 600) {
    icon.setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (response >= 600 && response < 700) {
    icon.setAttribute("class", "far fa-snowflake");
  } else if (response >= 700 && response < 800) {
    icon.setAttribute("class", "fas fa-smog");
  } else if (response == 801 || response == 802) {
    icon.setAttribute("class", "fas fa-cloud-sun");
  } else if (response == 803 || 804) {
    icon.setAttribute("class", "fas fa-cloud");
  }
}

function displayCityWeather(response) {
  let featureTemp = document.querySelector("#feature-temp");
  let cityDisplay = document.querySelector(".city");
  let featureDesc = document.querySelector(".feature-desc");
  let city = response.data.name;
  let country = response.data.sys.country;
  let coordLon = response.data.coord.lon;
  let coordLat = response.data.coord.lat;
  farenheit = response.data.main.temp;
  featureTemp.innerHTML = Math.round(response.data.main.temp);
  cityDisplay.innerHTML = `${city}, ${country}`;
  featureDesc.innerHTML = response.data.weather[0].description;
  displayDate();
  displayWeatherIcon(response.data.weather[0].id, featureIcon);
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordLat}&lon=${coordLon}&exclude=hourly,minutely,alerts&units=imperial&appid=2a534937b5f8acf07d8f3ef2e0bea454`
    )
    .then(displayForecast);
}

function searchCity(city) {
  let apiKey = "2a534937b5f8acf07d8f3ef2e0bea454";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityWeather);
}

function displayForecast(response) {
  console.log(response.data);
  let weekDisplay = document.querySelector(".week");
  let forecastDay = new Date();
  weekDisplay.innerHTML = "";

  for (i = 0; i < 6; i++) {
    weekDisplay.innerHTML += `
          <div class="card text-center col-sm-12 col-md-4 col-lg-2 mx-auto">
            <div class="card-body" id="day">
              <span class="card-title dayName"></span>
              <p class="card-text week-temp tempUnitF">Low: ${Math.round(
                response.data.daily[i].temp.min
              )} High: 
                ${Math.round(response.data.daily[i].temp.max)}
              </p>
              <p class="card-text week-temp tempUnitC hide">Low: ${Math.round(
                (response.data.daily[i].temp.min - 32) * (5 / 9)
              )} High: 
                ${Math.round((response.data.daily[i].temp.max - 32) * (5 / 9))}
              </p>
              <i class="fas fa-rain" id="dayIcon"></i>
            </div>
          </div>
          `;
    let dayIcon = document.querySelectorAll("#dayIcon");
    displayWeatherIcon(response.data.daily[i].weather[0].id, dayIcon[i]);
  }
  tempUnitF = document.querySelectorAll('.tempUnitF');
  tempUnitC = document.querySelectorAll('.tempUnitC');
  addListeners();
}

function handleSubmit(event) {
  event.preventDefault();
  searchCity(cityInput.value);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

function getCurrentWeather(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEnd = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "2a534937b5f8acf07d8f3ef2e0bea454";
  let apiUrl = `${apiEnd}lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  cityInput.value = "Current Location";
  axios.get(apiUrl).then(displayCityWeather);
}

function getCurrentPosition() {
  unitButtons[0].classList.add("selected");
  unitButtons[1].classList.remove("selected");
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let form = document.querySelector(".input-form");
form.addEventListener("submit", handleSubmit);

function addListeners() {
  for (let i = 0; i < unitButtons.length; i++) {
    unitButtons[i].addEventListener("click", function (event) {
      if (this.textContent === "°C") {
        event.preventDefault();
        unitButtons[1].classList.add("selected");
        unitButtons[0].classList.remove("selected");
        tempUnitF.forEach((tempUnit) => {
          tempUnit.classList.add("hide");
        });
        tempUnitC.forEach((tempUnit) => {
          tempUnit.classList.remove("hide");
        });
        let celsius = (farenheit - 32) * (5 / 9);
        featureTemp.innerHTML = Math.round(celsius);
      } else if (this.textContent === "°F") {
        event.preventDefault();
        featureTemp.innerHTML = Math.round(farenheit);
        unitButtons[0].classList.add("selected");
        unitButtons[1].classList.remove("selected");
        tempUnitF.forEach((tempUnit) => {
          tempUnit.classList.remove("hide");
        });
        tempUnitC.forEach((tempUnit) => {
          tempUnit.classList.add("hide");
        });
      }
    });
  }
}

// searchCity("San Francisco");
var cities = [
  "San Francisco",
  "Tokyo",
  "Washington DC",
  "Miami",
  "Mexico City",
  "Paris",
  "Sydney",
  "London",
  "Amsterdam",
];
function pickRandomCity() {
  let randomCity = cities[Math.floor(Math.random() * 9)];
  console.log(randomCity);

  searchCity(randomCity);
}
pickRandomCity();

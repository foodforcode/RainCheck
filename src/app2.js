let unitButtons = document.querySelectorAll(".unit");
let cityInput = document.querySelector("#city-input");
let featureTemp = document.querySelector("#feature-temp");
let featureIcon = document.querySelector("#feature-icon");
let dayIcon = document.querySelector("#dayIcon");
let farenheit;
let unitF = document.querySelector("#unitF");
let unitC = document.querySelector("#unitC");

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  if (response.data.weather[0].id == 800) {
    icon.setAttribute("class", "fas fa-sun");
  } else if (
    response.data.weather[0].id > 199 &&
    response.data.weather[0].id < 300
  ) {
    icon.setAttribute("class", "fas fa-poo-storm");
  } else if (
    (response.data.weather[0].id > 299 && response.data.weather[0].id < 312) ||
    (response.data.weather[0].id >= 500 && response.data.weather[0].id < 502)
  ) {
    icon.setAttribute("class", "fas fa-cloud-rain");
  } else if (
    response.data.weather[0].id >= 312 &&
    response.data.weather[0].id < 600
  ) {
    icon.setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (
    response.data.weather[0].id >= 600 &&
    response.data.weather[0].id < 700
  ) {
    icon.setAttribute("class", "far fa-snowflake");
  } else if (
    response.data.weather[0].id >= 700 &&
    response.data.weather[0].id < 800
  ) {
    icon.setAttribute("class", "fas fa-smog");
  } else if (
    response.data.weather[0].id == 801 ||
    response.data.weather[0].id == 802
  ) {
    icon.setAttribute("class", "fas fa-cloud-sun");
  } else if (response.data.weather[0].id == 803 || 804) {
    icon.setAttribute("class", "fas fa-cloud");
  }
}

function displayCityWeather(response) {
  let featureTemp = document.querySelector("#feature-temp");
  let cityDisplay = document.querySelector(".city");
  let featureDesc = document.querySelector(".feature-desc");
  let city = response.data.name;
  let country = response.data.sys.country;
  farenheit = response.data.main.temp;
  featureTemp.innerHTML = Math.round(response.data.main.temp);
  cityDisplay.innerHTML = `${city}, ${country}`;
  featureDesc.innerHTML = response.data.weather[0].description;
  displayDate();
  displayWeatherIcon(response, featureIcon);
}

function searchCity(city) {
  let apiKey = "2a534937b5f8acf07d8f3ef2e0bea454";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCityWeather);
  // console.log(apiUrl);
}

function logForecast(response) {
  // console.log(response.data);

  let weekDisplay = document.querySelector(".week");
  let forecastDay = new Date();
  let week = 7;
  //add function to match temp to days[i]

  for (i = 0; i < week; i++) {
    console.log(days[i]);
    console.log(response.data.daily[i]);
    if (days[i] !== days[forecastDay.getDay()]) {
      weekDisplay.innerHTML += `
          <div class="card text-center col-sm-12 col-md-4 col-lg-2 mx-auto">
            <div class="card-body" id="day">
              <span class="card-title dayName">${days[i]}</span><br />
              <i class="fas fa-cloud" id="dayIcon"></i>
              <p class="card-text week-icon">${Math.round(
                response.data.daily[i].temp.min
              )} -
                ${Math.round(response.data.daily[i].temp.max)}
              </p>
            </div>
          </div>
          `;
    }
    // if (forecastDay.getDay() === 6) {
    //   for (j = 0; j < week - i; j++) {
    //     weekDisplay.innerHTML += `<div class="card text-center col-sm-12 col-md-2">
    //         <div class="card-body" id="day">
    //           <p class="card-title dayName">${days[j]}</p>
    //           <p class="card-text week-icon">
    //             <i class="" id="dayIcon"></i>
    //           </p>
    //         </div>
    //       </div>`;
    //     console.log(days[j]);
    //   }
    // }
  }
}

axios
  .get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely,alerts&units=imperial&appid=2a534937b5f8acf07d8f3ef2e0bea454`
  )
  .then(logForecast);

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

for (let i = 0; i < unitButtons.length; i++) {
  unitButtons[i].addEventListener("click", function (event) {
    if (this.textContent === "°C") {
      event.preventDefault();
      unitButtons[1].classList.add("selected");
      unitButtons[0].classList.remove("selected");
      let celsius = (farenheit - 32) * (5 / 9);
      featureTemp.innerHTML = Math.round(celsius);
    } else if (this.textContent === "°F") {
      event.preventDefault();
      featureTemp.innerHTML = Math.round(farenheit);
      unitButtons[0].classList.add("selected");
      unitButtons[1].classList.remove("selected");
    }
  });
}
searchCity("San Francisco");

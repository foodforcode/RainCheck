let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

// let city = prompt("Enter a city").toLowerCase();
let temp;
let humidity;

if (weather.hasOwnProperty(`${input}`)) {
  temp = weather[`${input}`]["temp"];
  humidity = weather[`${input}`]["humidity"];
  alert(`It is currently ${temp}°C in ${input} with a humidity of ${humidity}`);
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${input}`
  );
}

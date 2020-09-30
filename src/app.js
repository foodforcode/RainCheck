let unitButtons = document.querySelectorAll(".unit");

function displayDate() {
  let date = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  console.log(minute);
  if (hour < 10) {
    hour = `0${hour}`;
  } else if (hour !== 2300 && minute > 30) {
    hour = hour + 1;
  } else if (hour == 23 && minute > 30) {
    hour = 00;
  }

  console.log(hour);
  let dateDisplay = document.querySelector(".date-display");

  dateDisplay.innerHTML = `${day} ${hour}:00`;
}

displayDate();

let form = document.querySelector(".input-form");
form.addEventListener("keydown", searchCity);

function searchCity(event) {
  if (event.keyCode === 13) {
    let cityDisplay = document.querySelector(".city");
    let destination = document.querySelector("#city-input");
    cityDisplay.innerHTML = `${destination.value}`;
    destination.value = "";
  }
}

let unitF = document.querySelector(".unitF");
let unitC = document.querySelector(".unitC");
let tempUnitF = document.querySelector("#tempUnitF");
let tempUnitC = document.querySelector("#tempUnitC");

unitF.addEventListener("click", function () {
  unitC.classList.remove("selected");
  unitF.classList.remove("selected");
  tempUnitC.classList.add("hide");
  unitF.classList.add("selected");
  tempUnitF.classList.remove("hide");
});
unitC.addEventListener("click", function () {
  unitF.classList.remove("selected");
  unitC.classList.remove("selected");
  tempUnitF.classList.add("hide");
  unitC.classList.add("selected");
  tempUnitC.classList.remove("hide");
});

let tempUnits = document.querySelectorAll(".tempUnit");

// for (let i = 0; i < unitButtons.length; i++) {
//   unitButtons.addEventListener("click", function () {
//     unitButtons[0].classList.remove("selected");
//     unitButtons[1].classList.remove("selected");
//     if (this.textContent === "°C") {
//       unitButtons[1].classList.add("selected");
//       unitButtons[0].classList.remove("selected");
//       tempUnit[0].classList.add("hide");
//       tempUnit[1].classList.remove("hide");
//     } else {
//       unitButtons[0].classList.add("selected");
//       unitButtons[1].classList.remove("selected");
//       tempUnit[0].classList.remove("hide");
//       tempUnit[1].classList.add("hide");
//     }
//   });
// }

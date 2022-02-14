let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentTime.getMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let displayedTime = document.querySelector("#displayed-time");
displayedTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

// 🕵️‍♀️Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function displayWeatherConditions(response) {
  console.log(response);
  let currentCelsiusTemp = Math.round(response.data.main.temp);
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let currentHumidity = Math.round(response.data.main.humidity);
  let displayedCurrentTemp = document.querySelector("#displayed-current-temp");
  let displayedCurrentHumidity = document.querySelector("#current-humidity");
  let displayedCurrentWindSpeed = document.querySelector("#current-wind-speed");
  displayedCurrentTemp.innerHTML = currentCelsiusTemp;
  displayedCurrentHumidity.innerHTML = `Humidity: ${currentHumidity}%`;
  displayedCurrentWindSpeed.innerHTML = `Wind: ${currentWindSpeed} m/s`;
}

function displayCity(event) {
  event.preventDefault();
  let displayedCity = document.querySelector("#displayed-city");
  let enteredCity = document.querySelector("#search-city-input");
  displayedCity.innerHTML = enteredCity.value;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = `b9da97a66329124a9eae273c120a5d07`;
  let apiUnit = "metric";
  let apiUrl = `${apiEndpoint}q=${enteredCity.value}&appid=${apiKey}&units=${apiUnit}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function showTemperatureFromCoords(response) {
  let currentCelsiusTemp = Math.round(response.data.main.temp);
  let displayedCurrentTemp = document.querySelector("#displayed-current-temp");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  let currentHumidity = Math.round(response.data.main.humidity);
  let displayedCurrentHumidity = document.querySelector("#current-humidity");
  let displayedCurrentWindSpeed = document.querySelector("#current-wind-speed");
  displayedCurrentTemp.innerHTML = currentCelsiusTemp;
  displayedCurrentHumidity.innerHTML = `Humidity: ${currentHumidity}%`;
  displayedCurrentWindSpeed.innerHTML = `Wind: ${currentWindSpeed} m/s`;
  console.log(response);
  let displayedGeoCity = document.querySelector("#displayed-city");
  let cityFromCoords = response.data.name;
  console.log(cityFromCoords);
  displayedGeoCity.innerHTML = `${cityFromCoords}`;
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b9da97a66329124a9eae273c120a5d07";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperatureFromCoords);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

function useGeolocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", useGeolocation);

let cityForm = document.querySelector("#search-city-form");
cityForm.addEventListener("submit", displayCity);

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let displayedTemperature = document.querySelector("#displayed-temp");
//   displayedTemperature.innerHTML = `75`;
//   document.getElementById("temp-unit-cel").style.color = "blue";
//   document.getElementById("temp-unit-fah").style.color = "black";
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let displayedTemperature = document.querySelector("#displayed-temp");
//   displayedTemperature.innerHTML = `24`;
//   document.getElementById("temp-unit-cel").style.color = "black";
//   document.getElementById("temp-unit-fah").style.color = "blue";
// }

// let celsiusToggle = document.querySelector("#temp-unit-cel");
// let fahrenheitToggle = document.querySelector("#temp-unit-fah");

// fahrenheitToggle.addEventListener("click", convertToFahrenheit);
// celsiusToggle.addEventListener("click", convertToCelsius);

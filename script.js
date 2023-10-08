const locationName = document.querySelector(".location");
const temp = document.querySelector(".temp");
const feels = document.querySelector(".feels .bold");
const humidity = document.querySelector(".humidity .bold");
const wind = document.querySelector(".wind .bold");
const cityInput = document.querySelector("#city-input");
const searchForm = document.querySelector("#search-form");
const button = document.querySelector("#button");
const celciusBtn = document.querySelector(".celcius");
const farenheitBtn = document.querySelector(".farenheit");
const body = document.querySelector("body");
const darkMode = document.querySelector(".dark-mode");
let unit = "imperial";
let tempC = " °C";
let windC = "km/hr";

darkMode.addEventListener("click", function () {
  body.classList.toggle("dark");
  const darkStore = body.classList;
  // console.log(darkStore)
  if (darkStore.value === "dark") {
    darkMode.innerText = "Light mode";
  } else if (darkStore.value === "") {
    darkMode.innerText = "Dark mode";
  }
  // const localStorage =
});

celciusBtn.addEventListener("click", function () {
  unit = "metric";
  tempC = " °C";
  windC = "km/hr";
  celciusBtn.classList.add("active");
  farenheitBtn.classList.remove("active");
  fetchWeatherData();
  // if (celciusBtn.className =='active') {
  // 	tempC = '° C'
  // 	windC = 'km/hr'
  // } else {
  // 	tempC = '° F'
  // 	windC = 'miles/hr'
  // }
});

farenheitBtn.addEventListener("click", function () {
  unit = "imperial";
  tempC = "° C";
  windC = "km/hr";
  farenheitBtn.classList.add("active");
  fetchWeatherData();
  celciusBtn.classList.remove("active");

//   if (farenheitBtn.className == 'active') {
//   	tempC = '° F'
//   	windC = 'miles/hr'
//   	console.log(windC)
//   } else {
//   	tempC = '° C'
//   	windC = 'km/hr'
//   }
});

function displayOnTheScreen(weather) {
  // console.log(weather)
  let tempVal = unit === "imperial" ? " °F" : " °C";
//   let wind = unit === "imperial" ? " miles/hr" : " km/hr";
  locationName.innerText = weather.name;
  temp.innerText = `${Math.round(weather.main.temp)} ${tempVal}`;
  feels.innerText = weather.main.feels_like;
  wind.innerText = `${weather.wind.speed} ${windVal}`;
  humidity.innerText = `${weather.main.humidity} %`;
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchWeatherData();
  fetchPhotos();
});

const fetchWeatherData = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=d030ac84773f6c1da5dcb6a7fe964373`
  );
  const data = await res.json();
  displayOnTheScreen(data);
  fetchPhotos(data);
  // console.log(data)
};

const fetchPhotos = async () => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${cityInput.value}&client_id=rHmxEbgWBRmubuvdh_3Dgfr0oX90J3hwdc4zZVYK3r0`
  );
  const data = await res.json();
  const imageURL = data.results[0].urls.regular;
  console.log(imageURL);
  setBackgroundPicture(imageURL);
};

const setBackgroundPicture = (url) => {
  body.style.backgroundImage = `url(${url})`;
};

//task:
// 1. create a button called "Dark Mode"
// 2. as i click on the button, I want my screen to be dark (either totally black or darker shade of the background picture)
// 3. if i click on the button again, I want my screen to go back to normal light mode.
// extra: make button name dynamic, toggle its name between dark mode and light mode
// extra extra: save dark mode preferences in the local storage.

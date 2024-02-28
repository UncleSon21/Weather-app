const apiKey = "4a0fa09eef2e26dd9111fde4dcae6910";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weatherIcon = document.querySelector(".weather-icon");

let searchBox;
let searchButton;

document.addEventListener("DOMContentLoaded", () => {
  searchBox = document.querySelector(".search input");
  searchButton = document.querySelector(".search button");

  if (searchButton && searchBox) {
    searchButton.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });
  } else {
    console.error("Search elements not found in the DOM.");
  }
});

async function checkWeather(city) {
  try {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    }
    else{
        const data = await response.json();

        console.log(data);
    
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    // Handle the error, e.g., display a message to the user
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const tempDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessage = document.getElementById('error-message');
  const API_KEY = "88f261b6788b95fe4a317c8e84683547";     // put this later on in env variables

  getWeatherBtn.addEventListener('click', async () => {
    const city = input.value.trim();
    if (city === "")  return;

    // 2 Things to keep in mind while making request to another server :
    // 1. Server may throw an ERROR
    // 2. Server/database is in another continent, so it may take time

    // solving the first case-scenario  -> error aaaya toh
    try {
        const weatherData = await fetchWeatherData(city);     //returns Object    //await resolves 2nd wala
        displayWeatherData(weatherData);
    } catch (error) {
        showError();
    }

  })

  
  async function fetchWeatherData(city) {     //make a call and return the data 
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);    // fetch() : used for making HTTP requests and processing responses
    console.log(typeof response);   // object
    console.log(response);

    if (!response.ok) {
      throw new Error(`City not Found.`);
    }

    const dataJSObject = await response.json();      // json() : json to JS object
    return dataJSObject;
  }

  
  function displayWeatherData(weatherData) {
    console.log(weatherData);         // JS Object

    //study keys of response(as JS object) name and extract data (use data)
    const {name, main, weather} = weatherData;
    cityNameDisplay.textContent = name;           
    tempDisplay.textContent = `Temperature : ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // cityNameDisplay.textContent = weatherData.name;     
    // tempDisplay.textContent = weatherData.main.temp;
    // descriptionDisplay.textContent = weatherData.weather[0].description;

    //unlock the display
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
  }

  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
  
})
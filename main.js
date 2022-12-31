/* eslint-disable indent */
/* eslint-disable semi */
// Variables

const city = document.querySelector('.city');
const iconWeather = document.querySelector('.icon');
const descriptionWeather = document.querySelector('.description');
const temperature = document.querySelector('.temp');
const humidityWeather = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const searchButton = document.querySelector('.search button');
const searchBar = document.querySelector('.search-bar');

const weather = {
  apiKey: 'e1a8ec3c9e7109288ae0d161540d1de7',
  fetchWeather: function (city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
          city +
          '&units=metric&appid=' +
          this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
            alert('No weather found.');
            throw new Error('No weather found');
        }
          return response.json();
      })
      .then((data) => this.displayWeather(data))
  },
  displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      city.innerText = 'Weather in ' + name;
      iconWeather.innerText = 'https://openweathermap.org/img/wn/' + icon + '.png';
      descriptionWeather.innerText = description;
      temperature.innerText = temp + '°C';
      humidityWeather.innerText =
          'Humidity: ' + humidity + '%';
      wind.innerText =
          'Wind speed: ' + speed + ' km/h';
      document.querySelector('.weather').classList.remove('loading');
      document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
      this.fetchWeather(document.querySelector('.search-bar').value);
  }
}

searchButton.addEventListener('click', () => {
    weather.search();
})

searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
      weather.search();
  }
})
weather.fetchWeather('Larissa');

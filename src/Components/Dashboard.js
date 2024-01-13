import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const Dashboard = () => {
  const [latitude, setLatitude] = useState('6.9271');
  const [longitude, setLongitude] = useState('79.8612');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleReset = () => {
    setLatitude('');
    setLongitude('');
  };

  const handleGetCity = async () => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=4a2a175edb484c029e9fbf619e113e25&q=${latitude}+${longitude}`);
      const cityName = response.data.results[0].components.city;
      setCity(cityName);

      // Fetch weather details based on city
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=02ea92799aa786a0fcc478aaecba48de`);
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=02ea92799aa786a0fcc478aaecba48de`);
      setForecast(forecastResponse.data.list);


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Weather Lookup</h1>
      <div className='container'>
        <div className='container2'>
        <h4>Enter latitude and longitude</h4>
          <div className='labels'>
            <label id='lat'>Latitude:</label>
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          </div>
          <div className='labels' id='two'>
            <label id='lan'>Longitude:</label>
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </div>
          <div className='buttons'>
            <button id = 'btn1' onClick={handleGetCity}>Submit</button>
            <button id = 'btn2' onClick={handleReset}>Reset</button>
          </div>
        </div>
      
        <div className='details'>
          <div className='weather1'>
            {city && <h4 id='cityh4'>{city}</h4>}
            {weather && (
              <div className='one'>
                  <h1>{weather.main.temp}°C</h1>
                  
                  <br />
                <div className='weather'>
                  <p id='day'>Day:{new Date(weather.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })}</p>
                  <p>Weather:{weather.weather[0].description}</p>
                  <p>Wind:   {weather.wind.speed} km/h</p>
                  <p>Humidity:{weather.main.humidity}%</p>
                  <p>Clouds: {weather.clouds.all}%</p>
                  <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
                  <p>Pressure: {weather.main.pressure} hPa</p>
                  <br />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='two'>
            {forecast.length > 0 && (
              <div className='forecast'>
                <h4 id='next'>Next  3 Day's Forecast</h4>
                <br />
                {forecast.slice(0, 3).map((item, index) => (
                  <div key={index} >
                    <h4>Day: 0{index + 1}</h4>
                    <div className='days'>
                      <p>Weather: {item.weather[0].description}</p>
                      <p>Temperature: {item.main.temp}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;


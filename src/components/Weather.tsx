import React, { useState, useEffect, useRef } from "react";
import {
  getWeatherByCity,
  getWeatherByCurrentLocation,
} from "../services/WeatherService";
import HorizontalList from "./common/HorizontalList";
import { useWeathers } from "../contexts/WeatherContext";
import { loadState, saveState } from "../utils/storage";

const initialWeatherData: WeatherData = {
  current_weather: {
    temperature: 0,
    time: "",
  },
  daily: {
    temperature_2m_min: [],
    temperature_2m_max: [],
    time: [],
  },
};

const Weather: React.FC = () => {
  const { isToggled, updateCity, temperatureUnit } = useWeathers();
  const [weather, setWeather] = useState<WeatherData>(initialWeatherData);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    handleSetWeather(temperatureUnit);
  }, [isToggled]);

  const getCurrentWeather = async (unit: string) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const weatherData = await getWeatherByCurrentLocation(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            unit
          );
          setWeatherData(weatherData);
        },
        (error) => {
          setError(`Error Code = ${error.code} - ${error.message}`);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const getCityWeather = async (city: string, unit: string) => {
    const weatherData = await getWeatherByCity(city, unit);
    setWeatherData(weatherData);
  };

  const updateWeather = (city: string, currentWeather: WeatherData) => {
    const newWeather: WeatherData = { ...currentWeather };
    setWeather(newWeather);
    saveState(`${city}-${temperatureUnit}`, newWeather);
  };

  const setWeatherData = (weatherData: WeatherData) => {
    const city = cityInputRef.current?.value;
    weather.current_weather.temperature =
      weatherData.current_weather.temperature;
    weather.current_weather.time = weatherData.current_weather.time;
    weather.daily.temperature_2m_max =
      weatherData.daily.temperature_2m_max.slice(1);
    weather.daily.temperature_2m_min =
      weatherData.daily.temperature_2m_min.slice(1);
    weather.daily.time = weatherData.daily.time.slice(1);

    updateWeather(city as string, weather);
  };

  const handleSetWeather = async (unit: string) => {
    const city = cityInputRef.current?.value;
    updateCity(city as string);

    const cachedWeather = loadState(`${city}-${unit}`);
    if (cachedWeather) {
      setWeather({ ...cachedWeather } as WeatherData);
      return;
    }

    if (city) {
      getCityWeather(city, unit);
    } else {
      getCurrentWeather(unit);
    }
  };

  return (
    <div>
      <input ref={cityInputRef} placeholder="If empty, current location" />
      <button onClick={() => handleSetWeather(temperatureUnit)}>Submit</button>
      <div>{cityInputRef.current?.value} Weather</div>
      <div>{weather.current_weather.temperature}</div>
      <HorizontalList title="Dates" list={weather.daily.time} />
      <HorizontalList title="Max" list={weather.daily.temperature_2m_max} />
      <HorizontalList title="Min" list={weather.daily.temperature_2m_min} />

      {error && <div>{error}</div>}
    </div>
  );
};

export default Weather;

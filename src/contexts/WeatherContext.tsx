import React, { createContext, useContext, useState, ReactNode } from "react";
import { loadState, saveState } from "../utils/storage";

interface WeatherContextType {
  weather: WeatherData;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData>>;
  updateWeather: (city: string, currentWeather: WeatherData) => void;
}
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
interface WeatherProviderProps {
  children: ReactNode;
}

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

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData>(
    loadState("CurrentLocation") ?? initialWeatherData
  );

  const updateWeather = (city: string, currentWeather: WeatherData) => {
    const newWeather: WeatherData = { ...currentWeather };
    setWeather(newWeather);
    saveState(city, newWeather);
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        updateWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;

export const useWeathers = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeathers must be used within a WeatherProvider");
  }
  return context;
};

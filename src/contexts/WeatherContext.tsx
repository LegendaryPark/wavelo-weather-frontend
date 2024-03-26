import React, { createContext, useContext, useState, ReactNode } from "react";

interface WeatherContextType {
  isToggled: boolean;
  toggleWeather: () => void;
  updateCity: (updatedCity: string) => void;
  city: string;
  temperatureUnit: TemperatureUnit;
}
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);
interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [isToggled, setIsToggle] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");

  const toggleWeather = () => {
    const newToggle = !isToggled;

    setTemperatureUnit(currentTemperatureUnit(newToggle));
    setIsToggle(newToggle);
  };

  const updateCity = (updatedCity: string) => {
    setCity(updatedCity);
  };
  const currentTemperatureUnit = (toggle: boolean): TemperatureUnit => {
    return toggle ? "fahrenheit" : "celsius";
  };

  return (
    <WeatherContext.Provider
      value={{
        isToggled,
        toggleWeather,
        updateCity,
        city,
        temperatureUnit,
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

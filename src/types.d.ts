interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

interface DailyWeather {
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  time: string[];
}

interface CurrentWeather {
  temperature: number;
  time: string;
}

interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyWeather;
}

interface HashMap<T> {
  [details: T]: T;
}

type TemperatureUnit = "fahrenheit" | "celsius";

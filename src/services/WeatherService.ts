import axios from "axios";

export const getWeatherByCurrentLocation = async (
  locationData: LocationState,
  temperatureUnit: string
) => {
  try {
    const weatherRes = await axios.get(
      `http://localhost:8800/weather/current`,
      {
        params: {
          lat: locationData.latitude,
          lon: locationData.longitude,
          unit: temperatureUnit,
        },
      }
    );

    return weatherRes.data;
  } catch (error) {
    console.error("Failed to fetch weather", error);
  }
};

export const getWeatherByCity = async (city: string, unit: string) => {
  try {
    const locationRes = await axios.get(
      `http://localhost:8800/weather/location/:${city}`,
      {
        params: { unit },
      }
    );
    return locationRes.data;
  } catch (error) {
    console.error("Failed to fetch weather", error);
  }
};

export const getWeatherHistoryByCity = async (
  city: string,
  unit: string,
  startDate: string,
  endDate: string
) => {
  try {
    const locationRes = await axios.get(
      `http://localhost:8800/weather/history/:${city}`,
      {
        params: { unit, startDate, endDate },
      }
    );
    return locationRes.data;
  } catch (error) {
    console.error("Failed to fetch weather", error);
  }
};

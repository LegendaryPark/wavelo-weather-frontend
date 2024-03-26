import React, { useEffect, useState } from "react";
import { getWeatherHistoryByCity } from "../services/WeatherService";
import HorizontalList from "./common/HorizontalList";
import { formatDate } from "../utils/dateUtil";
import { useWeathers } from "../contexts/WeatherContext";
import { loadState, saveState } from "../utils/storage";

const initialHistory = {
  temperature_2m_min: [],
  temperature_2m_max: [],
  time: [],
};

const History: React.FC = () => {
  const [history, setHistory] = useState<DailyWeather>(initialHistory);
  const { isToggled, city, temperatureUnit } = useWeathers();

  useEffect(() => {
    getHistoricalWeatherData(
      city,
      temperatureUnit,
      formatDate(new Date(), -7),
      formatDate(new Date(), -2)
    );
  }, [isToggled]);

  const getHistoricalWeatherData = async (
    city: string,
    temperatureUnit: string,
    startDate: string,
    endDate: string
  ) => {
    const cachedHistory = loadState(`history-${city}-${temperatureUnit}`);
    if (cachedHistory) {
      setHistory({ ...cachedHistory } as DailyWeather);
      return;
    }

    const historicalData = await getWeatherHistoryByCity(
      city,
      temperatureUnit,
      startDate,
      endDate
    );

    saveState(`history-${city}-${temperatureUnit}`, historicalData?.daily);
    setHistory(historicalData?.daily);
  };
  return (
    <div>
      <div>{city} Weather Detail</div>
      <HorizontalList title="Dates" list={history?.time} />
      <HorizontalList title="Max" list={history?.temperature_2m_max} />
    </div>
  );
};

export default History;

import { Outlet, Link } from "react-router-dom";
import { useWeathers } from "../contexts/WeatherContext";

const Layout = () => {
  const { isToggled, toggleWeather } = useWeathers();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
          <li>
            <Link to="/history">Weather Details</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
      <button
        onClick={toggleWeather}
        className={`toggle-button ${isToggled ? "on" : "off"}`}
      >
        {isToggled ? "Fahrenheit" : "Celsius"}
      </button>
    </>
  );
};

export default Layout;

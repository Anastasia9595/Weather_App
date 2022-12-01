import React, { Fragment, useState } from "react";
import axios from "axios";
import cross from "./assets/cross.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const [error, setError] = useState(false);
  const [celsius, setCelsius] = useState(false);
  const [units, setUnits] = useState("metric");
  const [temp, setTemp] = useState(0.0);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=d727e50d61ad9921e0d23e3146ce3d37`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setTemp(res.data.main.temp);
          setData(res.data);
          console.log(res.data);
          // setLocation("");
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLocation("");
        });
    }
  };

  const switchToggle = () => {
    getTemp();
    setCelsius(!celsius);
    unitBuilder();
  };

  const unitBuilder = () => {
    if (celsius === false) {
      setUnits("metric");
    } else {
      setUnits("imperial");
    }
    console.log(units);
  };

  //get temp data
  const getTemp = () => {
    axios.get(url).then((res) => {
      setTemp(res.data.main.temp);
      console.log(temp);
    });
  };
  return (
    <div className="app">
      <div className="search">
        <input
          placeholder="Enter Location..."
          value={location}
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
        />
      </div>
      <label className="toggle">
        <input type="checkbox" className="toggleswitch" />
        <span
          className="slider"
          onClick={location !== "" ? switchToggle : () => {}}></span>
      </label>

      <div className="container">
        {error === false ? (
          <Fragment>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              {celsius === false ? (
                <div className="temp">
                  {data.main && <h1>{Math.round(temp)}°C</h1>}
                </div>
              ) : (
                <div className="temp">
                  {" "}
                  {data.main && <h1>{Math.round(temp)}°F</h1>}
                </div>
              )}

              <div className="description">
                {data.weather && <p>{data.weather[0].main}</p>}
              </div>
            </div>
            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main && (
                    <p className="bold">{Math.round(data.main.feels_like)}°C</p>
                  )}
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main && <p className="bold">{data.main.humidity}%</p>}
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  {data.wind && <p className="bold">{data.wind.speed}km/h</p>}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </Fragment>
        ) : (
          <div className="popup">
            <div className="image_container">
              <img src={cross} alt="cross logo" />
            </div>

            <h2 className="bold">This Location don't exist</h2>

            <button type="button" onClick={() => setError(false)}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

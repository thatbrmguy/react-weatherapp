import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./css/style.css";

const Tempapp = () => {

  let state = 1;
  let co = 1;
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const [wind, setWind] = useState("Mumbai");
  const [hour, setHour] = useState([])
  const [weather, setWeather] = useState("Mumbai");
  const [icon, setIcon] = useState("Mumbai");
  var arr = []
  const fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=95041857450f543f3a844ef3589a7f41`;
    const response = await fetch(url);
    const resJson = await response.json();
    var lati = resJson.coord.lat;
    var longi = resJson.coord.lon;
    const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${longi}&units=metric&appid=95041857450f543f3a844ef3589a7f41`
    const response2 = await fetch(url2);
    const resJson2 = await response2.json();
    console.log(resJson);
    setCity(resJson.main);
    setWind(resJson.wind);
    setHour(resJson2.hourly)
    setWeather(resJson.weather);
   //console.log('here',resJson2)
    setIcon(resJson.weather[0].icon);   
  }
  useEffect(() => {
   
    fetchApi();
  }, [search])
  function convert() {
    let element1 = document.getElementById('fah');
    let element2 = document.getElementById('cel');
    let element3 = document.getElementById('tempc');
    let element4 = document.getElementById('tempf');
    let element5 = document.getElementById('feels_likec');
    let element6 = document.getElementById('feels_likef');
    let element7 = document.getElementById('datac');
    let element8 = document.getElementById('dataf');

    if (state % 2 !== 0) {
      ReactDOM.findDOMNode(element1).style.display = 'block';
      ReactDOM.findDOMNode(element2).style.display = 'none';
      ReactDOM.findDOMNode(element3).style.display = 'none';
      ReactDOM.findDOMNode(element4).style.display = 'block';
      ReactDOM.findDOMNode(element5).style.display = 'none';
      ReactDOM.findDOMNode(element6).style.display = 'block';
      ReactDOM.findDOMNode(element7).style.display = 'none';
      ReactDOM.findDOMNode(element8).style.display = 'block';
    }
    else {
      ReactDOM.findDOMNode(element1).style.display = 'none';
      ReactDOM.findDOMNode(element2).style.display = 'block';
      ReactDOM.findDOMNode(element3).style.display = 'block';
      ReactDOM.findDOMNode(element4).style.display = 'none';
      ReactDOM.findDOMNode(element5).style.display = 'block';
      ReactDOM.findDOMNode(element6).style.display = 'none';
      ReactDOM.findDOMNode(element7).style.display = 'block';
      ReactDOM.findDOMNode(element8).style.display = 'none';
    }
    state++;
  }
  const icon1 = `https://openweathermap.org/img/wn/${icon}@2x.png`
  // console.log(city)
  const getData=()=>{
      for (const [i, j] of hour.entries()) {
        
    } 
  } 
 useEffect(() => {
   console.log(hour)
 },[hour])

  return (
    <div className='container'>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(event) => { setSearch(event.target.value) }} />
        </div>
        {!city ? (
          <p className="errorMsg">No Data Found</p>
        ) : (
          <div>
            <div className="info">
              <h2 className="location">
                <i className="fa-solid fa-street-view"></i>   {search}
              </h2>
              <h2 className="temp" id="tempc">
                {city.temp} °C
              </h2>
              <h2 className="temp" id="tempf">
                {(city.temp * 1.8 + 32).toFixed(2)} F
              </h2>
              {/* <h4 className="hourview">hourly</h4> */}
              {/* <h3>Latitude : {coord.lat}</h3>
                 <h3>Longitute : {coord.lon}</h3> */}
              {/* <h3>Longitute : {hour[0].temp}</h3> */}
              {/* <h1 className="tempdata"> {hour?.map((data) => (data.temp))} </h1> */}
              <h3 id="feels_likec">Feels Like : {city.feels_like} °C</h3>
              <h3 id="feels_likef">Feels Like : {(city.feels_like * 1.8 + 32).toFixed(2)} F</h3>
              <h3>Humidity : {city.humidity} %</h3>
              <h3>Wind Speed : {wind.speed} kmph</h3>
              {/* <h2>{icon}</h2> */} 
              <h3 className="tempmin_max" id='cel'> Min : {city.temp_min} °C | Max : {city.temp_max} °C</h3>
              <h3 className="tempmin_max" id='fah'> Min : {(city.temp_min * 1.8 + 32).toFixed(2)} F | Max : {(city.temp_max * 1.8 + 32).toFixed(2)} F</h3>
              <h1 className="showicon"><img src={icon1} />{weather[0].description}</h1>
              {/* <h2>Weather : {weather[0].description}</h2> */}
              <button id="btncnv" onClick={convert}>Convert</button>
            </div>
            {/* <div>
                  <img src="" />
                </div> */}
          </div>
        )}
      </div>
      <br></br>

      <div className="box1" id="datac">
        <div className=''>
          <h4 className="tempdata"> 
          <ul>
            {hour.map((item) => {
        return <div className='forecast' key={item.dt}>
        <p>Temp : {item.temp} °C <br></br>Feels Like : {city.feels_like} °C <br></br>Humidity : {item.humidity} % <br></br>Weather : {weather[0].description}</p>
      </div>
      })}
    </ul>
          </h4>
        </div>
      </div>


      <div className="box1" id="dataf">
        <div className=''>
          <h4 className="tempdata"> 
          <ul>
            {hour.map((item) => {
        return <div className='forecast' key={item.dt}>
        <p>Temp : {(item.temp * 1.8 + 32).toFixed(2)} F <br></br>Feels Like : {(city.feels_like * 1.8 + 32).toFixed(2)} F <br></br>Humidity : {item.humidity} % <br></br>Weather : {weather[0].description}</p>
      </div>
      })}
    </ul>
          </h4>
        </div>
      </div>




    </div>
  )
}
export default Tempapp;
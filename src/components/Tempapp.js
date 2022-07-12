import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import "./css/style.css";
const Tempapp = () => {

  let state=1;
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Mumbai");
    const [wind, setWind] = useState("Mumbai");
    const [weather, setWeather] = useState("Mumbai");
    useEffect( () => {
              const fetchApi = async () =>{
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=95041857450f543f3a844ef3589a7f41`;
                const response = await fetch(url);
                const resJson = await response.json();
                //console.log(resJson);
                setCity(resJson.main);
                setWind(resJson.wind);
                setWeather(resJson.weather);
              }
              fetchApi();
    },[search])
    function convert() {
      let element1=document.getElementById('fah');
      let element2=document.getElementById('cel');
      let element3=document.getElementById('tempc');
      let element4=document.getElementById('tempf');
      let element5=document.getElementById('feels_likec');
      let element6=document.getElementById('feels_likef');
      
      if(state%2!==0){
      ReactDOM.findDOMNode(element1).style.display='block';
      ReactDOM.findDOMNode(element2).style.display='none';
      ReactDOM.findDOMNode(element3).style.display='none';
      ReactDOM.findDOMNode(element4).style.display='block';
      ReactDOM.findDOMNode(element5).style.display='none';
      ReactDOM.findDOMNode(element6).style.display='block';
      }
      else{
        ReactDOM.findDOMNode(element1).style.display='none';
        ReactDOM.findDOMNode(element2).style.display='block';
        ReactDOM.findDOMNode(element3).style.display='block';
        ReactDOM.findDOMNode(element4).style.display='none';
        ReactDOM.findDOMNode(element5).style.display='block';
        ReactDOM.findDOMNode(element6).style.display='none';
        }
      state++;
    }
    return(
        <>
          <div className = "box">
               <div className="inputData">
                <input
                type="search"
                value={search}
                className="inputField"
                onChange={ (event) => {setSearch(event.target.value)}}/>
               </div>
               {!city ? ( 
                <p className="errorMsg">No Data Found</p>
               ) : (
            <div>
                <div className="info">
                 <h2 className="location">
                   <i className="fa-solid fa-street-view"></i>   {search}
                 </h2>
                 <h1 className="temp" id="tempc">
                   {city.temp} °C
                 </h1>
                 <h1 className="temp" id="tempf">
                   {(city.temp*1.8+32).toFixed(2)} F
                 </h1>
                 <h3 id="feels_likec">Feels Like : {city.feels_like} °C</h3>
                 <h3 id="feels_likef">Feels Like : {(city.feels_like*1.8+32).toFixed(2)} F</h3>
                 <h3>Humidity : {city.humidity} %</h3>
                 <h3>Wind Speed : {wind.speed} kmph</h3>
                 <h2>Weather : {weather[0].description}</h2>
                 <h3 className="tempmin_max" id='cel'> Min : {city.temp_min} °C | Max : {city.temp_max} °C</h3>     
                 <h4 className="tempmin_max" id='fah'> Min : {(city.temp_min*1.8+32).toFixed(2)} F | Max : {(city.temp_max*1.8+32).toFixed(2)} F</h4>            
                 <button id="btncnv" onClick={convert}>CONVERT</button>
                </div>
            </div>
               )}
          
        </div>
        </>
    )
}
export default Tempapp;
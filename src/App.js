import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data,setData]= useState({})
  const [location,setLocation]= useState('')
  
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=0ec4fae43a43ee84207d55ffc8d43550`
  
  const searchLocation = (event)=> {
    if (event.key ==='Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event =>setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='location'
        type="text" />
      </div>
      <div className="container">
        <div className='top'>
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ?<h1>{data.main.temp.toFixed()}F</h1>: null}
          </div>
          <div className="time">
            <div>
               <img 
                  id="wicon" 
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="weather icon">
               </img>
            </div>
          </div>
        </div>
        {data.name != undefined &&
        <div className='bottom'>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>: null}
            <p>Clouds</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}%</p>: null}
            <p>humidity</p>
          </div>
        <div className="wind">
          {data.main ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p>: null}
          <p>wind</p>
        </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;

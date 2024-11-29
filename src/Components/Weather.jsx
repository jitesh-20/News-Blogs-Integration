import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Weather.css'

const Weather = () => {
  const [data, setdata] = useState({})
  const [location, setlocation] = useState('')

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      const defaultLocation = 'New Delhi'
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${defaultLocation}?key=7Q523FU8JRQAD5KAGXJWAY3RK`
      const response = await axios.get(url)
      setdata(response.data)
    }
    fetchDefaultLocation()
  }, [])

  const search = async () => {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=7Q523FU8JRQAD5KAGXJWAY3RK`
    // try{
    //   const response = await axios.get(url)
    // }
    const response = await axios.get(url)
    setdata(response.data)
    setlocation('')
    // console.log(data);
  }

  const handleInputChange = (e) => {
    setlocation(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "clear-day":
        return <i className='bx bxs-sun'></i>
      case "cloudy":
        return <i className='bx bxs-cloud'></i>
      case "rain":
        return <i className='bx bxs-cloud-rain'></i>
      // case "Rain, Overcast":
      //   return <i className='bx bxs-cloud-lightning'></i>
      // case "Snow":
      //   return <i className='bx bxs-cloud-snow'></i>
      // case Haze:
      // case "Mist":
      //   return <i className='bx bxs-cloud'></i>
      default:
        return <i className='bx bxs-cloud'></i>
    }
  }

  return (
    <div className='weather'>
      <div className="search">
        <div className="search-top">
          <i className="fa-solid fa-location-dot"></i>
          <div className="location">{data.address}</div>
        </div>
        <div className="search-location">
          <input type='text' placeholder='Enter Location...' value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
        </div>
      </div>

      <div className="weather-data">
        {/* <i className='bx bxs-sun'></i> */}
        {data.days && data.days[0] && getWeatherIcon(data.days[0].icon)}
        <div className="weather-type">{data.days ? data.days[0].conditions : null}</div>
        {/* <div className="temp">{data.days[0].temp + "\u00B0F"}</div> */}
        <div className="temp">{data.days ? `${Math.floor(data.days[0].temp)}\u00B0F` : null}</div>
      </div>
    </div>
  )
}

export default Weather
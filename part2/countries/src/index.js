import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ country, setCountry ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ weather, setWeather ] = useState({temperature: '', weather_icons: [], wind_speed: '', wind_dir: ''})
  const KEY = process.env.REACT_APP_WEATHER_API_KEY

  const handleFilter = (event) => setFilter(event.target.value)
  const handleClick = (selected) => () => setFilter(selected)

  useEffect(() => {
    if(filter) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${filter}`)
        .then(response => setCountry(response.data))
        .catch(() => console.log(`Country by the name ${filter} not found`))
    }
  }, [filter])

  useEffect(() => {
    if(country.length===1) {
      handleWeather(country[0].capital)
    }
  }, [country])

  const handleWeather = (capital) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${KEY}&query=${capital}`)
      .then(response => setWeather(response.data.current))
  }

  return (
    <div>
      find countries:<input value={filter} onChange={handleFilter}/>
      <Countries countries={country} weather={weather} handleClick={handleClick}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
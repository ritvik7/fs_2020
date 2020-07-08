import React from 'react'

const Countries = ({countries, handleClick, weather}) => {
  if (countries.length>10) {
    return (
      <div>Too many matches please specify another filter</div>
    )
  } else if (countries.length>1) {
    return (
      <div>                                   
        {countries.map(country => {
          return (
          <div key={country.name}>
            <div>{country.name}</div>
            <button onClick={handleClick(country.name)}>show</button>
          </div>
          )
        })}
      </div>
    )
  } else if (countries.length===1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.captital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} alt='flag' width='100' height='100'/>
        <h3>weather</h3>
        <div><b>temperature:</b> {weather.temperature} Celcius</div>
        <img src={weather.weather_icons[0]} alt='weather icon'/>
        <div><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</div>
      </div>
    )
  } else {
    return (
      <div>Enter a country to search for...</div>
    )
  }
}

export default Countries
import { useState } from "react"
import { gql } from "@apollo/client"
import { client } from "../index"
import "./App.css"

function App() {
  const [zip, setZip] = useState("")
  const [unit, setUnit] = useState("metric")
  const [weather, setWeather] = useState(null)

  async function getWeather(specifiedUnit) {
    console.log("hello")
    console.log(unit)
    try {
      const json = await client.query({
        query: gql`
          query {
            getWeather(zip:${zip}, unit:${specifiedUnit || unit}) {
              name
              description
              temperature
              humidity
              cod
              message
          }
        }
        `,
      })
      setWeather(json.data.getWeather)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          getWeather()
        }}
      >
        <fieldset style={{ display: "flex", flexDirection: "column", maxWidth: "160px" }}>
          <legend>Weather</legend>

          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />

          <label htmlFor="unit" style={{ marginTop: "8px" }}>
            Unit
          </label>
          <select
            name="unit"
            id="unit"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value)
              if (weather) {
                setWeather(null)
                getWeather(e.target.value)
              }
            }}
          >
            <option value="metric">Celsius</option>
            <option value="imperial">Fahrenheit</option>
            <option value="standard">Kelvin</option>
          </select>

          <button type="submit" style={{ marginTop: "16px" }}>
            Submit
          </button>
        </fieldset>
      </form>

      {weather && weather.cod === 200 && (
        <>
          <h1>{weather.name}</h1>
          <h2>{weather.description}</h2>
          <ul>
            <li>
              Temperature: {weather.temperature}
              {unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "°K"}
            </li>
            <li>Humidity: {weather.humidity}</li>
          </ul>
        </>
      )}

      {weather && weather.cod === 404 && <h1>{weather.message}</h1>}
    </div>
  )
}

export default App

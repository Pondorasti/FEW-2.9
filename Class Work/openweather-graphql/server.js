const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const fetch = require("node-fetch")
require("dotenv").config()

const schema = buildSchema(`
enum Unit {
  standard
  metric
  imperial
}

type Coordinates {
  lon: Float!
  lat: Float!
}

type Weather {
  name: String
  coord: Coordinates

  temperature: Float
  description: String
  feelsLike: Float
  tempMin: Float
  tempMax: Float
  pressure: Float
  humidity: Float

  cod: Int!
  message: String
}

type Query {
  getWeather(zip: Int!, unit: Unit): Weather!
}
`)

const apiKey = process.env.OPENWEATHERMAP_API_KEY
const root = {
  getWeather: async ({ zip, unit = "metric" }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${unit}`
    const res = await fetch(url)
    const json = await res.json()

    if (json.cod !== 200) {
      return {
        cod: json.cod,
        message: json.message,
      }
    }

    return {
      name: json.name,
      coord: {
        lon: json.coord.lon,
        lat: json.coord.lat,
      },
      temperature: json.main.temp,
      description: json.weather[0].description,
      feelsLike: json.main.feels_like,
      tempMin: json.main.temp_min,
      tempMax: json.main.temp_max,
      pressure: json.main.pressure,
      humidity: json.main.humidity,
      cod: parseInt(json.cod),
      message: json.message,
    }
  },
}

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(4000, () => console.log("Now browse to http://localhost:4000/graphql"))

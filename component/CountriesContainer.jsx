import React, { useEffect, useState } from "react"
import CountryCard from "./CountryCard"
import CountriesShimmer from "./CountriesShimmer"
// import CountriesData from "../CountriesData"

export default function CountriesContainer({ query, filter, isDark }) {

  const [CountriesData, setCountriesData] = useState([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setCountriesData(data)
      })
  }, [])

  return (
    <>
      {
        CountriesData.length !==0 ? <div className={`countries-container ${isDark ? 'dark': ''}`}>
        {
          filter == "" ? CountriesData.filter((country) => country.name.common.toLowerCase().includes(query)).map((country) => {
            return (
              <>
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  capital={country.capital?.[0]}
                  image={country.flags.svg}
                  population={country.population}
                  region={country.region}
                  data = {country}
                />
              </>
            )
          }) : query == "" ? CountriesData.filter((country) => country.region.toLowerCase().includes(filter)).map((country) => {
            return (
              <>
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  capital={country.capital?.[0]}
                  image={country.flags.svg}
                  population={country.population}
                  region={country.region}
                  data = {country}
                />
              </>
            )
          }) : CountriesData.filter((country) => country.name.common.toLowerCase().includes(query)).map((country) => {
            return (
              <>
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  capital={country.capital?.[0]}
                  image={country.flags.svg}
                  population={country.population}
                  region={country.region}
                  data = {country}
                />
              </>
            )
          })

        }
      </div> : <CountriesShimmer isDark={isDark}/>
      }
    </>
  )
}

import { useContext, useEffect, useState } from "react";
import "../Country.css";
import { Link, useLocation, useOutletContext, useParams } from "react-router-dom";
import Error404Page from "./Error404Page";
import { ThemeContext } from "../context/ThemeContext";

export default function CountryDetails() {

    // const name = new URLSearchParams(location.search).get('name')
    const params = useParams()
    const countryName = params.country
    const { state } = useLocation()
    // const [isDark]  = useOutletContext()
    const [isDark] = useContext(ThemeContext)

    const [countryData, setCountryData] = useState([null])
    const [notFound, setNotFound] = useState(false)
    const [border, setBorder] = useState([])

    function updateCountriesData(data) {
        const currencies = Object.values(data.currencies).map((currency) => {
            return currency
        })
        const languages = Object.values(data.languages).map((language) => {
            return language
        }).join(', ')
        setCountryData({
            name: data.name.common,
            image: data.flags.svg,
            nativeName: Object.values(data.name.nativeName)[0].common,
            population: data.population,
            region: data.region,
            subregion: data.subregion,
            capital: data.capital,
            domain: data.tld[0],
            currencies: currencies[0].name,
            currenciesSymbole: currencies[0].symbol,
            languages: languages,
            // borders: []
            // borders: data[0].borders ? data[0].borders : null
        })
        if (!data.borders) {
            data.borders = []
            console.log('There is no borders of this contry')
        }
        else{
            Promise.all(data.borders.map((borderCountry) => {
                return fetch(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
                    .then((res) => res.json())
                    .then(([country]) => {
                        return country.name.common
                        // console.log(country.name.common);
                        // setBorder((prevState) => ([...prevState, country.name.common]))
                        // setCountryData((prevState)=> ({...prevState, borders: [...prevState, country.name.common]}))
                    })
            })).then((allBorders) => {
                setBorder((prevState) => ([...prevState, allBorders]))
            })
        }
    }

    useEffect(() => {
        setBorder([])
        
        if (state) {
            updateCountriesData(state.data)
            return
        }

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then((res) => res.json())
            .then(([data]) => {
                // console.log(data)
                updateCountriesData(data)
            }).catch((error) => {
                console.log(error)
                setNotFound(true)
            })
    }, [countryName])

    // console.log(border.length)

    if (notFound) {
        return <Error404Page />
    }

    return countryData ? (
        <main className={`h ${isDark? 'dark': ''}`}>
            <div className="country-details-container">
                <span className="back-button" onClick={() => history.back()}>
                    <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
                </span>
                <div className="country-details">
                    <img src={countryData.image} alt="" />
                    <div className="details-text-container">
                        <h1>{countryData.name}</h1>
                        <div className="details-text">
                            <p>
                                <b>Native Name: </b>
                                <span className="native-name">{countryData.nativeName}</span>
                            </p>
                            <p>
                                <b>Population: </b>
                                <span className="population">{countryData.population}</span>
                            </p>
                            <p>
                                <b>Region: </b>
                                <span className="region">{countryData.region}</span>
                            </p>
                            <p>
                                <b>Sub Region: </b>
                                <span className="sub-region">{countryData.subregion}</span>
                            </p>
                            <p>
                                <b>Capital: </b>
                                <span className="capital">{countryData.capital}</span>
                            </p>
                            <p>
                                <b>Top Level Domain: </b>
                                <span className="top-level-domain">{countryData.domain}</span>
                            </p>
                            <p>
                                <b>Currencies: </b>
                                <span className="currencies">{countryData.currencies} ({countryData.currenciesSymbole})</span>
                            </p>
                            <p>
                                <b>Languages: </b>
                                <span className="languages">{countryData.languages}</span>
                            </p>
                        </div>
                        {
                            border.length !== 0 ? <div className="border-countries">
                                <b>Border Countries: </b>&nbsp;
                                <br />
                                <div style={{
                                        display: 'flex',
                                        flexFlow: 'wrap',
                                        columnGap: '10px',
                                        rowGap: '10px'
                                    }}>
                                        {
                                            border.map((borderCountries) => borderCountries.map((e) => <Link to={`/${e}`}>{e}</Link>))
                                            // console.log(countryData[0].borders)
                                            // countryData.borders == null ? 'No Borders' : countryData[0].borders.map((borderCountries) => <Link to={`/${borderCountries}`}>{borderCountries}</Link>)

                                        }
                                    </div> 
                            </div> : ''
                        }
                    </div>
                </div>
            </div>
        </main>
    ) : (
        <div className="load">
            <div className="loader"></div>
        </div>
    );

}

import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({name,capital,image,population,region,data}) => {
  return (
    <Link className="country-card" to={`/${name}`} state={{data}}>
      <img src={image} alt={name + 'Flag'}/>
      <div className="card-text">
        <h3 className="card-title">{name}</h3>
        <p>
          <b>Population: </b>{population.toLocaleString('en-IN')}
        </p>
        <p>
          <b>Region: </b>{region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
  );
};
export default CountryCard;

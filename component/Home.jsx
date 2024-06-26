import { useContext, useState } from "react";
import Searchbar from "SearchBar";
import Filter from "./Filter";
import CountriesContainer from "./CountriesContainer";
import { useOutletContext } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useWindowSize } from "../hooks/useWindowSize";

export default function Home() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState('')
  // const [isDark]  = useOutletContext()
  const [isDark] = useContext(ThemeContext)
  const windowSize = useWindowSize()
  return (
    <>
      <main className={`${isDark? 'dark': ''}`}>
        {/* <h1 style={{textAlign: 'center'}}>{windowSize.width} X {windowSize.height}</h1> */}
        <div className="search-filter-container">
          <Searchbar setQuery={setQuery} />
          <Filter setFilter={setFilter} />
        </div>
      </main>
      <CountriesContainer query={query} filter={filter} isDark={isDark}/>
    </>
  );
}

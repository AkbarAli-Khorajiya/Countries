import React, { useState } from "react";
import Header from "./component/Header";
import "./App.css";
import Searchbar from "./component/SearchBar";
import Filter from "./component/Filter";
import CountriesContainer from "./component/CountriesContainer";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

export default function App() {
  const [isDark, setIsDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))

  return (
    <ThemeContext.Provider value={[isDark, setIsDark]}>
      <Header />
      <Outlet />
    </ThemeContext.Provider>
  );
}

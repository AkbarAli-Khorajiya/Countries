import React, { useState } from "react";
import Header from "./component/Header";
import "./App.css";
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

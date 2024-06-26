import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerHeight,
    height: window.innerWidth,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({
        width: window.innerHeight,
        height: window.innerWidth,
      });
    });
  }, []);

  return windowSize
}

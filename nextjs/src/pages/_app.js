// load polyfills
import "intersection-observer";

import ReactGA from "react-ga";
import { extendDefaultTheme, ThemeContext } from "granit/components";
import "../styles/globals.css";
import { useEffect } from "react";

const aktivGrotesk = "Aktiv Grotesk, aktiv-grotesk, sans-serif";
const theme = extendDefaultTheme({
  font: {
    family: aktivGrotesk,
    headingFamily: aktivGrotesk,
    button: {
      family: aktivGrotesk,
    },
    small: {
      family: aktivGrotesk,
      size: 16,
      letterSpacing: 0,
      lineHeight: 26,
    },
    medium: {
      family: aktivGrotesk,
      size: 18,
      letterSpacing: 0,
      lineHeight: 26,
    },
    large: {
      family: aktivGrotesk,
      size: 24,
      letterSpacing: 0,
      lineHeight: 32,
    },
    h1: {
      size: 74,
      weight: "500",
      letterSpacing: 0,
      lineHeight: 74,
    },
    h2: {
      size: 36,
      lineHeight: 42,
      weight: "500",
      letterSpacing: 0,
      md: {
        size: 50,
        lineHeight: 58,
      },
    },
    h3: {
      size: 34,
      weight: "500",
      letterSpacing: 0,
      lineHeight: 34 * 1.2,
      marginTop: 3.4,
      marginBottom: 3.4 * 0.25,
    },
    h4: {
      size: 20,
      weight: "500",
      letterSpacing: 0,
      lineHeight: 20 * 1.2,
    },
  },
  color: {
    primary: "#8DA895",
    primaryDark: "#789A82",
    secondary: "#273B2E",
    secondaryContrast: "white",
  },
  component: {
    button: {
      font: {
        size: 18,
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  const gaId = pageProps.env?.GRANIT_GA_ID;

  if (!gaId) {
    console.warn("No Google Analytics ID provided.");
  }

  useEffect(() => {
    if (gaId) {
      ReactGA.initialize(gaId, {
        debug: process.env.NODE_ENV !== "production",
      });
    }
  }, [gaId]);

  useEffect(() => {
    if (gaId) {
      ReactGA.pageview(
        window.location.pathname + window.location.search + window.location.hash
      );
    }
  }, [gaId, pageProps.page?.id]);

  return (
    <ThemeContext.Provider value={theme}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

export default MyApp;

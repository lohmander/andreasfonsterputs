// load polyfills
import "intersection-observer";

import Head from "next/head";
import ReactGA from "react-ga";
import { extendDefaultTheme, ThemeContext } from "granit/components";
import "../styles/globals.css";
import { useEffect } from "react";

const mainFont = "'Inter', sans-serif";
const theme = extendDefaultTheme({
  font: {
    family: mainFont,
    headingFamily: mainFont,
    button: {
      family: mainFont,
    },
    small: {
      family: mainFont,
      size: 14,
      letterSpacing: 0,
      lineHeight: 22,
    },
    medium: {
      family: mainFont,
      size: 16,
      letterSpacing: 0,
      lineHeight: 24,
    },
    large: {
      family: mainFont,
      size: 24,
      letterSpacing: 0,
      lineHeight: 32,
    },
    h1: {
      family: mainFont,
      size: 68,
      weight: "500",
      letterSpacing: 0,
      lineHeight: 74,
    },
    h2: {
      family: mainFont,
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
      family: mainFont,
      size: 34,
      weight: "500",
      letterSpacing: 0,
      lineHeight: 34 * 1.2,
      marginTop: 3.4,
      marginBottom: 3.4 * 0.25,
    },
    h4: {
      family: mainFont,
      size: 20,
      weight: "500",
      letterSpacing: 0,
      lineHeight: 20 * 1.2,
    },
  },
  color: {
    primary: "#B4A278",
    primaryContrast: "black",
    primaryDark: "#968A6F",
    secondary: "#EFEBE4",
    secondaryContrast: "#222",
  },
  component: {
    button: {
      cornerRadius: 0.2,
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
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeContext.Provider value={theme}>
        <Component {...pageProps} />
      </ThemeContext.Provider>
    </>
  );
}

export default MyApp;

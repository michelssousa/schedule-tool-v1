import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { AppProps } from "next/app";

import { ScheduleProvider } from "~/core";

const globalStyles = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ,
  :root {
    font-size: (62.5/100) * 16;
  }
  ,
  html,
  body {
    background: #e6e6fa;
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  ,
  html {
    /* scroll-behavior: smooth; */
  }
  ,
  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScheduleProvider>
      <ChakraProvider resetCSS>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ScheduleProvider>
  );
}

export default MyApp;

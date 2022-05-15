import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { AppProps } from "next/app";

import { ScheduleProvider } from "~/core";
import theme from "~/styles/theme";

const globalStyles = css`
  * {
    font-size: 62.5%;
  }
  ,
  html {
    scroll-behavior: smooth;
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
      <ChakraProvider resetCSS theme={theme}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ScheduleProvider>
  );
}

export default MyApp;

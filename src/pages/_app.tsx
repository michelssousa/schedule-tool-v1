import theme from "~/styles/theme";

import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { ScheduleProvider } from "~/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScheduleProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ScheduleProvider>
  );
}

export default MyApp;

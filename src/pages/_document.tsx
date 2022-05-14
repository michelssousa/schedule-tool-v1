import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={"light"} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

export const themeGlobal = {
  colorScheme: "facebook",
  padding: "0.3rem",
};

// const fonts = {
//   body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
// };
//
// const breakpoints = createBreakpoints({
//   sm: "40em",
//   md: "52em",
//   lg: "64em",
//   xl: "80em",
// });
//
// const fontWeights = {
//   normal: 400,
//   medium: 600,
//   bold: 700,
//   xBold: 900,
// };

export const colors = {
  primary: "#3b5998",
  noActive: "#E6E6FA",
  black: "#16161D",
  body: "#fff",
};

// const theme = extendTheme({
//   initialColorMode: "light",
//   colors,
//   fonts,
//   breakpoints,
//   fontWeights,
// });

const theme = extendTheme({});

export default theme;

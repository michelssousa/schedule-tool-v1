import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
  xBold: 900,
};

const theme = extendTheme({
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
  fontWeights,
});

export default theme;

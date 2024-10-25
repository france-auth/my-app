// theme.ts or theme.js
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "390px",  // Custom Small size (e.g., 480px)
  md: "768px",  // Custom Medium size (e.g., 768px)
  lg: "992px",  // Custom Large size (e.g., 992px)
  xl: "1280px",  // Custom Extra Large size (e.g., 1280px)
  "2xl": "1536px" // Custom Double Extra Large (e.g., 1536px)
};

const theme = extendTheme({
  breakpoints,
});

export default theme;

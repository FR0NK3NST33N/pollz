import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }
  interface PaletteOptions {
    custom: PaletteOptions["primary"];
  }
  interface PaletteColor {
    background?: string;
    backgroundAlt?: string;
    text?: string;
  }
  interface SimplePaletteColorOptions {
    background?: string;
    backgroundAlt?: string;
    text?: string;
  }
}

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(52, 178, 123)",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#edf2ff",
    },
    custom: {
      main: "#FFF",
      background: "#000",
      backgroundAlt: "rgb(33, 33, 33)",
      text: "#FFF",
    },
  },
});

export const lightTheme = createTheme(darkTheme, {
  palette: {
    primary: {
      main: "rgb(52, 178, 123)",
      contrastText: "#333",
    },
    secondary: {
      main: "#edf2ff",
    },
    custom: {
      main: "#333",
      background: "#FFF",
      backgroundAlt: "#FFF",
      text: "#333",
    },
  },
});

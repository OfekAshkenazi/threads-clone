import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/theme-utils";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")(props),
      fontFamily: `'Raleway', sans-serif`,
    },
    heading: `'Open Sans', sans-serif`,
  }),
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e",
  },
}

const mytheme = extendTheme({ config, styles, colors, fonts: {
  heading: "Open Sans,sans-serif",
  body: "Raleway,sans-serif",
} })

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={mytheme}>
          <ColorModeScript initialColorMode={mytheme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)
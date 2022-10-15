import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../styles";
import { GlobalStyles } from "@mui/material";
interface AuthAppProps extends AppProps {
  pageProps: AppProps["pageProps"] & {
    session: Session;
  };
}

function MyApp({ Component, pageProps }: AuthAppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: darkTheme.palette.custom.background,
            color: darkTheme.palette.custom.text,
          },
        }}
      />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;

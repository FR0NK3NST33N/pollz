import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface AuthAppProps extends AppProps {
  pageProps: AppProps["pageProps"] & {
    session: Session;
  };
}

function MyApp({ Component, pageProps }: AuthAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

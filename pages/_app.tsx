import React, { FunctionComponent } from "react";
import { AppProps } from "next/app";
import Head from "next/head";

const MyApp: FunctionComponent<AppProps> = ({ Component: Page, pageProps }) => {
  return (
    <>
      <Head>
        <title>SWAPI</title>
      </Head>
      <Page {...pageProps} />
      <style jsx global>{`
        body,
        html {
          font-family: monospace;
          background: #343434;
          font-size: 16px;
          color: #f6d743;
        }
      `}</style>
    </>
  );
};

export default MyApp;

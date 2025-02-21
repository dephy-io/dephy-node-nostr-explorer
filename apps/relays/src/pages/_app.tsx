import { type ReactElement, type ReactNode, useState } from "react";
import type { NextPage } from "next";
import type { AppProps, AppType } from "next/app";
import Head from "next/head";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Layout from "../components/layout";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [client] = useState(new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>DePHY Node Nostr Explorer</title>
        <link rel="icon" href="/fav.svg"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <QueryClientProvider client={client}>
          <div className="font-sans">
            {getLayout(<Component {...pageProps} />)}
          </div>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
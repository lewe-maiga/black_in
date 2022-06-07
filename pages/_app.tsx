import type {AppProps} from "next/app";
import Layout from "@components/layout";
import config from "../config.json";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
        <Layout title={config.title} description={config.description}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

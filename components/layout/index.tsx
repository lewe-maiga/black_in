import Head from "next/head";
import {ReactChild, ReactChildren} from "react";
import globalStyles from "@styles/globals";

type LayoutProps = {
    children: ReactChild | ReactChildren;
    title: string;
    description: string;
};

const Layout = ({title, description, children}: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta name="description" content={description} />
                <meta name="robots" content="noindex,nofollow" />
                <link
                    rel="shortcut icon"
                    href="/icon.ico"
                    type="image/x-icon"
                />
            </Head>

            <div className="content">{children}</div>
            <style jsx>
                {`
                    .content {
                        flex: 1 0 auto;
                        height: 100%;
                    }
                `}
            </style>
            <style jsx global>
                {globalStyles}
            </style>
        </>
    );
};

export default Layout;

import Head from "next/head";
import { ReactChild, ReactChildren } from "react";
import globalStyles from "@styles/globals";
import { useRouter } from "next/router";

type LayoutProps = {
	children: ReactChild | ReactChildren;
	title: string;
	description: string;
};

const Layout = ({ title, description, children }: LayoutProps) => {
	const router = useRouter();
	console.log(router);

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="canonical" href={`https://black-in.vercel.app${router.asPath}`} />
				<link rel="shortcut icon" href="/icon.ico" type="image/x-icon" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content="https://black-in.vercel.app/" />
				<meta property="og:type" content="website" />
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

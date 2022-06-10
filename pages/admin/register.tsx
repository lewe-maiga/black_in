import { Login } from "components/admin/login";
import { ReactElement, useEffect } from "react";
import { useToken } from "@lib/hooks";
import { fetcher } from "@lib/utils";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Spinner } from "@components/spinner";
import Head from "next/head";

const Register = () => {
	const router = useRouter();
	const { token, saveToken, _id } = useToken();
	const { data, error } = useSWR("/api/admin/count", fetcher, {});

	useEffect(() => {
		if (token && _id) router.push(`/admin/dashboard`);
	}, [token, router, _id]);
	if (!data)
		return (
			<div>
				<Spinner />
			</div>
		);
	if (error) return error;
	return (
		<>
			<div className="container">
				<Login setToken={saveToken} router={router} />
			</div>

			<style jsx>
				{`
					div.container {
						display: flex;
						width: 100vw;
						height: 100vh;
						justify-content: center;
						align-items: center;
						padding: 40px;
					}
				`}
			</style>
		</>
	);
};

Register.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<Head>
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			{page}
		</>
	);
};

export default Register;

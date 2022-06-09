import { MainLayout } from "@components/layout/main-layout";
import { ReactElement } from "react";

const AboutMe = () => {
	return (
		<>
			<div></div>

			<style jsx>{``}</style>
		</>
	);
};

AboutMe.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<MainLayout>{page}</MainLayout>
		</>
	);
};

export default AboutMe;

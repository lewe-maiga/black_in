import { CardsProps } from "@components/card/cards";
import { SkeleTon } from "@components/card/skeleton";
import { MainLayout } from "@components/layout/main-layout";
import dynamic from "next/dynamic";
import { ReactElement } from "react";

const Cards = dynamic<CardsProps>(() => import("@components/card/cards").then((mod) => mod.Cards), {
	ssr: false,
	loading: () => <SkeleTon howMuch={8} />,
});

const Catalogue = () => {
	return (
		<>
			<div className="square-bg"></div>
			<div className="filter"></div>
			<Cards />
			<style jsx>{`
				.square-bg {
					width: 100%;
					max-width: 700px;
					height: 550px;
					background: #f5f5f5;
					position: absolute;
					z-index: -1;
					top: 0;
					right: 0;
				}
			`}</style>
		</>
	);
};

Catalogue.getLayout = function getLayout(page: ReactElement) {
	return (
		<>
			<MainLayout>{page}</MainLayout>
		</>
	);
};
export default Catalogue;

import { Header } from "@components/layout/header";
import { Container } from "@components/container/container";
import { Footer } from "@components/layout/footer";
import { AudioProvider } from "@components/audio/provider";
import { ReactElement } from "react";

type MainLayoutProps = {
	children: ReactElement;
	footer?: boolean;
};

export const MainLayout = ({ children, footer = false }: MainLayoutProps) => {
	return (
		<>
			<Header />
			<AudioProvider>
				<Container>
					<>{children}</>
				</Container>
			</AudioProvider>
			{footer && <Footer />}
		</>
	);
};

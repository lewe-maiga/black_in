import {AudioProvider} from "@components/audio/provider";
import {Cards} from "@components/card/cards";
import {Container} from "@components/container/container";
import {Header} from "@components/layout/header";
import {ReactElement} from "react";

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
            <Header />
            <AudioProvider>
                <Container>
                    <>{page}</>
                </Container>
            </AudioProvider>
        </>
    );
};
export default Catalogue;

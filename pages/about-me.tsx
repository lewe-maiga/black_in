import {AudioProvider} from "@components/audio/provider";
import {Container} from "@components/container/container";
import {Header} from "@components/layout/header";
import {ReactElement} from "react";



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
            <Header />
            <AudioProvider>
                <Container>
                    <>{page}</>
                </Container>
            </AudioProvider>
        </>
    );
};

export default AboutMe;

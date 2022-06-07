import type {GetStaticProps} from "next";
import {getFileLink, parser} from "@lib/utils";
import DescriptionModel, {Description} from "@database/models/description";
import type {Beats} from "@database/models/beats";
import {Cards} from "@components/card/cards";
import {ReactElement} from "react";
import {Container} from "@components/container/container";
import {Button} from "@components/admin/button";
import theme from "@styles/themes";
import {Slider} from "@components/slider";
import {Header} from "@components/layout/header";
import Image from "next/image";
import {Artists} from "@components/artists/artists";
import {Footer} from "@components/layout/footer";
import {AudioProvider} from "@components/audio/provider";
import ArtistModel,{ Artists as Artist } from "@database/models/artists";
import { dbConnect } from "@database/mongodb";
import BeatsModel from "@database/models/beats"
type HomeProps = {
    description: Description;
    beats: Beats[];
    artists: Artist[]
};



const Home = ({description, beats, artists}: HomeProps) => {
    return (
        <>
            <section className="description main">
                <Slider beats={beats} />
                <div className="content">
                    <h2 className="heading_main">{description.heading_main}</h2>
                    <p className="content_main">{description.content_main}</p>
                    <div className="btn-container">
                        <span className="btn">
                            <Button width={180} text="Contactez Moi" />
                        </span>
                        <span className="btn">
                            <Button
                                type="button"
                                width={180}
                                border={`1px solid ${theme.colors.border}`}
                                backgroundColor="transparent"
                                color={theme.colors.text}
                                text="Voir plus"
                            />
                        </span>
                    </div>
                </div>
            </section>
            <section className="card new">
                <Cards type="new" text="Nouveautés" />
            </section>

            <div className="container">
                <section className="card best">
                    <Cards
                        start={0}
                        end={4}
                        type="best"
                        text="Les plus ecoutés"
                    />
                </section>
                <section className="description secondary">
                    <div className="content">
                        <h2 className="heading_secondary">
                            {description.heading_secondary}
                        </h2>
                        <p className="content_secondary">
                            {description.content_secondary}
                        </p>
                        <div className="btn-container">
                            <span className="btn">
                                <Button width={180} text="Contactez Moi" />
                            </span>
                            <span className="btn">
                                <Button
                                    type="button"
                                    width={180}
                                    border={`1px solid ${theme.colors.border}`}
                                    backgroundColor="transparent"
                                    color={theme.colors.text}
                                    text="Voir plus"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="container-image">
                        <div className="wrapper">
                            <div className="image main">
                                <span>
                                    <Image
                                        src={getFileLink(artists[Math.floor(Math.random() *  artists.length)].image.key)}
                                        alt=""
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </span>
                            </div>
                            <div className="image top">
                                <span>
                                    <Image
                                        src={getFileLink(artists[Math.floor(Math.random() *  artists.length)].image.key)}
                                        alt=""
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </span>
                            </div>
                            <div className="image bottom">
                                <span>
                                    <Image
                                        src={getFileLink(artists[Math.floor(Math.random() *  artists.length)].image.key)}
                                        alt=""
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="card soon">
                    <Cards start={0} end={4} type="soon" text="Bientôt" />
                </section>
            </div>
            <section className="artists">
                <Artists artists={artists} />
            </section>
            <style jsx>
                {`
                    .artists {
                        display: flex;
                        flex-direction: column;
                        margin-top: 20px;
                    }
                    
                    .container {
                        --background: #f5f5f5;
                        position: relative;
                        display: flex;

                        margin-top: 25px;
                        padding: 20px 0;
                        width: 100%;
                        flex-direction: column;
                    }
                    .container::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        width: 99vw;
                        left: -30px;
                        z-index: -1;
                        height: 100%;
                        background: var(--background);
                    }
                    .description.secondary {
                        display: grid;
                        grid-template-rows: auto minmax(300px, 1fr);
                        grid-gap: 30px;
                    }
                    .content-secondary {
                        display: flex;

                        flex-direction: column;
                    }

                    .container-image {
                        display: flex;
                        justify-content: center;
                    }
                    .container-image .wrapper {
                        height: 300px;
                        position: relative;
                        width: 100%;
                        max-width: 275px;
                    }
                    .wrapper::before,
                    .wrapper::after {
                        content: "";
                        position: absolute;
                        background: var(--primary);
                        border-radius: 50%;
                    }
                    .wrapper::before {
                        width: 10px;
                        height: 10px;
                    }
                    .wrapper::after {
                        bottom: 0;
                        right: 0;
                        transform: translate(40%, 70%);
                        width: 20px;
                        height: 20px;
                    }
                    .container-image .image {
                        position: absolute;
                    }
                    .container-image .image span {
                        display: block;
                        position: relative;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        overflow: hidden;
                    }
                    .container-image .image.main {
                        width: 250px;
                        height: 250px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }

                    
                    .container-image .image.top {
                        top: 5%;
                        width: 70px;
                        height: 70px;
                        right: 0%;

                    }
                    .container-image .image.bottom {
                        width: 50px;
                        height: 50px;
                        bottom: 5%;
                        right: 5%;

                    }

                    .container .card {
                        margin: 30px 0 20px;
                    }
                    .container .description {
                        margin-top: 2px;
                    }
                    .description.main {
                        display: grid;
                        grid-template-columns: 1fr;
                        grid-template-rows: 1.7fr 1fr;
                        grid-gap: 10px;
                        max-width: var(--max-grid-width);
                        justify-content: center;
                        padding-bottom: 30px;
                        min-height: 285px;
                        flex: 1;
                        border-bottom: 1px dashed ${theme.colors.border};
                    }
                    .card {
                        display: flex;
                        justify-content: center;
                    }

                    .heading_main,
                    .heading_secondary {
                        font-size: 22px;
                        font-weight: bold;
                    }
                    .content_main,
                    .content_secondary {
                        max-height: 150px;
                        width: 100%;
                        margin: 10px 0;
                        font-size: 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    span.btn {
                        display: flex;
                    }
                    div.btn-container {
                        width: 100%;
                        display: flex;
                    }
                    .btn-container .btn:nth-child(1) {
                        margin-right: 15px;
                    }
                    .content {
                        flex: 1;
                        justify-content: center;
                        align-items: start;
                        display: flex;
                        flex-direction: column;
                    }
                    @media only screen and (min-width: 375px) {
                        .description.main {
                            grid-template-rows: 1fr 1fr;
                            grid-gap: 10px;
                        }
                        .container-image {
                            padding-right: 15px;
                        }
                    }

                    @media only screen and (min-width: 700px) {
                        .description.main {
                            grid-template-rows: none;
                            grid-template-columns: 1fr 1fr;
                            margin: 0 auto 15px;
                        }
                        .description.secondary {
                            display: grid;
                            grid-template-rows: none;
                            grid-template-columns: 1fr 1fr;
                            padding-right: 40px;
                        }
                        .container-image {
                            justify-content: end;
                        }
                        .container::before {
                            top: 0;
                            width: 100%;
                            left: -30px;
                            z-index: -1;
                            height: 100%;
                            background: var(--background);
                        }
                    }
                `}
            </style>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    await dbConnect();
    const beats = await BeatsModel.find({published: {$eq: true}})
                        .limit(3)
                        
                    
    const description = await DescriptionModel.find()
    const artists = await ArtistModel.find()
    
    return {
        props: {description: parser(description[0]), beats: parser(beats), artists: parser(artists)},
        revalidate: 1,
    };
};

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <Header />
            <AudioProvider>
                <Container>
                    <>{page}</>
                </Container>
            </AudioProvider>

            <Footer />
        </>
    );
};

export default Home;

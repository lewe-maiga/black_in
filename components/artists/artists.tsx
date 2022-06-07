import { Spinner } from "@components/spinner";
import { ViewMore } from "@components/view-more/view-more";
import { Artists as Artist } from "@database/models/artists";
import { fetcher, getFileLink } from "@lib/utils";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";


type Opts = {
    start: number;
    end: number;
};

const dataSlice = (data: Array<Artist>, opts: Opts) =>
    data.slice(opts.start, opts.end);


type ArtistsProps = {
    artists: Artist[],
    start?: number;
    end?: number;
};

export const Artists = ({artists, start = 0, end = 4}: ArtistsProps) => {
    const [opts, setOpts] = useState({start, end});

    const handleForward = () => {
        if (end >= data.artists.length) {
            return;
        }
        return setOpts({start: start + end, end: end * 2});
    };
    const handleBackward = () => {
        if (start <= 0) {
            return setOpts({start, end});
        }
        return setOpts({start: end - start, end: end / 2});
    };
    const {data, error} = useSWR("/api/artists", fetcher, {fallbackData: {artists}})
    if(error) return error
    if(!data) return <Spinner />
    return (
        <>
        <div className="info-card">
                    <span>
                        <h2>Artistes</h2>
                    </span>
                <ViewMore backward={handleBackward} forward={handleForward} />

                </div>
            <div className="grid">
            
               {dataSlice(data.artists, opts).map((artist: Artist) =>(
                    <div className="items" key={artist._id}>
                    <span className="body">
                        <div className="image">
                            <span>
                                <Image
                                    src={getFileLink(artist.image.key)}
                                    alt=""
                                    objectFit="cover"
                                    layout="fill"
                                />
                            </span>
                        </div>
                        <span className="info">
                            <h3 className="name">{artist.pseudo}</h3>
                        </span>
                    </span>
                </div>
               ))}
            </div>
            <style jsx>{`

                .info-card {
                        display: flex;
                        justify-content: space-between;
                    }
                .info-card span {
                        font-size: clamp(0.6rem, calc(1vw + 0.3rem), 0.8rem);
                        line-height: 3;
                    }
                    
                .grid {
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fill,
                        minmax(235px, 1fr)
                    );
                    grid-gap: 40px;
                }
                .grid .items {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                }
                .grid .items .body {
                    height: 295px;
                    background: var(--ternary);
                    max-width: 235px;
                    width: 100%;
                    border-radius: 20px;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                }
                .body .image {
                    display: flex;
                    width: 100%;
                    justify-content: center;
                }
                .body .image span {
                    position: relative;
                    overflow: hidden;
                    border-radius: 50%;
                    width: 200px;
                    height: 200px;
                    margin: 10px 0 15px;
                }
                .body .name {
                    font-weight: 600;
                    font-size: 0.9rem;
                    line-height: 3;
                    text-align: center;
                    color: #fff;
                }
                @media only screen and (min-width: 1400px) {
                    .grid {
                        grid-template-columns: repeat(4, minmax(235px, 1fr));
                        grid-gap: 40px;
                        margin-top: 20px;
                    }
                }
            `}</style>
        </>
    );
};

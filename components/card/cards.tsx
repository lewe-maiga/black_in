import {ViewMore} from "@components/view-more/view-more";
import {fetcher} from "@lib/utils";
import {useState} from "react";
import useSWR from "swr";
import type {Beats} from "@database/models/beats";
import {Card} from "./card";
import { SkeleTon } from "./skeleton";

type Opts = {
    start: number;
    end: number;
};

const dataSlice = (data: Array<Beats>, opts: Opts) =>
    data.slice(opts.start, opts.end);

export type CardsProps = {
    start?: number;
    type?: string;
    end?: number;
    text?: string
    endpoint?: string;
};

export const Cards = ({
    start = 0,
    end = 8,
    type = "",
    text = "",
    endpoint = "/api/beats",
}: CardsProps) => {
    const [opts, setOpts] = useState({start, end});
    const {data, error} = useSWR(`${endpoint}?${type}`, fetcher);

    const handleForward = () => {
        if (end >= data.beats.length) {
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

    if (error) return error;

    return (
        <div className="card-container">
            <div className="info-card">
                <span>
                    <h2>{text}</h2>
                </span>
                <ViewMore backward={handleBackward} forward={handleForward} />
            </div>
                {!data
                    ? <SkeleTon howMuch={opts.end} />
                    : <>
                        <ul className="card-grid">
                            {dataSlice(data.beats, opts).map((beat) => (
                          <Card beat={beat} key={beat._id} />
                            ))}
                        </ul>
                    </>
                }
            <style jsx>
                {`
                    .card-container {
                        display: flex;
                        justify-content: center;
                        max-width: var(--max-grid-width);
                        flex-direction: column;
                        width: 100%;
                    }
                    .card-container .info-card span {
                        display: flex;
                    }
                    .card-container .info-card h2 {
                        font-size: clamp(0.9rem, calc(1vw + 0.3rem), 1rem);
                        line-height: 3;
                    }

                    .info-card {
                        display: flex;
                        justify-content: space-between;
                    }
                    .card-grid {
                        display: grid;
                        grid-template-columns: repeat(
                            auto-fill,
                            minmax(250px, 1fr)
                        );
                        grid-gap: 20px;
                        margin-top: 30px;
                        width: 100%;
                        max-width: 1440px;
                        overflow: hidden;
                    }

                    @media only screen and (min-width: 1400px) {
                        .card-grid {
                            grid-template-columns: repeat(
                                4,
                                minmax(250px, 1fr)
                            );
                        }
                    }
                `}
            </style>
        </div>
    );
};

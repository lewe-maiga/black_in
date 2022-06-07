import {Beats} from "@database/models/beats";
import {getFileLink} from "@lib/utils";
import Image from "next/image";
import {useState} from "react";
import {Bar} from "./bar";
import {Control} from "./control";
import {useAudio} from "./hooks";

type PlayerProps = {track: Beats};

export const Player = ({track}: PlayerProps) => {
    //music attribut
    const {
        title,
        image,
        genre,
        created_at,
    } = track;

    const {
        progress,
        currentTime,
        pause,
        play,
        onCurrentTimeChange,
        isPlaying,
        duration,
    } = useAudio(track);
    const [checked, setChecked] = useState(true);

    return (
        <>
            <input
                type="checkbox"
                name="show-player"
                id="show-player"
                className="show-player"
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
            />
            <div className="wrapper">
                <label htmlFor="show-player">
                    <svg viewBox="0 0 24 24" className="icon">
                        <path
                            fill="currentColor"
                            d="M12.707 17.293L8.414 13H18v-2H8.414l4.293-4.293l-1.414-1.414L4.586 12l6.707 6.707z"></path>
                    </svg>
                </label>

                <div className="player">
                    <div className="image">
                        <Image
                            src={getFileLink(image.key)}
                            layout="fill"
                            alt={`${title} en cours de lecture`}
                            objectFit="cover"
                        />
                    </div>
                    <div className="info">
                        <h3 className="title">{title}</h3>
                        <span className="date">
                            {genre},{" "}
                            {new Date(created_at).toLocaleDateString("fr")}
                        </span>
                    </div>
                    <div className="controls">
                        <Control
                            isPlaying={isPlaying}
                            play={play}
                            pause={pause}
                        />
                        <Bar
                            progress={progress}
                            duration={duration}
                            onChange={(e) =>
                                onCurrentTimeChange(Number(e.target.value))
                            }
                            currentTime={currentTime}
                            onMouseUp={play}
                            onTouchEnd={play}
                        />
                    </div>
                </div>
            </div>

            <label htmlFor="show-player" className="icon-for-viewing-player">
                <div className="columns">
                    <div className="column">
                        <div className="row" />
                    </div>
                    <div className="column">
                        <div className="row" />
                    </div>
                    <div className="column">
                        <div className="row" />
                    </div>
                </div>
            </label>

            <style jsx>{`
                .icon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 3rem;
                    height: 3rem;
                    color: var(--ternary);
                }
                .show-player {
                    display: none;
                    visibility: hidden;
                }

                .wrapper {
                    display: flex;
                    position: fixed;
                    top: 0;
                    left: -100%;
                    z-index: 1000;
                    width: 100%;
                    height: 100vh;
                    background: #fff;
                    transition: left 0.4s ease-out;
                }
                .player {
                    display: flex;
                    position: absolute;
                    top: 45%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    flex-direction: column;
                    width: 100%;
                }
                .image {
                    display: flex;
                    align-self: center;
                    position: relative;
                    width: 200px;
                    height: 200px;
                    overflow: hidden;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }
                .info {
                    display: flex;
                    padding: 10px 10px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 10px;
                }
                .info .title {
                    font-size: 12px;
                }

                .info .date {
                    color: var(--ternary);
                    font-size: 10px;
                }

                input[type="checkbox"]:checked + .wrapper {
                    left: 0;
                }
                input[type="checkbox"]:checked ~ .icon-for-viewing-player {
                    display: none;
                    visibility: hidden;
                }
                :not(input[type="checkbox"]:checked)
                    ~ .icon-for-viewing-player {
                    position: fixed;
                    right: 0;
                    bottom: 10px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: var(--primary);
                    z-index: 5000;
                    transform: translate(-30%, -50%);
                    overflow: hidden;
                }

                .columns {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    align-content: center;
                    padding: 14px 0;
                }

                .columns .column {
                    height: 100%;
                    width: 6px;
                    position: relative;
                    overflow: hidden;
                }
                .columns .column:nth-child(2) {
                    margin: 0 2px;
                }

                .columns .column .row {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 2px;
                    background: #fff;
                }
                .columns .column:nth-child(1) .row {
                    height: 80%;
                    animation-delay: 2.5s;
                }
                .columns .column:nth-child(3) .row {
                    height: 60%;
                    animation-delay: 3.5s;
                }

                @media screen and (min-width: 700px) {
                    .wrapper {
                        display: flex;
                        position: relative;
                        top: 0;
                        left: 0;
                        z-index: 0;
                        width: 100%;
                        height: auto;
                        background: transparent;
                        transition: left 0.4s ease-out;
                    }
                    .show-player {
                        display: none;
                        visibility: none;
                    }
                    .player {
                        display: flex;
                        position: relative;
                        flex-direction: row;
                        height: auto;
                        background: transparent;
                    }
                    .controls {
                        display: flex;
                        flex: 1;
                    }
                    .image {
                        display: block;
                        position: relative;
                        width: 100px;
                        height: 100px;
                    }
                    .info {
                        display: flex;
                        padding: 10px 10px;
                        align-items: start;
                    }
                    .info .title {
                        font-size: 12px;
                    }

                    .info .date {
                        color: var(--ternary);
                        font-size: 10px;
                    }
                }

                @keyframes rofa {
                    0% {
                        height: 20%;
                        transform: translateY(0);
                    }
                    15% {
                        height: 50%;
                        transform: translateY(15px);
                    }
                    30% {
                        height: 100%;
                        transform: translateY(0);
                    }
                    45% {
                        height: 45%;
                        transform: translateY(0);
                    }
                    60% {
                        height: 100%;
                        transform: translateY(0);
                    }
                    75% {
                        height: 50%;
                        transform: translateY(0);
                    }
                    90% {
                        height: 10%;
                        transform: translateY(0);
                    }
                    100% {
                        height: 30%;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <style jsx>
                {`
                    .columns .column .row {
                        ${!isPlaying &&
                        "animation: rofa 3s infinite ease-in-out"};
                    }
                `}
            </style>
            <style jsx global>
                {`
                    body {
                        overflow: ${checked ? "hidden" : "visible"};
                    }
                    @media screen and (min-width: 700px) {
                        body {
                            overflow: visible;
                        }
                    }
                `}
            </style>
        </>
    );
};

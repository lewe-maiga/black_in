import {Beats} from "@database/models/beats";
import { getFileLink } from "@lib/utils";
import Image from "next/image";
import {useEffect, useState} from "react";
type SliderProps = {
    beats: Beats[];
};

export const Slider = ({beats}: SliderProps) => {
    const [active, setActive] = useState(1);
    const duration = 5;
    useEffect(() => {
        if (window.innerWidth > 1000) {
            const timer = window.setTimeout(() => {
                if (active >= beats.length) {
                    return setActive(1);
                }
                return setActive((el) => el + 1);
            }, duration * 1000);
            return () => {
                window.clearInterval(timer);
            };
        }
    }, [active, beats.length]);
    const prev = (x: number) => {
        if (x <= 1) {
            return beats.length;
        }
        return x - 1;
    };
    return (
        <div className="wrapper">
            <ul id="slider">
                {beats.map((beat, index) => (
                    <li
                        key={beat._id}
                        id="list"
                        className={index + 1 === active ? "active" : ""}>
                        <span className="image">
                            <Image
                                src={getFileLink(beat.image.key)}
                                alt={beat.image.name}
                                layout="fill"
                                objectFit="cover"
                                priority
                                
                            />
                        </span>
                    </li>
                ))}
            </ul>

            <style jsx>
                {`
                    .wrapper {
                        position: relative;
                        width: 100%;
                        height: 250px;
                    }

                    ul {
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        height: 100%;
                        width: 100%;
                    }
                    #list {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        animation: slide 15s infinite;
                    }
                    #list:nth-child(1) {
                        top: 0;
                        left: 0;
                    }
                    #list:nth-child(2) {
                        top: 0;
                        left: 100%;
                    }
                    #list:nth-child(3) {
                        top: 0;
                        left: 200%;
                    }

                    .image {
                        width: 100%;
                        height: 100%;
                        display: block;
                        position: relative;
                    }

                    @media only screen and (min-width: 1000px) {
                        ul {
                            left: -15px;
                            top: 20px;
                            transform: translate(15%, 0);
                            padding: 20px;
                            height: 100%;
                            width: 100%;
                            position: absolute;
                            transform-style: preserve-3d;
                            overflow: visible;
                        }
                        #list {
                            position: absolute;
                            transform-style: preserve-3d;
                            transition: 1s;
                            width: 55%;
                            max-width: 310px;
                            height: 90%;
                            animation: none;
                        }
                        #list:nth-child(1) {
                            top: 0;
                            left: 0;
                        }
                        #list:nth-child(2) {
                            top: 0;
                            left: 0;
                        }
                        #list:nth-child(3) {
                            top: 0;
                            left: 0;
                        }
                        #list:nth-child(${active}) {
                            z-index: 2;
                        }
                        #list:nth-child(${prev(active)}) {
                            z-index: 1;
                        }
                        #list:nth-child(${prev(prev(active))}) {
                            z-index: 0;
                        }
                    }

                    @media only screen and (min-width: 1400px) {
                        ul {
                            left: 0;
                            //top: -15px;
                        }
                    }

                    @keyframes slide {
                        0%,
                        15%,
                        25%,
                        100% {
                            transform: translateX(0);
                        }
                        35%,
                        45%,
                        60% {
                            transform: translateX(-100%);
                        }

                        70%,
                        80%,
                        90% {
                            transform: translateX(-200%);
                        }
                    }
                `}
            </style>
            <style jsx>
                {`
                    @media only screen and (min-width: 1000px) {
                        #list:nth-child(${active}) {
                            transform: translateX(55%) translateZ(20px);
                        }
                        #list:nth-child(${prev(active)}) {
                            transform: translateX(0) translateZ(0) scale(0.8);
                        }
                        #list:nth-child(${prev(prev(active))}) {
                            transform: translateX(-55%) translateZ(-20px)
                                scale(0.6);
                        }
                    }
                `}
            </style>
        </div>
    );
};

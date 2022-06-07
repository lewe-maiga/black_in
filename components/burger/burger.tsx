import {MouseEventHandler} from "react";
type BurgerProps = {
    active: boolean;
    handleActive: MouseEventHandler<HTMLDivElement>;
};
export const Burger = ({active, handleActive}: BurgerProps) => {
    return (
        <div
            className={`${active ? "active" : ""} plate plate3`}
            onClick={handleActive}>
            <svg
                className="burger"
                version="1.1"
                height="100"
                width="100"
                viewBox="0 0 100 100">
                <path
                    className="line line1"
                    d="M 50,35 H 30 C 6.9919512,35 5.5084746,123.72881 5.5084746,123.72881"
                />
                <path
                    className="line line2"
                    d="M 50,35 H 70 C 98.006349,35 92.796611,119.91525 92.796611,119.91525"
                />
                <path
                    className="line line3"
                    d="M 50,50 H 30 C 8.2796577,50 5.9322035,138.1356 5.9322035,138.1356"
                />
                <path
                    className="line line4"
                    d="M 50,50 H 70 C 91.152643,50 91.949152,133.21754 91.949152,133.21754"
                />
                <path
                    className="line line5"
                    d="M 50,65 C 50,65 47.570314,65 30,65 C 4.9857853,65 9.3220337,147.88136 9.3220337,147.88136"
                />
                <path
                    className="line line6"
                    d="M 50,65 H 70 C 91.937316,65 88.559322,144.91525 88.559322,144.91525"
                />
            </svg>
            <svg
                className="x"
                version="1.1"
                height="100"
                width="100"
                viewBox="0 0 100 100">
                <path className="line" d="M 34,32 L 66,68" />
                <path className="line" d="M 66,32 L 34,68" />
            </svg>

            <style jsx>{`
                svg {
                    height: 45px;
                    position: absolute;
                    width: 45px;
                }

                .plate {
                    height: 45px;
                    width: 45px;
                    transition: transform 0.3s ease-in-out;
                }
                .plate:hover {
                    transform: scale(1.1);
                }

                .x {
                    transform: scale(0);
                    transition: transform 400ms;
                }
                .line {
                    fill: none;
                    stroke: black;
                    stroke-width: 6px;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    transform-origin: 50%;
                    transition: stroke-dasharray 500ms 200ms,
                        stroke-dashoffset 500ms 200ms, transform 500ms 200ms;
                }
                .x .line {
                    stroke-width: 5.5px;
                }
                .active .x {
                    transform: scale(1);
                    transition: transform 400ms 350ms;
                }
                .active .line {
                    transition: stroke-dasharray 500ms, stroke-dashoffset 500ms,
                        transform 500ms;
                }

                .plate3 .line {
                    transition: stroke-dasharray 300ms 200ms,
                        stroke-dashoffset 300ms 200ms, transform 300ms 200ms;
                }
                .plate3 .line1 {
                    stroke-dasharray: 21 109;
                }
                .plate3 .line2 {
                    stroke-dasharray: 21 112;
                }
                .plate3 .line3 {
                    stroke-dasharray: 21 102;
                }
                .plate3 .line4 {
                    stroke-dasharray: 21 103;
                }
                .plate3 .line5 {
                    stroke-dasharray: 21 110;
                }
                .plate3 .line6 {
                    stroke-dasharray: 21 115;
                }
                .plate3 .x {
                    transition: transform 400ms 50ms;
                }

                .active.plate3 .line {
                    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms,
                        transform 400ms;
                }
                .active.plate3 .line1 {
                    stroke-dasharray: 5 109;
                    stroke-dashoffset: -100px;
                }
                .active.plate3 .line2 {
                    stroke-dasharray: 5 112;
                    stroke-dashoffset: -100px;
                }
                .active.plate3 .line3 {
                    stroke-dasharray: 5 102;
                    stroke-dashoffset: -100px;
                }
                .active.plate3 .line4 {
                    stroke-dasharray: 5 103;
                    stroke-dashoffset: -100px;
                }
                .active.plate3 .line5 {
                    stroke-dasharray: 5 110;
                    stroke-dashoffset: -100px;
                }
                .active.plate3 .line6 {
                    stroke-dasharray: 5 115;
                    stroke-dashoffset: -100px;
                }
                .active.plate3 .x {
                    transition: transform 400ms 100ms;
                }

                @media only screen and (min-width: 700px) {
                    svg {
                        height: 60px;
                        position: absolute;
                        width: 60px;
                    }

                    .plate {
                        height: 60px;
                        width: 60px;
                    }
                }
            `}</style>
        </div>
    );
};

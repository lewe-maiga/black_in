import {MouseEventHandler} from "react";

type ViewMoreProps = {
    backward: MouseEventHandler;
    forward: MouseEventHandler;
};

export const ViewMore = ({backward, forward}: ViewMoreProps) => {
    return (
        <>
            <span className="view-more">
                <span className="more-text">Voir plus</span>
                <button
                    name="backward"
                    onClick={backward}
                    className="btn backward">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--ic"
                            width="32"
                            height="32"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                className="arrow"
                                d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"></path>
                        </svg>
                    </div>
                </button>
                <button
                    name="forward"
                    onClick={forward}
                    className="btn forward">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--ic"
                            width="32"
                            height="32"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                className="arrow"
                                d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"></path>
                        </svg>
                    </div>
                </button>
            </span>

            <style jsx>
                {`
                    .view-more .more-text {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.7rem;
                        font-weight: 700;
                        margin-right: 10px;
                        color: var(--ternary);
                    }
                    .view-more {
                        display: flex;
                    }
                    .view-more .btn div {
                        background: #fff;
                        display: flex;
                        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    }
                    .forward div svg {
                        transform: rotate(180deg);
                    }
                    .view-more .btn {
                        background: transparent;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                    .view-more .btn svg {
                        fill: rgba(107, 107, 107, 0.8);
                        width: 30px;
                        height: 25px;
                        border: 1px solid rgba(107, 107, 107, 0.2);
                    }
                    svg .arrow {
                        width: 15px;
                        height: 10px;
                    }
                `}
            </style>
        </>
    );
};

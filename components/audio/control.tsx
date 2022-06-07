import {MouseEventHandler} from "react";

type ControlProps = {
    isPlaying: boolean;
    play: MouseEventHandler;
    pause: MouseEventHandler;
};

export const Control = ({isPlaying, play, pause}: ControlProps) => {
    return (
        <>
            <div className="control">
                {isPlaying ? (
                    <button className="icon" onClick={play}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--material-symbols"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888q.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z"></path>
                        </svg>
                    </button>
                ) : (
                    <button className="icon" onClick={pause}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--material-symbols"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M14 19V5h4v14Zm-8 0V5h4v14Z"></path>
                        </svg>
                    </button>
                )}
            </div>
            <style jsx>{`
                .control {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 15px;
                }

                .icon {
                    display: flex;
                    width: 50px;
                    height: 50px;
                    margin: 0 18px;
                    justify-content: center;
                    align-items: center;
                    background: var(--primary);
                    border: none;
                    color: var(--secondary);
                    border-radius: 50%;
                    cursor: pointer;
                    transition: box-shadow 0.4s ease-in-out;
                }
                .icon svg {
                    width: 32px;
                    height: 32px;
                }
                .icon:hover {
                    box-shadow: 0 0 20px #ffffffa6;
                }
                @media screen and (min-width: 700px) {
                    .control {
                    
                    margin-bottom: 0;
                }
                }
            `}</style>
        </>
    );
};

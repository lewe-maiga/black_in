import {directstyled, useDirectStyle} from "direct-styled";
import {
    ChangeEventHandler,
    MouseEventHandler,
    TouchEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import {useDrag} from "react-use-gesture";

type BarProps = {
    progress: number;
    duration: number;
    currentTime: number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onMouseUp: MouseEventHandler;
    onTouchEnd: TouchEventHandler;
};

export const Bar = ({
    progress,
    duration,
    onChange,
    currentTime,
    onMouseUp,
    onTouchEnd,
}: BarProps) => {
    return (
        <>
            <div className="timebar">
                <div className="bar-container">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        className="bar"
                        value={progress}
                        onChange={onChange}
                        onMouseUp={onMouseUp}
                        onTouchEnd={onTouchEnd}
                    />
                </div>
            </div>

            <style jsx>{`
                .timebar {
                    position: relative;
                    display: flex;
                    flex: 1 1;
                    justify-content: center;
                    align-items: center;
                }

                .bar-container {
                    display: flex;
                    width: 100%;
                    padding: 5px;
                }

                .bar {
                    --thumb-size: 15px;
                    --track-height: 4px;
                    --bar-color: #6b6b6b57;
                    --track-radius: 10px;
                    --thumb-radius: 50%;
                    position: relative;
                    appearance: none;
                    width: 100%;
                    background: transparent;
                }

                /* Bar Chromium */
                .bar::-webkit-slider-runnable-track {
                    -webkit-appearance: none;
                    height: var(--track-height);
                    border: none;
                    border-radius: var(--track-radius);
                    background: linear-gradient(
                        to right,
                        var(--ternary) 0%,
                        var(--ternary) ${progress + 0.5}%,
                        var(--bar-color) ${progress + 0.5}%,
                        var(--bar-color) 100%
                    );
                    transition: background 0.2s ease-in;
                }

                /* cursor Chromium */
                .bar::-webkit-slider-thumb {
                    position: relative;
                    -webkit-appearance: none;
                    top: 50%;
                    transform: translateY(-50%);
                    width: var(--thumb-size);
                    height: var(--thumb-size);
                    border: none;
                    border-radius: var(--thumb-radius);
                    background: var(--ternary);
                    opacity: 0;
                    transition: opacity 0.18s ease-in;
                }

                .bar-container:hover > .bar::-webkit-slider-runnable-track {
                    background: linear-gradient(
                        to right,
                        var(--primary) 0%,
                        var(--primary) ${progress + 0.5}%,
                        var(--bar-color) ${progress + 0.5}%,
                        var(--bar-color) 100%
                    );
                }

                .bar-container:hover > .bar::-webkit-slider-thumb {
                    opacity: 1;
                }

                /* Bar Firefox */
                .bar::-moz-range-track {
                    height: var(--track-height);
                    border: none;
                    border-radius: var(--track-radius);
                    background: linear-gradient(
                        to right,
                        var(--ternary) 0%,
                        var(--ternary) ${progress + 0.5}%,
                        var(--bar-color) ${progress + 0.5}%,
                        var(--bar-color) 100%
                    );
                    transition: background 0.2s ease-in;
                }

                /* cursor Firefox */
                .bar::-moz-range-thumb {
                    width: var(--thumb-size);
                    height: var(--thumb-size);
                    border: none;
                    border-radius: var(--thumb-radius);
                    background: var(--ternary);
                    opacity: 0;
                    transition: opacity 0.18s ease-in;
                }

                .bar::-moz-range-progress {
                    height: 0;
                    background: transparent;
                }

                /* hover Firefox*/
                .bar-container:hover > .bar::-moz-range-track {
                    background: linear-gradient(
                        to right,
                        var(--primary) 0%,
                        var(--primary) ${progress + 0.5}%,
                        var(--bar-color) ${progress + 0.5}%,
                        var(--bar-color) 100%
                    );
                }
                
                .bar-container:hover > .bar::-moz-range-thumb {
                    opacity: 1;
                }
            `}</style>
        </>
    );
};

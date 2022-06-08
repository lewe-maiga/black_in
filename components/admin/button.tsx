import {cssUnitHelper} from "@lib/utils"
import {MouseEventHandler} from "react"

type ButtonProps = {
    disabled?: boolean
    type?: string
    text: string
    click?: MouseEventHandler
    color?: string
    width?: string | number
    backgroundColor?: string
    radius?: number | string
    border?: string
}

export const Button = ({
    disabled = false,
    type = "submit",
    text,
    radius = 5,
    click,
    width = "100%",
    color = "#fff",
    backgroundColor = "#FF6B54",
    border = "none",
}: ButtonProps) => {
    const sizeWidth = cssUnitHelper(width)
    return (
        <>
            <button
                onClick={click}
                disabled={disabled}
                className="btn"
                type={type !== "submit" ? "button" : "submit"}
                name={type}>
                {text}
            </button>

            <style jsx>
                {`
                    button.btn {
                        color: ${color};
                        background-color: ${backgroundColor};
                        border-radius: ${cssUnitHelper(radius)};
                        width: ${sizeWidth};
                        border: ${border};
                        height: 100%;
                        font-size: 1rem;
                        font-weight: 700;
                        letter-spacing: 0.2px;
                        min-height: 50px;
                        max-width: 200px;
                        cursor: pointer;
                    }
                    .btn:hover,
                    .btn:focus {
                        //background-color: ${backgroundColor};
                        opacity: 0.8;
                    }
                    .btn:disabled {
                        color: rgba(0, 0, 0, 0.8);
                        background: #f5f5f5;
                        cursor: not-allowed;
                    }
                    @media only screen and (max-width: 1024px) {
                        button.btn {
                            font-size: 0.55rem;
                            max-width: 100px;
                            min-height: 35px;
                        }
                    }
                    @media only screen and (max-width: 768px) {
                        button.btn {
                            font-size: 0.6rem;
                            max-width: 100px;
                        }
                    }
                    @media only screen and (max-width: 427px) {
                        button.btn {
                            width: ${sizeWidth};
                            font-size: 0.5rem;
                            max-width: 80px;
                            min-height: 35px;
                        }
                    }
                `}
            </style>
        </>
    )
}

import {ChangeEventHandler} from "react"

type InputProps = {
    label: string
    name: string
    onChange: ChangeEventHandler
    value: string
    type?: string
    id?: string
}

export const Input = ({
    label,
    name,
    onChange,
    type = "text",
    id,
    value,
}: InputProps) => {
    return (
        <>
            <span>
                <input
                    type={type}
                    id={id ? id : name}
                    name={name}
                    className="lastName"
                    onChange={onChange}
                    required
                />
                <label htmlFor={id ? id : name}>{label}</label>
            </span>

            <style jsx>
                {`
                    input {
                        width: 100%;
                        outline: none;
                        border: none;
                        position: relative;
                        display: inline-block;
                        font-size: 1rem;
                        padding: 0 0 5px 0;
                        color: #000;
                        background-color: transparent;
                        border: none;
                        border-bottom: solid 2px #ff6b54;
                        z-index: 20;
                    }

                    input:focus ~ label {
                        top: -60px;
                    }
                    label {
                        position: relative;
                        display: inline-block;
                        color: #004d40;
                        top: 100px;
                        font-size: 1rem;
                        transition: all 0.2s ease;
                        z-index: 10;
                        position: relative;
                    }
                `}
            </style>
            <style jsx>
                {`
                    span {
                        ${type !== "email"
                            ? "flex-basis: 50%;"
                            : "width: 100%;"}
                        margin: 5px;
                        position: relative;
                    }
                    label {
                        ${value === "" ? "top: -30px;" : "top:-60px;"}
                    }
                `}
            </style>
        </>
    )
}

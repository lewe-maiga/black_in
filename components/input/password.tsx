import {ChangeEventHandler, useState} from "react"

type PasswordProps = {
    label: string
    name: string
    onChange: ChangeEventHandler
    value: string
}

export const Password = ({label, name, onChange, value}: PasswordProps) => {
    const [show, setShow] = useState(false)
    const toogleShow = () => setShow(!show)
    return (
        <>
            <div>
                <span>
                    <input
                        name={name}
                        id={name}
                        type={!show ? "password" : "text"}
                        minLength={8}
                        required
                        onChange={onChange}
                    />
                    <label htmlFor="password">{label}</label>
                </span>
                <input
                    type="checkbox"
                    onChange={toogleShow}
                    defaultChecked={show}
                />
            </div>

            <style jsx>
                {`
                    input[type=${!show ? "password" : "text"}] {
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
                    label {
                        position: relative;
                        display: inline-block;
                        color: #004d40;

                        font-size: 1rem;
                        transition: all 0.2s ease;
                        z-index: 10;
                        position: relative;
                        ${value === "" ? "top: -30px;" : "top: -60px;"}
                    }
                    input:focus ~ label,
                    input:valid ~ label {
                        top: -60px;
                    }
                    span {
                        margin: 5px;
                        width: 100%;
                        //display: flex;
                        position: relative;
                    }
                    div {
                        display: flex;
                    }
                `}
            </style>
        </>
    )
}

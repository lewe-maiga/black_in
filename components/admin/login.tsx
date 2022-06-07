import {NextRouter} from "next/router";
import {useReducer, useState, ChangeEvent, SyntheticEvent} from "react";
import {Button} from "./button";
import {Input} from "../input";
import {Password} from "../input/password";

type State = {
    email: string;
    password: string;
};
type Action = {
    name: string;
    value: string;
};
const initialState = {
    email: "",
    password: "",
};

function reducer(state: State, action: Action) {
    const {name, value} = action;
    return {...state, [name]: value};
}
type LoginProps = {
    setToken: Function;
    router: NextRouter;
};
export const Login = ({setToken, router}: LoginProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState({
        err: false,
        msg: "",
    });

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError({
            err: false,
            msg: "",
        });
        const name = event.target.name;
        const value = event.target.value;

        dispatch({name, value});
    };
    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const endpoint = "/api/admin/register";
        const data = {
            email: state.email,
            password: state.password,
        };

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(endpoint, options);
        if (response.ok) {
            const {token, _id} = await response.json();
            setToken(token, _id);
            router.push(`/admin/dashboard`);
        } else {
            const {error: err} = await response.json();
            setError({err: true, msg: err});
        }
    };
    return (
        <>
            <div className="login">
                <form onSubmit={onSubmit}>
                    <span>
                        <Input
                            value={state.email}
                            label="email"
                            type="email"
                            name="email"
                            onChange={inputChange}
                        />
                    </span>
                    <span>
                        <Password
                            value={state.password}
                            label="mot de passe"
                            name="password"
                            onChange={inputChange}
                        />
                    </span>
                    <span className="msg">{error.err && error.msg}</span>
                    <span className="btn">
                        <Button
                            text="Se Connecter"
                            disabled={
                                state.password === "" ||
                                state.email === "" ||
                                state.password.length < 8
                            }
                        />
                    </span>
                </form>
            </div>

            <style jsx>
                {`
                    form {
                        display: flex;
                        max-width: 350px;
                        display: flex;
                        flex-direction: column;
                        background: #fff;
                        padding: 2rem 2rem;
                        margin: 2rem;
                    }
                    span {
                        display: flex;
                        padding: 0.25rem 1rem;
                        margin: 1rem 0 0.5rem;
                    }
                    .btn {
                        margin-top: 1rem;
                        display: flex;
                        justify-content: center;
                    }
                    .login {
                        display: flex;
                        margin: 0;
                        margin-bottom: 8rem;
                        padding: 0;
                    }
                    .msg {
                        font-size: 0.8rem;
                        display: flex;
                        justify-content: center;
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>
        </>
    );
};

import {NextRouter} from "next/router"
import {ChangeEvent, SyntheticEvent, useReducer} from "react"
import {Button} from "./button"
import {Input} from "../input"
import {Password} from "../input/password"

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    checkedPassword: "",
}

type State = {
    firstName: string
    lastName: string
    email: string
    password: string
    checkedPassword: string
}

type Action = {
    name: string
    value: string
}

const reducer = (state: State, action: Action) => {
    const {name, value} = action
    return {...state, [name]: value}
}
type SignInProps = {
    mutate: Function
    setToken: Function
    type: string
    router: NextRouter
}
export const SignIn = ({mutate, setToken, type, router}: SignInProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name
        const value = event.target.value
        dispatch({name, value})
    }

    const onSubmit = async (event: SyntheticEvent) => {
        try {
            event.preventDefault()

            const data = {...state, type}
            const option: RequestInit = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const endpoint = "/api/admin"
            const response = await fetch(endpoint, option)
            if (response.ok) {
                const {admin} = await response.json()
                const register = await fetch("/api/admin/register", {
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                })
                if (register.ok) {
                    const {token} = await register.json()
                    setToken(token)
                    mutate()
                    router.push(`/admin/${admin._id}`)
                } else {
                    const {error} = await register.json()
                    throw new Error(error)
                }
            } else {
                const {error} = await response.json()
                throw new Error(error)
                
            }
        } catch (error) {
        console.error(error)
            throw error
        }
    }
    return (
        <>
            <form onSubmit={onSubmit} className="form">
                <div className="name">
                    <Input
                        label="prenom"
                        name="lastName"
                        onChange={inputChange}
                        value={state.lastName}
                    />

                    <Input
                        value={state.firstName}
                        label="nom"
                        name="firstName"
                        onChange={inputChange}
                    />
                </div>
                <div className="email">
                    <Input
                        value={state.email}
                        label="email"
                        type="email"
                        name="email"
                        onChange={inputChange}
                    />
                </div>
                <div className="password">
                    <Password
                        value={state.password}
                        label="mot de passe"
                        name="password"
                        onChange={inputChange}
                    />

                    <Password
                        value={state.checkedPassword}
                        label="confirmer mot de passe"
                        name="checkedPassword"
                        onChange={inputChange}
                    />
                </div>

                <div className="button">
                    <Button
                        text="Se Connecter"
                        disabled={
                            state.password !== state.checkedPassword ||
                            state.password.length < 8 ||
                            state.lastName === "" ||
                            state.email === "" ||
                            state.firstName === ""
                        }
                    />
                </div>
            </form>
            <style jsx>
                {`
                    .form {
                        display: flex;
                        flex-wrap: wrap;
                        flex-direction: column;
                        border: solid 1px #000;
                        padding: 50px;

                        border-radius: 30px;
                        justify-content: center;
                        align-items: center;
                    }
                    div {
                        padding: 5px;
                        display: flex;
                        width: 100%;
                    }
                    div.password {
                        flex-direction: column;
                    }
                    div.button {
                        margin: 15px 0 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </>
    )
}

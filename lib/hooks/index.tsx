import {useCallback, useEffect, useMemo, useReducer, useState} from "react";

function reducer(
    state: {isRunning: boolean; msg?: string},
    action: {type: "loading" | "error" | "done"; msg?: string}
) {
    switch (action.type) {
        case "loading":
            return {...state, isRunning: true};
        case "error":
            return {...state, isRunning: false, msg: action.msg};
        case "done":
            return {...state, isRunning: false};

        default:
            throw new Error("Impossible d'effectuer cette action");
    }
}

const initialState = {isRunning: false, msg: ""};

export function useLoading() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return {loading: state.isRunning, dispatch};
}

export function useToken() {
    const tokenString = "token";
    const getToken = useMemo(() => {
        if (typeof window !== "undefined") {
            const value = sessionStorage.getItem(tokenString);
            if (value) {
                const {token, expiredAt, _id} = JSON.parse(value);
                return {token, expiredAt, _id};
            }
        }
        return null;
    }, []);
    const [state, setState] = useState(getToken);
    useEffect(() => {
        console.log("render");
        const exp = new Date(state?.expiredAt);
        const now = new Date();
        if (exp < now) {
            console.log("expired");
            sessionStorage.removeItem(tokenString);
            setState(null);
        }
    }, [state]);
    const saveToken = useCallback(
        (token: string, _id: string) => {
            const expiredAt = new Date().getTime() + 60000 * 300;
            sessionStorage.setItem(
                tokenString,
                JSON.stringify({token, expiredAt, _id})
            );
            setState({token, expiredAt, _id});
        },
        [setState]
    );
    return {token: state?.token, _id: state?._id, saveToken};
}

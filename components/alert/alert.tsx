import {MouseEvent} from "react"

type AlertProps = {
    type: string
    message: string
    title: string
    width?: number
    height?: number
}

export const Alert = ({message, title, type, width = 100}: AlertProps) => {
    const onClose = (event: MouseEvent<HTMLButtonElement>) => {}
    return (
        <>
            <div>
                <button onClick={onClose}></button>
            </div>
            <style jsx>{``}</style>
            <style jsx>{``}</style>
        </>
    )
}

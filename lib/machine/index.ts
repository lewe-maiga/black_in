import {Description} from "@database/models/description"
import {fetcher} from "@lib/utils"
import {createMachine, guard, invoke, reduce, state, transition} from "robot3"

export const wait = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}
const canSubmit = (ctx: any) => {
    return (
        ctx?.n_content_main &&
        ctx?.n_heading_main &&
        ctx?.n_content_secondary &&
        ctx?.n_heading_secondary &&
        (ctx.content_main !== ctx.n_content_main ||
            ctx.heading_main !== ctx.n_heading_main ||
            ctx.content_secondary !== ctx.n_content_secondary ||
            ctx.heading_secondary !== ctx.n_heading_secondary)
    )
}

export default createMachine(
    {
        idle: state(transition("edit", "edit")),
        edit: state(
            transition("cancel", "idle"),
            transition("submit", "loading", guard(canSubmit)),
            transition(
                "input",
                "edit",
                reduce((ctx: any, ev: any) => {
                    return {
                        ...ctx,
                        n_content_main: ev.n_content_main,
                        n_heading_main: ev.n_heading_main,
                        n_content_secondary: ev.n_content_secondary,
                        n_heading_secondary: ev.n_heading_secondary,
                    }
                })
            )
        ),
        loading: invoke(
            async () => fetcher("/api/description"),
            transition(
                "done",
                "success",
                reduce((ctx: any, ev: any) => ({
                    ...ctx,
                    ...ev.data,
                }))
            ),

            transition(
                "error",
                "error",
                reduce((ctx: any, ev: any) => ({
                    ...ctx,
                    error: ev.error.message,
                }))
            )
        ),
        success: invoke(() => wait(2000), transition("done", "idle")),
        error: state(
            transition("dismiss", "edit"),
            transition("retry", "loading")
        ),
    },
    (initial) => ({...initial})
)

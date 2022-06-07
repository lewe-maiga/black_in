import {fetcher} from "@lib/utils";
import {createMachine, guard, invoke, reduce, state, transition} from "robot3";

const wait = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
const canSubmit = (ctx: any) => {
    return (
        ctx.n_pseudo && ctx.n_content && (ctx.pseudo !== ctx.n_pseudo || ctx.content !== ctx.n_content)
    );
};

export default createMachine(
    {
        idle: state(transition("edit", "edit")),
        edit: state(
            transition("cancel", "idle"),
            transition("submit", "loading", guard(canSubmit)),
            transition(
                "input",
                "edit",
                reduce((ctx: any, ev: any) => ({
                    ...ctx,
                    n_pseudo: ev.n_pseudo,
                    n_content: ev.n_content,
                }))
            )
        ),
        loading: invoke(
            async (ctx: any) => {
                console.log("ctx: ", ctx);
                const response = await fetcher(`/api/artists/${ctx._id}`);
                return response.artist;
            },
            transition(
                "done",
                "success",
                reduce((ctx: any, ev: any) => {
                    console.log(ctx, ev);
                    return {
                        ...ctx,
                        ...ev.data,
                    };
                })
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
    (initial) => {
        return {...initial};
    }
);

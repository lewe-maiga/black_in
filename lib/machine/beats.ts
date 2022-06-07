import {fetcher} from "@lib/utils";
import {createMachine, guard, invoke, reduce, state, transition} from "robot3";

const wait = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};
const canSubmit = (ctx: any) => {
    return (
        ctx.n_title &&
        ctx.n_genre &&
        ctx.n_format &&
        ctx.n_price &&
        ctx.n_tempo &&
        (ctx.title !== ctx.n_title ||
            ctx.genre !== ctx.n_genre ||
            ctx.format !== ctx.n_format ||
            ctx.price !== parseInt(ctx.n_price) ||
            ctx.tempo !== parseInt(ctx.n_tempo))
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
                    n_title: ev.n_title,
                    n_genre: ev.n_genre,
                    n_format: ev.n_format,
                    n_price: ev.n_price,
                    n_tempo: ev.n_tempo,
                }))
            )
        ),
        loading: invoke(
            async (ctx: any) => {

                const response = await fetcher(`/api/beats/${ctx._id}`);
                return response.beat;
            },
            transition(
                "done",
                "success",
                reduce((ctx: any, ev: any) => ({
                        ...ctx,
                        ...ev.data,
                    
                })
            )),

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

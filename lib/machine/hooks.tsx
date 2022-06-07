import {useCallback, useRef, useState} from "react"
import {interpret, Machine} from "robot3"

export function useMachine(machine: Machine, initalContext = {}) {
    const {current: service} = useRef(
        interpret(
            machine,
            () => {
                setState(service.machine.current)
                setContext(service.context)
            },
            initalContext
        )
    )

    const [state, setState] = useState(service.machine.current)
    const [context, setContext] = useState(service.context)

    const send = useCallback(
        (type, params = {}) => {
            service.send({type, ...params})
        },
        [service]
    )

    const can = useCallback(
        (transitionName) => {
            const transitions = service.machine.state.value.transitions
            if (!transitions.has(transitionName)) {
                return false
            }
            const transitionsForName = transitions.get(transitionName)
            if (transitionsForName) {
                for (const transition of transitionsForName) {
                    
                    if (
                        (transition.guards &&
                            // @ts-ignore: Unreachable code error
                            transition.guards(service.context)) ||
                        !transition.guards
                    ) {
                        return true
                    }
                }
                return false
            }
        },
        [service.context, service.machine.state.value.transitions]
    )

    return {state, context, send, can, service}
}

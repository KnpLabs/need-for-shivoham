import {div} from '@cycle/dom'

export function Obstacles(sources) {
    const state$ = sources.DOM.select('document').events('keyup')
        .filter(ev => ev.keyCode === 32)
        .fold((acc, value) => {
            acc.push({});

            return acc;
        }, [])

    return {
        DOM: state$.map((state) => div(state.map(() => div('.block'))))
    };
}

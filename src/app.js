import {rect, text, polygon} from 'cycle-canvas';
import {div} from '@cycle/dom'
import xs from 'xstream'

export function App ({DOM, Time}) {
    const frames$ = Time.animationFrames();

    return {
        Canvas: frames$.map(f => rect({draw: [{fill: 'skyblue'}]}, [
            text({x: 10, y: 10, value: `frame: ${f.delta}`}),
        ])),
    }
}


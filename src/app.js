import {rect, text, polygon} from 'cycle-canvas';
import {div} from '@cycle/dom'
import xs from 'xstream'

export function App ({DOM, Time, Canvas}) {
    const frames$ = Time.animationFrames();

    return {
        //Canvas: frames$.map(drawCanvas),
        DOM: frames$.map(drawDOM),
    }
}

function drawCanvas(f) {
    return rect({draw: [{fill: 'skyblue'}]}, [
        text({x: 10, y: 10, value: `frame: ${f.delta}`}),
    ]);
}

function drawDOM(f) {
    return div(`frame: ${f.delta}`)
}

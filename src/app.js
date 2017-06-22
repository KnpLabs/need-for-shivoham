import {rect, text, polygon} from 'cycle-canvas';
import {div} from '@cycle/dom'
import xs from 'xstream'

export function App ({DOM, Time, Canvas}) {
    const frame$ = Time.animationFrames();
    const keyDown$ = DOM.select('document').events('keydown');
    const keyUp$ = DOM.select('document').events('keyup').mapTo(0).startWith(0);
    const keyLeft$ = keyDown$.filter(ev => ev.keyCode === 37).mapTo(-1).startWith(0);
    const keyRight$ = keyDown$.filter(ev => ev.keyCode === 39).mapTo(1).startWith(0);


    const action$ = xs.merge(keyLeft$, keyRight$, keyUp$);

    return {
        Canvas: xs.combine(frame$, action$)
            .map(drawCanvas),
    }
}

function drawCanvas(stream) {
        stream.fold((acc, [frame, action]) => {
                acc.x = acc.x + action;

                return acc;
            }, { x: 10, y: 10 })
            .map((position) => rect({draw: [{fill: 'skyblue'}]}, [
                text({x: position.x, y: position.y, value: `frame: salut`}),
            ]))
}

function drawDOM(f) {
    return div(`frame: ${f.delta}`)
}

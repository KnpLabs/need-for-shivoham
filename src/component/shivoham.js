import xs from 'xstream'
import {div} from '@cycle/dom'

export function Shivoham({DOM}) {
    const keyDown$ = DOM.select('document').events('keydown');
    const keyLeft$ = keyDown$.filter(ev => ev.keyCode === 37).mapTo(-1).startWith(0);
    const keyRight$ = keyDown$.filter(ev => ev.keyCode === 39).mapTo(1).startWith(0);

    const state$ = xs.merge(keyLeft$, keyRight$)
        .map(direction => xs.fromArray([direction, 0]))
        .flatten()
        .fold((acc, direction) => {
            const minX = 64;
            const maxX = 504;
            const trackWidth = 40;

            return Math.max(Math.min(maxX, acc + direction * trackWidth), minX);
        }, 264)
        .startWith(264)
    ;

    return {
        DOM: state$.map((direction) => div('#player', { style: { left: `${direction}px` } })),
        shivohamX: state$,
    }
}

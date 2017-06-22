import {rect, text, polygon} from 'cycle-canvas';
import {div} from '@cycle/dom'
import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

import { draw as drawCanvas } from './drawer/canvas.js';
import { draw as drawDom } from './drawer/dom.js';

export function App ({DOM, Time, Canvas}) {
    const frame$ = Time.animationFrames();
    const keyDown$ = DOM.select('document').events('keydown');
    const keyLeft$ = keyDown$.filter(ev => ev.keyCode === 37).mapTo(-1).startWith(0);
    const keyRight$ = keyDown$.filter(ev => ev.keyCode === 39).mapTo(1).startWith(0);


    const action$ = xs.merge(keyLeft$, keyRight$)
        .map(direction => xs.fromArray([direction, 0]))
        .flatten();

    return {
        Canvas: drawCanvas(xs.combine(frame$, action$)),
        DOM: drawDom(xs.combine(frame$, action$)),
    }
}

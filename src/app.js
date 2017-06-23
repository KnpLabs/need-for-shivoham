import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

import { draw as drawCanvas } from './drawer/canvas';
import { draw as drawDom } from './drawer/dom';
import { getAction, stickObstacle } from './player/action';

export function App({DOM, Time, Canvas}) {
    const frame$ = Time.animationFrames();
    const action$ = getAction(DOM);
    const stickObstacle$ = stickObstacle(DOM);
    const moveObstacle$ = Time.periodic(16).map(() => xs.fromArray([50, 0])).flatten();

    const enemy$ = Time.periodic(1000)
        .map(() => {
            return Math.floor(Math.random() * 3) - 1;
        })
        .map(position => xs.fromArray([position, 0]))
        .flatten()
    ;

    return {
        DOM: drawDom(xs.combine(xs.of(null), action$, stickObstacle$, moveObstacle$, enemy$)),
    }
}

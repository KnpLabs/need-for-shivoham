import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

import { draw as drawCanvas } from './drawer/canvas';
import { draw as drawDom } from './drawer/dom';
import { getAction, stickObstacle } from './player/action';

export function App({DOM, Time, Canvas}) {
    const frame$ = Time.animationFrames();
    const action$ = getAction(DOM);
    const stickObstacle$ = stickObstacle(DOM);

    const enemy$ = xs.periodic(1000).map(() => {
        return Math.floor(Math.random() * 3) - 1;
    });

    return {
        DOM: drawDom(xs.combine(frame$, action$, stickObstacle$, enemy$)),
    }
}

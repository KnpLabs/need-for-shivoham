import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

import { draw as drawCanvas } from './drawer/canvas';
import { draw as drawDom } from './drawer/dom';
import { getAction } from './player/action';

export function App({DOM, Time, Canvas}) {
    const frame$ = Time.animationFrames();
    const action$ = getAction(DOM);

    return {
        Canvas: drawCanvas(xs.combine(frame$, action$)),
        DOM: drawDom(xs.combine(frame$, action$)),
    }
}

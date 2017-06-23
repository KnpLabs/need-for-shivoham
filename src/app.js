import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

import { draw } from './drawer/dom';
import { getAction, stickObstacle } from './player/action';
import {foldState} from './state'
import {doppler} from './sound/doppler'

export function App({DOM, Time}) {
    const action$ = getAction(DOM);
    const stickObstacle$ = stickObstacle(DOM);
    const moveObstacle$ = Time.periodic(100).map(() => xs.fromArray([40, 0])).flatten();

    const enemy$ = Time.periodic(1000)
        .map(() => {
            return Math.floor(Math.random() * 3) - 1;
        })
        .map(position => xs.fromArray([position, 0]))
        .flatten()
    ;


    const state$ = xs.combine(action$, stickObstacle$, moveObstacle$, enemy$)
        .compose(foldState)

    return {
        DOM: draw(state$),
        Sound: doppler(state$),
    }
}

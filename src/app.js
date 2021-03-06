import xs from 'xstream'
import debounce from 'xstream/extra/debounce'

import { draw } from './drawer/dom';
import { getAction, stickObstacle, resetState } from './player/action';
import {foldState} from './state'
import {sound} from './sound'

export function App({DOM, Time}) {
    const action$ = getAction(DOM);
    const stickObstacle$ = stickObstacle(DOM);
    const resetState$ = resetState(DOM);
    const moveObstacle$ = Time.periodic(100).map(() => xs.fromArray([40, 0])).flatten();

    const nextObstacleId$ = stickObstacle(DOM).fold((acc, curr) => acc + (curr ? 1 : 0), 1)

    const state$ = xs.combine(action$, stickObstacle$, moveObstacle$, resetState$, nextObstacleId$)
        .compose(foldState)

    return {
        DOM: draw(state$),
        Sound: sound(state$),
    }
}

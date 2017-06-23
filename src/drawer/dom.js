import {div} from '@cycle/dom'

import {foldState} from '../state'

export function draw(game$) {
    return game$
        .compose(foldState)
        .map((state) => {
            if (state.win) {
                return div('.win', 'BIEN OUEJ!!');
            }

            return div([
                div('#player', { style: { left: `${state.playerPosition}px` } }),
                div('#enemy', { style: { left: `${state.enemyPosition}px`} }),
                ...state.obstacles.map(obstacle => div('.obstacle', {
                    style: { left: `${obstacle.x}px`, top: `${obstacle.y}px` }
                }))
            ]);
        })
    ;
}

import {div} from '@cycle/dom'


export function draw(state$) {
    return state$
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

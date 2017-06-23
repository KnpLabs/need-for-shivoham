import {div} from '@cycle/dom'


export function draw(state$) {
    return state$
        .map((state) => {
            if (state.win) {
                return div([
                    div('.win', 'BIEN OUEJ!!'),
                    div('.score', `Score: ${state.score}`),
                ]);
            }

            return div([
                div('#player', { style: { left: `${state.playerPosition}px` } }),
                div('#score', state.score),
                div('#enemy', { style: { left: `${state.enemyPosition}px`} }),
                ...state.obstacles.map(obstacle => div('.obstacle', {
                    key: obstacle.id,
                    style: { left: `${obstacle.x}px`, top: `${obstacle.y}px` }
                }))
            ]);
        })
    ;
}

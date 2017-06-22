import {div} from '@cycle/dom'

import {foldState} from '../state'

export function draw(game$) {
    return game$
        .compose(foldState)
        .map((state) => div([
            div('#player.position-' + state.playerPosition),
            div('#enemy.position-' + state.enemyPosition),
            ...state.obstacles.map(obstacle => div(`.obstacle.position-${obstacle.x}`))
        ]))
}

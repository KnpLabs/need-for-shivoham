import {div} from '@cycle/dom'

import {foldState} from '../state'

<<<<<<< HEAD
export function draw(game$) {
    return game$
        .compose(foldState)
        .map((position) => div([
            div('#player.position-' + position.player),
            div('#enemy', { style: { left: position.enemy + 'px' }}),
            ...state.obstacles.map(obstacle => div(`.obstacle.position-${obstacle.x}`))
        ]))
}

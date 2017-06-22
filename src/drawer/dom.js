import {div} from '@cycle/dom'

import {foldState} from '../state'

export function draw(game$) {
    return game$
        .compose(foldState)
        .map(state => div([
            div(`#player.position-${state.position}`),
            div('#enemy', { style: { left: position.enemy + 'px' }}),
            ...state.obstacles.map(obstacle => div(`.obstacle.position-${obstacle.x}`))
        ]))

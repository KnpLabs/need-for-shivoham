import {div} from '@cycle/dom'

export function draw(game$) {
    return game$
        .fold((acc, [_, action, stickObstacle]) => {
            const position = Math.max(Math.min(11, acc.position + action), 0)

            acc.obstacles.push(stickObstacle ? {x: position} : null)

            return {
                position: position,
                obstacles: acc.obstacles.filter(v => v !== null)
            }
        }, { position: 5, obstacles: []})
        .map(state => div([
             div(`#player.position-${state.position}`),
            ...state.obstacles.map(obstacle => div(`.obstacle.position-${obstacle.x}`))
        ]))
}

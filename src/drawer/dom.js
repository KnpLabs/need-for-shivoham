import {div} from '@cycle/dom'

function moveObstacle(game$) {
    return game$
        .map(([_, action]) => action)
        .filter(action => typeof action === 'number')
        .fold((acc, movement) => acc + movement, 5)
        .map(movement => Math.max(0, movement))
        .map(movement => Math.min(11, movement))
        .map(position => div(`#player.position-${position}`))
    ;
}

function stickObstacle(game$) {

}

export function draw(game) {
    return moveObstacle(game);
}

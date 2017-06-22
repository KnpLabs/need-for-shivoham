import {div} from '@cycle/dom'

export function draw(game) {
    return game
        .fold((acc, [_, action]) => {
            const newAcc = acc + action;
            if (newAcc > 0 && newAcc <= 11) {
                return newAcc;
            }

            return acc;
        }, 5)
        .map((position) => div('#player.position-' + position))
}


function callback(acc, [_, action, stickObstacle]) {
    const position = Math.max(Math.min(11, acc.position + action), 0)

    if (stickObstacle) {
        acc.obstacles.push({x: position})
    }

    return {
        position: position,
        obstacles: acc.obstacles,
    }
}

export function foldState(game$) {
    return game$.fold(callback, { position: 5, obstacles: []})
}

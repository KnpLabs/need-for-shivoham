function callback(acc, [_, action, stickObstacle, enemy]) {
    const playerPosition = Math.max(Math.min(11, acc.playerPosition + action), 0)
    const enemyPosition = Math.max(Math.min(11, acc.enemyPosition + enemy), 0)

    if (stickObstacle) {
        acc.obstacles.push({x: playerPosition})
    }

    return {
        playerPosition,
        enemyPosition,
        obstacles: acc.obstacles,
    };
}

const initialState = {
    playerPosition: 5,
    enemyPosition: 5,
    obstacles: [],
};

export function foldState(game$) {
    return game$.fold(callback, initialState);
}

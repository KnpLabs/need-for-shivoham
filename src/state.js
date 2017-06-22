function callback(acc, [_, action, stickObstacle, enemy]) {
    const playerPosition = Math.max(Math.min(550, acc.playerPosition + action * 50), 0);
    const enemyPosition = Math.max(Math.min(550, acc.enemyPosition + enemy * 50), 0);

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
    playerPosition: 250,
    enemyPosition: 250,
    obstacles: [],
};

export function foldState(game$) {
    return game$.fold(callback, initialState);
}

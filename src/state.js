function callback(acc, [_, action, stickObstacle, moveObstacle, enemy]) {
    const playerPosition = Math.max(Math.min(550, acc.playerPosition + action * 50), 0);

    acc.obstacles = acc.obstacles.map((obstacle) => {
        return Object.assign({}, obstacle, {
            y: obstacle.y + moveObstacle,
        });
    });

    if (stickObstacle) {
        acc.obstacles.push({ x: playerPosition, y: 50 })
    }

    const carDirection = acc
        .obstacles
        .filter(obstacle => obstacle.y === 500 && obstacle.x === acc.enemyPosition)
        .reduce(v => Math.floor(Math.random() * 3) - 1, 0)
    ;

    const enemyPosition = Math.max(Math.min(550, acc.enemyPosition + carDirection * 50), 0);

    const colisions = acc.obstacles.filter((obstacle) => {
        return 550 === obstacle.y && obstacle.x === enemyPosition;
    });

    return {
        playerPosition,
        enemyPosition,
        obstacles: acc.obstacles,
        win: acc.win || colisions.length > 0,
        score: acc.win ? acc.score : acc.score + moveObstacle,
    };
}

const initialState = {
    playerPosition: 250,
    enemyPosition: 250,
    obstacles: [],
    win: false,
    score: 0,
};

export function foldState(game$) {
    return game$.fold(callback, initialState);
}

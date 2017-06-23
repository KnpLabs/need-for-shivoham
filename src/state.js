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
        .filter(obstacle => obstacle.y >= 500 && (obstacle.x >= acc.enemyPosition - 50 || obstacle.x <= acc.enemyPosition + 50))
        .reduce((pos, x, y, obstacles) => {
            let frontObstacle = obstacles.filter(obstacle => obstacle.y === 500 && obstacle.x === acc.enemyPosition).pop();

            if (!frontObstacle) {
                    return 0;
            }

            let newPosition = Math.max(Math.min(550, acc.enemyPosition + 1 * 50), 0);
            let colisions = acc.obstacles.filter((obstacle) => {
                return 550 === obstacle.y && obstacle.x === newPosition;
            });

            return colisions.length ? -1 : 1;
        }, 0)
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

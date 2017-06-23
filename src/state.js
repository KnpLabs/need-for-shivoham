function callback(acc, [action, stickObstacle, moveObstacle, enemy]) {
    const playerPosition = Math.max(Math.min(504, acc.playerPosition + action * 40), 64);
    const enemyPosition = Math.max(Math.min(550, acc.enemyPosition + enemy * 50), 0);

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
        .filter(obstacle => obstacle.y >= 500 && (obstacle.x >= acc.enemyPosition - 40 || obstacle.x <= acc.enemyPosition + 40))
        .reduce((pos, x, y, obstacles) => {
            let frontObstacle = obstacles.filter(obstacle => obstacle.y === 500 && obstacle.x === acc.enemyPosition).pop();

            if (!frontObstacle) {
                    return 0;
            }

            let newPosition = Math.max(Math.min(504, acc.enemyPosition + 1 * 40), 64);
            let colisions = acc.obstacles.filter((obstacle) => {
                return 550 === obstacle.y && obstacle.x === newPosition;
            });

            return colisions.length ? -1 : 1;
        }, 0)
    ;

    const enemyPosition = Math.max(Math.min(504, acc.enemyPosition + carDirection * 40), 64);

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
    playerPosition: 264,
    enemyPosition: 264,
    obstacles: [],
    win: false,
    score: 0,
};

export function foldState(game$) {
    return game$.fold(callback, initialState);
}

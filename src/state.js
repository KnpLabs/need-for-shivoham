
const initialState = {
    playerPosition: 264,
    enemyPosition: 264,
    obstacles: [],
    win: false,
    score: 0,
    nextObstacleId: 1,
};

function callback(acc, [action, stickObstacle, moveObstacle, enemy, resetState]) {
    if (resetState) {
        return initialState;
    }
    const minX = 64;
    const maxX = 504;
    const maxY = 550;
    const trackWidth = 40;
    const playerPosition = Math.max(Math.min(maxX, acc.playerPosition + action * trackWidth), minX);

    const obstacles = acc.obstacles.map((obstacle) => Object.assign({}, obstacle, {
        y: obstacle.y + moveObstacle,
    }))

    if (!acc.win && stickObstacle) {
        obstacles.push({ x: playerPosition, y: 50, id: acc.nextObstacleId })
    }

    const carDirection = obstacles
        .filter(obstacle => obstacle.y >= 500 && (obstacle.x >= acc.enemyPosition - trackWidth || obstacle.x <= acc.enemyPosition + trackWidth))
        .reduce((pos, x, y, obstacles) => {
            let frontObstacle = obstacles.filter(obstacle => obstacle.y >= 500 && obstacle.x === acc.enemyPosition).pop();

            if (!frontObstacle) {
                return 0;
            }

            let newPosition = Math.max(Math.min(maxX, acc.enemyPosition + 1 * trackWidth), minX);
            let collisions = obstacles.filter((obstacle) => {
                return maxY <= obstacle.y && obstacle.x === newPosition;
            });

            return collisions.length ? -1 : 1;
        }, 0)
    ;

    const enemyPosition = Math.max(Math.min(maxX, acc.enemyPosition + carDirection * trackWidth), minX);

    const collisions = obstacles.filter((obstacle) => {
        return maxY <= obstacle.y && obstacle.x === enemyPosition;
    });

    return {
        playerPosition,
        enemyPosition,
        obstacles: obstacles.filter(o => o.y <= 600),
        win: acc.win || collisions.length > 0,
        score: acc.win ? acc.score : acc.score + moveObstacle,
        nextObstacleId: acc.nextObstacleId + 1,
    };
}

export function foldState(game$) {
    return game$.fold(callback, initialState);
}

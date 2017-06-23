export function enemyPosition(currentObstacles, currentPosition) {
    const trackWidth = 40;
    const minX = 64;
    const maxX = 504;
    const maxY = 550;

    const carDirection = currentObstacles
        .filter(obstacle => obstacle.y >= 500 && (obstacle.x >= currentPosition - trackWidth || obstacle.x <= currentPosition + trackWidth))
    ;

    carDirection
        .reduce((pos, x, y, obstacles) => {
            let frontObstacle = obstacles.filter(obstacle => obstacle.y >= 500 && obstacle.x === currentPosition).pop();

            if (!frontObstacle) {
                return 0;
            }

            let newPosition = Math.max(Math.min(maxX, currentPosition + 1 * trackWidth), minX);
            let collisions = obstacles.filter((obstacle) => {
                return maxY <= obstacle.y && obstacle.x === newPosition;
            });

            return collisions.length ? -1 : 1;
        }, 0)
    ;

    return Math.max(Math.min(maxX, currentPosition + carDirection * trackWidth), minX);
}

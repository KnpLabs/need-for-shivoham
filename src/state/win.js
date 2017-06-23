export function win(currentEnemyPosition, currentObstacles) {
    const maxY = 550;

    return currentObstacles.filter((obstacle) => {
        return maxY <= obstacle.y && obstacle.x === currentEnemyPosition;
    }).length > 0;
}

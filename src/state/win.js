export function win(currentEnemyPosition, currentObstacles) {
    const maxY = 550;

    return currentObstacles.filter((obstacle) => {
        return maxY <= obstacle.y && obstacle.x === currentEnemyPosition;
    }).length > 0;
}
export function win2(game$) {
    return game$.fold((acc, [action, stickObstacle, moveObstacle, enemy, resetState, nextObstacleId]) => {
        const maxY = 550;

        return obstacles.filter((obstacle) => {
            return maxY <= obstacle.y && obstacle.x === enemyPosition;
        });
    }, false);
}

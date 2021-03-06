export function obstacles(moveObstacle, nextObstacleId, stickObstacle, currentPlayerPosition, currentObstacles) {
    const obstacles = currentObstacles.map(obstacle => Object.assign({}, obstacle, {
        y: obstacle.y + moveObstacle,
    }))

    if (stickObstacle) {
        obstacles.push({ x: currentPlayerPosition, y: 50, id: nextObstacleId })
    }

    return obstacles.filter(o => o.y <= 600);
}

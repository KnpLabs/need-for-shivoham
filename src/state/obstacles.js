export function obstacles(moveObstacle, nextObstacleId, stickObstacle, currentPlayerPosition, currentObstacles) {
    const obstacles = currentObstacles.map((obstacle) => Object.assign({}, obstacle, {
        y: obstacle.y + moveObstacle,
    }))

    if (stickObstacle) {
        obstacles.push({ x: currentPlayerPosition, y: 50, id: nextObstacleId })
    }

    return obstacles.filter(o => o.y <= 600);
}

export function obstacles2(game$) {
    return game$.fold((acc, [action, stickObstacle, moveObstacle, enemy, resetState, nextObstacleId]) => {
        const obstacles = acc.map((obstacle) => Object.assign({}, obstacle, {
            y: obstacle.y + moveObstacle,
        }))

        if (stickObstacle) {
            obstacles.push({ x: playerPosition, y: 50, id: nextObstacleId })
        }

        return obstacles.filter(o => o.y <= 100);
    }, []);
}

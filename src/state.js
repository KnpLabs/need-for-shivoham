import xs from 'xstream'
import { playerPosition } from './state/player-position';
import { enemyPosition } from './state/enemy-position';
import { obstacles } from './state/obstacles';
import { win } from './state/win';

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
    return game$
        .fold((acc, [action, stickObstacle, moveObstacle, enemyMovement, resetState, nextObstacleId]) => {
            return Object.assign({}, acc, {
                playerPosition: playerPosition(action, acc.playerPosition),
                enemyPosition: enemyPosition(acc.obstacles, acc.enemyPosition),
                obstacles: obstacles(moveObstacle, nextObstacleId, stickObstacle, acc.playerPosition, acc.obstacles),
                win: win(acc.enemyPosition, acc.obstacles)
            });
        }, initialState)
        .debug();
}

import xs from 'xstream'
import { playerPosition } from './state/player-position';
import { enemyPosition } from './state/enemy-position';
import { obstacles } from './state/obstacles';
import { win } from './state/win';
import { score } from './state/score';

const initialState = {
    playerPosition: 264,
    enemyPosition: 264,
    obstacles: [],
    win: false,
    score: 0,
    nextObstacleId: 1,
    isSoundPlaying: false,
};

export function foldState(game$) {
    return game$
        .fold((acc, [action, stickObstacle, moveObstacle, resetState, nextObstacleId]) => {
            if (resetState) {
                return initialState;
            }
            const state = Object.assign({}, acc, {
                playerPosition: playerPosition(action, acc.playerPosition),
                enemyPosition: enemyPosition(acc.obstacles, acc.enemyPosition),
                obstacles: obstacles(moveObstacle, nextObstacleId, stickObstacle, acc.playerPosition, acc.obstacles),
                win: acc.win || win(acc.enemyPosition, acc.obstacles),
                score: acc.win ? acc.score : score(acc.score),
                isSoundPlaying: acc.obstacles.length > 0,
            });

            return state;
        }, initialState);
}

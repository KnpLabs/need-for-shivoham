
export function sound(state$) {
    return doppler(state$);
}

function doppler(state$) {
    return state$.map(state => {
        if (state.isSoundPlaying) {
            return [];
        }
        return state.obstacles.map(obstacle => {
            return new Audio('sound/doppler.mp3')
        })
    })
}

function carLeft(state$) {
    return state$.map(state => {
        if (state.isSoundPlaying['carLeft']) {
            return [];
        }
        return state.obstacles.map(obstacle => {
            return new Audio('sound/carLeft.wav')
        })
    })
}

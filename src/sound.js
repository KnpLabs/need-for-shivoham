
export function sound() {

}

function doppler(state$) {
    return state$.map(state => {
        if (state.isSoundPlaying['doppler']) {
            return [];
        }
        return state.obstacles.map(obstacle => {
            return new Audio('sound/doppler.wav')
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

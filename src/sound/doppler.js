
export function doppler(state$) {
    return state$.map(state => {
        if (state.isSoundPlaying['doppler']) {
            return [];
        }
        return state.obstacles.map(obstacle => {
            return new Audio('sound/doppler.wav')
        })
    })
}

export function carLeft(state$) {
    return state$.map(state => {
        if (state.isSoundPlaying['carLeft']) {
            return [];
        }
        return state.obstacles.map(obstacle => {
            return new Audio('sound/carLeft.wav')
        })
    })
}

export function doppler2(state$) {
    return state$.map(state => {
        return state.obstacles.filter(obstacle => obstacle.y < 500).map(obstacle => {
            return [
                {
                    frequency: 750,
                    start: 0,
                    stop: 2,
                },
                {
                    frequency: 440,
                    start: 2,
                    stop: 4,
                }
            ]
        }).reduce((acc, curr) => acc.concat(curr), [])
    })
}

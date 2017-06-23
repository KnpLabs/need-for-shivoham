
export function doppler(state$) {
    return state$.map(state => {
        return state.obstacles.filter(obstacle => obstacle.y < 500).map(obstacle => {
            return new Audio('sound/doppler.wav')
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

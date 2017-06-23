import {rect, text, polygon} from 'cycle-canvas';

export function draw(game) {
    return game
        .fold((acc, [action]) => acc + 50 * action, 10)
        .map((position) => rect({draw: [{fill: 'skyblue'}]}, [
            text({x: position, y: 10, value: `salut`}),
        ]))
    ;
}

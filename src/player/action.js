import xs from 'xstream'

export function stickObstacle(DOM) {
    const keyDown$ = DOM.select('document').events('keydown')

    return keyDown$.filter(ev => ev.keyCode === 32).mapTo('stick').startWith(0)
        .map(direction => xs.fromArray([direction, 0]))
        .flatten();
}

export function getAction(DOM) {
    const keyDown$ = DOM.select('document').events('keydown');
    const keyLeft$ = keyDown$.filter(ev => ev.keyCode === 37).mapTo(-1).startWith(0);
    const keyRight$ = keyDown$.filter(ev => ev.keyCode === 39).mapTo(1).startWith(0);

    return xs.merge(keyLeft$, keyRight$)
        .map(direction => xs.fromArray([direction, 0]))
        .flatten()
    ;
}

import xs from 'xstream'
import isolate from '@cycle/isolate'
import {div} from '@cycle/dom'
import { Shivoham } from './component/shivoham';
import { Obstacles } from './component/obstacles';

import { draw } from './drawer/dom';
import { getAction, stickObstacle, resetState } from './player/action';
import {foldState} from './state'
import {sound} from './sound'

export function App(sources) {
    const shivoham = isolate(Shivoham)(sources);
    const obstacles = isolate(Obstacles)(sources);

    return {
        DOM: obstacles.DOM
    };


    return {
        DOM: vdom$
    };
}

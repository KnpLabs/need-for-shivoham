import {run} from '@cycle/run'
import {timeDriver} from '@cycle/time';
import {makeDOMDriver} from '@cycle/dom'
import {makeCanvasDriver} from 'cycle-canvas';
import {App} from './app'

run(App, {
    Time: timeDriver,
    Canvas: makeCanvasDriver('#game'),
    DOM: makeDOMDriver('#app')
})

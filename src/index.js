import {run} from '@cycle/run'
import {timeDriver} from '@cycle/time';
import {makeDOMDriver} from '@cycle/dom'
import {soundDriver} from './driver/sound';
import {App} from './app'

run(App, {
    Time: timeDriver,
    DOM: makeDOMDriver('#app'),
    Sound: soundDriver,
})

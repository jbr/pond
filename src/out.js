/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import Collector from "./collector";

export class EventOut {

    constructor(pipeline, options, callback) {
        this._callback = callback;
    }

    addEvent(event) {
        if (this._callback) {
            this._callback(event);
        }
    }

    onEmit(cb) {
        this._callback = cb;
    }
    
    done() {
    }
}

export class ConsoleOut {

    constructor(observer) {
        this._observer = observer;
    }

    /**
     * Add an event will add a key to the event and then emit the
     * event with that key.
     */
    addEvent(event) {
        console.log("OUT:", event.toString()); //eslint-disable-line
    }

    onEmit(observer) {
        this._callback = observer;
    }
}

export class CollectionOut {

    constructor(pipeline, options, callback) {
        this._callback = callback;
        this._collector = new Collector({
            windowType: pipeline.getWindowType(),
            windowDuration: pipeline.getWindowDuration(),
            groupBy: pipeline.getGroupBy(),
            emitOn: pipeline.getEmitOn()
        }, (collection, windowKey) => this._callback(collection, windowKey));
    }

    addEvent(event) {
        this._collector.addEvent(event);
    }

    onEmit(cb) {
        this._callback = cb;
    }
    
    done() {
    }
}

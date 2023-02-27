
export class EventBridge {

    mainCallback = null;

    inEvents = new Map();
    outEvents = new Map();

    inEventListeners = new Map();
    outEventListeners = new Map();

    //

    addInEventListener ( eventName, callback ) {

        let eventListeners = this.inEventListeners.get( eventName );

        if ( ! eventListeners ) {

            eventListeners = new Set();
            this.inEventListeners.set( eventName, eventListeners );

        }

        eventListeners.add( callback );

    };

    removeInEventListener ( eventName, callback ) {

        const eventListeners = this.inEventListeners.get( eventName );

        if ( eventListeners ) {

            eventListeners.delete( callback );

        }

    };

    pushInEvent ( eventName, params ) {

        let inEvents = this.inEvents.get( eventName );

        if ( ! inEvents ) {

            inEvents = new Set();
            this.inEvents.set( eventName, inEvents );

        }

        inEvents.add( params );

    };

    //

    addOutEventListener ( eventName, callback ) {

        let eventListeners = this.outEventListeners.get( eventName );

        if ( ! eventListeners ) {

            eventListeners = new Set();
            this.outEventListeners.set( eventName, eventListeners );

        }

        eventListeners.add( callback );

    };

    removeOutEventListener ( eventName, callback ) {

        const eventListeners = this.outEventListeners.get( eventName );

        if ( eventListeners ) {

            eventListeners.delete( callback );

        }

    };

    pushOutEvent ( eventName, params ) {

        let outEvents = this.outEvents.get( eventName );

        if ( ! outEvents ) {

            outEvents = new Set();
            this.outEvents.set( eventName, outEvents );

        }

        outEvents.add( params );

    };

    //

    processEvents () {

        // process out events

        this.outEvents.forEach( ( paramsList, eventName ) => {

            const eventListeners = this.outEventListeners.get( eventName );

            if ( eventListeners && eventListeners.size ) {

                paramsList.forEach( ( params ) => {

                    eventListeners.forEach( ( listener ) => {

                        listener( params );

                    });

                });

            }

        });

        this.outEvents.clear();

        // process in events

        this.inEvents.forEach( ( paramsList, eventName ) => {

            const eventListeners = this.inEventListeners.get( eventName );

            if ( eventListeners && eventListeners.size ) {

                paramsList.forEach( ( params ) => {

                    eventListeners.forEach( ( listener ) => {

                        listener( params );

                    });

                });

            }

        });

        this.inEvents.clear();

    };

};

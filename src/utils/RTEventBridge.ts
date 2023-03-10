
type Callback = ( params: any ) => void;

//

export class RTEventBridge {

    private reactEventsQueue: Map<string, Set<Callback> > = new Map();
    private reactEventListeners: Map<string, Set<Callback> > = new Map();

    private gfxEventsQueue: Map<string, Set<Callback> > = new Map();
    private gfxEventListeners: Map<string, Set<Callback> > = new Map();

    //

    public clear () : void {

        this.reactEventsQueue.clear();
        this.reactEventListeners.clear();

        this.gfxEventsQueue.clear();
        this.gfxEventListeners.clear();

    };

    public onReactEvent ( eventName: string, callback: Callback ) : void {

        let listeners = this.reactEventListeners.get( eventName );

        if ( ! listeners ) {

            listeners = new Set();
            this.reactEventListeners.set( eventName, listeners );

        }

        listeners.add( callback );

    };

    public removeReactEventListener ( eventName: string, callback: Callback ) : void {

        const listeners = this.reactEventListeners.get( eventName );

        if ( listeners ) {

            listeners.delete( callback );

            if ( ! listeners.size ) {

                this.gfxEventListeners.delete( eventName );

            }

        }

    };

    public dispatchToGfx ( eventName: string, params: any ) : void {

        let reactEvents = this.reactEventsQueue.get( eventName );

        if ( ! reactEvents ) {

            reactEvents = new Set();
            this.reactEventsQueue.set( eventName, reactEvents );

        }

        reactEvents.add( params );

    };

    //

    public onGfxEvent ( eventName: string, callback: Callback ) : void {

        let listeners = this.gfxEventListeners.get( eventName );

        if ( ! listeners ) {

            listeners = new Set();
            this.gfxEventListeners.set( eventName, listeners );

        }

        listeners.add( callback );

    };

    public removeGfxEventListener ( eventName: string, callback: Callback ) : void {

        const listeners = this.gfxEventListeners.get( eventName );

        if ( listeners ) {

            listeners.delete( callback );

            if ( ! listeners.size ) {

                this.gfxEventListeners.delete( eventName );

            }

        }

    };

    public dispatchToReact ( eventName: string, params: any ) : void {

        let gfxEvents = this.gfxEventsQueue.get( eventName );

        if ( ! gfxEvents ) {

            gfxEvents = new Set();
            this.gfxEventsQueue.set( eventName, gfxEvents );

        }

        gfxEvents.add( params );

    };

    //

    public processEvents () : void {

        // process events sent to gfx

        this.gfxEventsQueue.forEach( ( paramsList, eventName ) => {

            const listeners = this.gfxEventListeners.get( eventName );

            if ( listeners && listeners.size ) {

                paramsList.forEach( ( params ) => {

                    listeners.forEach( ( listener ) => {

                        listener( params );

                    });

                });

            }

        });

        this.gfxEventsQueue.clear();

        // process events sent to react

        this.reactEventsQueue.forEach( ( paramsList, eventName ) => {

            const listeners = this.reactEventListeners.get( eventName );

            if ( listeners && listeners.size ) {

                paramsList.forEach( ( params ) => {

                    listeners.forEach( ( listener ) => {

                        listener( params );

                    });

                });

            }

        });

        this.reactEventsQueue.clear();

    };

};

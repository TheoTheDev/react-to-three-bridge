# react-to-three-bridge

Basic example of connecting 'Standard three app' [not react-fiber like] and 'react'.

It's done via RT-Event-Bridge util script which passes events from react to three and visa-versa.
```typescript
// First create a rt-event-bridge [probably you would like to add it to global context or smth].
const rtBridge = new RTEventBridge();

// Then you probably create your three-app
const threeApp = new ThreeApp( rtBridge ); // and pass the bridge to the app to store [and use when needed].
```

IN REACT APP:

```typescript
// To send event to three-app from react use:
rtBridge.dispatchToGfx( 'EventName', { anyParams } );

// To listen for events from three-app
rtBridge.onGfxEvent( 'EventName', callback );

// And remove
rtBridge.removeGfxEventListener( 'EventName', sameCallbackFn );
```

IN THREE APP:

```typescript
// To send events to react-app from three use:
rtBridge.dispatchToReact( 'EventName', { anyParams } );

// To listen for events from react-app
rtBridge.onReactEvent( 'EventName', callback );

// And remove
rtBridge.removeReactEventListener( 'EventName', sameCallbackFn );

// call each render loop to process the events queue
rtBridge.processEvents();

```

General:

```typescript
// To clear all events and listeners
rtBridge.clear();
```

--- To run the test app ---

Clone the repo and then:

```sh
npm install
npm run start
```

THE END. Thanks.

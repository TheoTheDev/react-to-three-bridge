
import React, { useState, useEffect, createContext, useCallback } from 'react';

import { WorldContainer } from '../gfx/WorldContainer.js';

import { FrameNum } from './FrameNum';
import { UIButtonBlock, Button } from './UIButtonBlock.js';

//

const GlobalContext = createContext();

export const ReactApp = () => {

    const [ worldContainerApp, setWorldContainerApp ] = useState( null );

    const [ color, setColor ] = useState( 0x000000 );
    const [ frameNum, setFrameNum ] = useState( 0 );

    // update frame callback

    const updateFrame = useCallback( ( params ) => {

        setFrameNum( 'Frame ' + params.frame );

    }, [] );

    // add / remove event listeres to threeJS World container for frame update

    const pauseFrameUpdate = () => {

        worldContainerApp.eventBridge.removeOutEventListener( 'UpdateFrame', updateFrame );

    };

    const resumeFrameUpdate = () => {

        worldContainerApp.eventBridge.addOutEventListener( 'UpdateFrame', updateFrame );

    };

    // create threeJS world container

    useEffect( () => {

        const container = new WorldContainer();
        setWorldContainerApp( container );

        container.eventBridge.addOutEventListener( 'UpdateFrame', updateFrame );

    }, [ updateFrame ] );

    // when color prop updated add a new event to threeJS world container to queue

    useEffect( () => {

        if ( worldContainerApp ) {

            worldContainerApp.eventBridge.pushInEvent( 'SetColor', { color } );

        }

    }, [ worldContainerApp, color ] );

    //

    return (
        <GlobalContext.Provider value={ worldContainerApp }>
            <div className="threejs" id="threejs"></div>
            <div className="container">
                <div className="ui">
                    <UIButtonBlock setColor={ setColor }></UIButtonBlock>
                    <Button onClick={ pauseFrameUpdate }>Pause frame update</Button>
                    <Button onClick={ resumeFrameUpdate }>Resume frame update</Button>
                    <FrameNum value={ frameNum } ></FrameNum>
                </div>
            </div>
        </GlobalContext.Provider>
    );

};


import React, { useState, useEffect, createContext, useCallback } from 'react';

import { SceneParams } from './SceneParams';
import { UIButtonBlock, Button } from './UIButtonBlock';

import { RTEventBridge } from '../utils/RTEventBridge';
import { WorldContainer } from '../gfx/WorldContainer';

//

const GlobalContext = createContext( null );

export const ReactApp = () => {

    const [ worldContainerApp, setWorldContainerApp ] = useState( null );
    const [ rtBridge, setRtBridge ]: [ RTEventBridge, ( value: RTEventBridge ) => void ] = useState( null );

    const [ color, setColor ] = useState( 0xff5555 );
    const [ frameNum, setFrameNum ] = useState( 0 );
    const [ cameraPosition, setCameraPosition ] = useState([ 0, 0, 0 ]);

    // events callbacks

    const updateFrame = useCallback( ( params: { frame: number } ) => {

        setFrameNum( params.frame );

    }, [] );

    const updateCameraPosition = useCallback( ( params: { x: number, y: number, z: number } ) => {

        setCameraPosition([ params.x, params.y, params.z ]);

    }, [] );

    // add / remove event listeres to threeJS World container for frame update

    const pauseFrameUpdate = () => {

        rtBridge.removeGfxEventListener( 'FrameUpdate', updateFrame );

    };

    const resumeFrameUpdate = () => {

        rtBridge.onGfxEvent( 'FrameUpdate', updateFrame );

    };

    // create threeJS world container

    useEffect( () => {

        const rtBridge = new RTEventBridge();
        const container = new WorldContainer( rtBridge );

        setWorldContainerApp( container );
        setRtBridge( rtBridge );

        rtBridge.onGfxEvent( 'FrameUpdate', updateFrame );
        rtBridge.onGfxEvent( 'CameraPositionUpdate', updateCameraPosition );

    }, [ updateFrame, updateCameraPosition ] );

    // when color prop updated add a new event to threeJS world container to queue

    useEffect( () => {

        if ( worldContainerApp ) {

            rtBridge.dispatchToGfx( 'SetColor', { color } );

        }

    }, [ worldContainerApp, color ] );

    //

    return (
        <GlobalContext.Provider value={ worldContainerApp }>
            <div className="container">
                <UIButtonBlock setColor={ setColor }></UIButtonBlock>
                <Button onClick={ pauseFrameUpdate }>Pause frame update</Button>
                <Button onClick={ resumeFrameUpdate }>Resume frame update</Button>
                <SceneParams frame={ frameNum } cameraPosition={ cameraPosition } />
                <canvas id="renderport" />
            </div>
        </GlobalContext.Provider>
    );

};

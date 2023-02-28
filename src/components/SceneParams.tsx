
import React from 'react';

//

export const SceneParams = ( { frame, cameraPosition }: { frame: number, cameraPosition: number[] } ) => {

    return (
        <>
            <div>
                Frame { frame }<br/>
                Camera pos x: { cameraPosition[0].toFixed( 2 ) } y: { cameraPosition[1].toFixed( 2 ) } z: { cameraPosition[2].toFixed( 2 ) }
            </div>
        </>
    );

};

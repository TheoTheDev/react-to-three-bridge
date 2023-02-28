
import React from 'react';
import styled from "styled-components";

//

const theme = {
    blue: {
        default: "#3f51b5",
        hover: "#283593"
    },
    pink: {
        default: "#e91e63",
        hover: "#ad1457"
    }
};

export const Button = styled.button`
    background-color: ${ ( props: { theme: 'blue' | 'pink' } ) => theme[ props.theme ].default };
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
        background-color: ${ ( props: { theme: 'blue' | 'pink' } ) => theme[ props.theme ].hover };
    }
    &:disabled {
        cursor: default;
        opacity: 0.7;
    }
`;

Button.defaultProps = {
    theme: 'blue'
};

//

export const UIButtonBlock = ( { setColor }: { setColor: ( value: number ) => void } ) => {

    const colors = [ 0xff0000, 0x00ff00, 0x0000ff ];

    const setRedColor = () => {

        setColor( 0xff0000 );

    };

    const setGreenColor = () => {

        setColor( 0x00ff00 );

    };

    const setRandomColor = () => {

        setColor( colors[ Math.floor( Math.random() * colors.length ) ] );

    };

    //

    return (
        <>
            <Button onClick={ setRedColor } >Red</Button>
            <Button onClick={ setGreenColor } >Green</Button>
            <Button onClick={ setRandomColor } >Random</Button>
        </>
    );

};

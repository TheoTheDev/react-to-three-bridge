
import React from 'react';
import ReactDOM from 'react-dom';

import { ReactApp } from './components/ReactApp';

//

window.onload = () => {

    const rootElement = document.getElementById('root');

    ReactDOM.render(
        <React.StrictMode>
            <ReactApp />
        </React.StrictMode>,
        rootElement
    );

};

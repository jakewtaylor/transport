import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import { ThemeProvider } from './components/Theme';

import './reset.css';

render((
    <React.StrictMode>
        <ThemeProvider>
            {changeTheme => (
                <App changeTheme={changeTheme} />
            )}
        </ThemeProvider>
    </React.StrictMode>
), document.getElementById('root'));

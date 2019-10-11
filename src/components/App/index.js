import React, { Component } from 'react';
import { css } from 'aphrodite';

import { Themer } from '../Theme';
import { Form } from '../Form';

import styleGetter from './styles'

export class App extends Component {
    render() {
        return (
            <Themer styles={styleGetter}>
                {styles => (
                    <div className={css(styles.container)}>
                        <Form />
                    </div>
                )}
            </Themer>
        );
    }
}

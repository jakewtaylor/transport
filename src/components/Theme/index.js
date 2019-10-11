import React, { Component, createContext } from 'react';
import * as themes from '../../config/themes';
import shadows from '../../config/shadows';
import { has } from '../../helpers';

const Context = createContext();

export class ThemeProvider extends Component {
    state = themes.blue;

    changeTheme = theme => {
        if (has(themes)(theme)) {
            this.setState(themes[theme]);
        } else {
            throw new Error(`Invalid theme '${theme}' supplied!`);
        }
    }

    render () {
        return (
            <Context.Provider value={this.state}>
                {this.props.children(this.changeTheme)}
            </Context.Provider>
        );
    }
}

export const ThemeConsumer = Context.Consumer;

export class Themer extends Component {
    render () {
        const { children, styles: getStyles } = this.props;

        return (
            <ThemeConsumer>
                {(theme) => {
                    const styles = getStyles(theme, shadows);
                    return children(styles);
                }}
            </ThemeConsumer>
        );
    }
}

import React, { Component } from 'react';
import { css } from 'aphrodite';

import { Themer } from '../Theme';

import getStyles from './styles';
import { StationPicker } from './components/StationPicker';

export class Form extends Component {
    state = {
        from: '',
        fromStation: null,
        to: '',
        toStation: null,
    }

    handleFromChange = from => this.setState({ from });

    handleToChange = to => this.setState({ to });

    handleFromStationPicked = (station) => {
        this.setState({
            from: `${station.code} - ${station.name}`,
            fromStation: station.code,
        });
    }

    handleToStationPicked = (station) => {
        this.setState({
            to: `${station.code} - ${station.name}`,
            toStation: station.code,
        });
    }

    render () {
        const { from, to } = this.state;

        return (
            <Themer styles={getStyles}>
                {styles => (
                    <form className={css(styles.form)}>
                        <StationPicker
                            name="from"
                            label="From"
                            value={from}
                            onChange={this.handleFromChange}
                            stationPicked={this.handleFromStationPicked}
                            styles={styles}
                        />

                        <StationPicker
                            name="to"
                            label="To"
                            value={to}
                            onChange={this.handleToChange}
                            stationPicked={this.handleToStationPicked}
                            styles={styles}
                        />

                        <input type="submit" value="Go" className={css(styles.submit)} />
                    </form>
                )}
            </Themer>
        );
    }
}

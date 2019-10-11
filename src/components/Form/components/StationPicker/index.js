import React, { Component, createRef } from 'react';
import { css } from 'aphrodite';

import { Themer } from '../../../Theme';
import { findStations } from '../../../../logic/stationFinder';

import getStyles from './styles';

export class StationPicker extends Component {
    state = {
        focused: false,
        searchResults: null,
        highlighted: null,
        hasPicked: false,
        hovering: false,
    }

    label = createRef();
    input = createRef();

    handleFocus = () => this.setState({ focused: true });

    handleBlur = () => {
        if (!this.state.hovering) {
            this.setState({ focused: false });
        }
    }

    handleChange = (e) => {
        const { value } = e.target;

        this.props.onChange(value);

        findStations(value)
            .then((stations) => {
                this.setState({
                    searchResults: stations,
                    highlighted: stations ? 0 : null,
                });
            });
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const station = this.state.searchResults[this.state.highlighted];

            this.handleStationClick(station)();
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const isUp = e.key === 'ArrowUp';

            this.setState(prev => {
                const isAtBottom = prev.highlighted === prev.searchResults.length - 1;
                const isAtTop = prev.highlighted === 0;

                if (isAtTop && isUp) {
                    return { highlighted: prev.searchResults.length - 1 };
                }

                if (isAtBottom && !isUp) {
                    return { highlighted: 0 };
                }

                return { highlighted: prev.highlighted + (isUp ? -1 : 1) };
            });
        } else if (e.key === 'Backspace') {
            if (this.state.hasPicked) {
                this.props.onChange('');
                this.setState({
                    hasPicked: false,
                    searchResults: null,
                });
            }
        }
    }

    handleStationClick = station => (e = null) => {
        if (e) {
            e.preventDefault();
        }

        this.props.stationPicked(station);
        this.setState({ focused: false, hasPicked: true });

        if (this.input.current) {
            this.input.current.blur();
        }
    }

    handleHover = i => e => {
        this.setState({ highlighted: i, hovering: true });
    }

    handleUnhover = e => this.setState({ hovering: false });

    renderSuggestions (styles) {
        const { searchResults, highlighted } = this.state;

        if (!searchResults) {
            return <p className={css(styles.suggestion)}>Continue typing to find stations...</p>
        }

        if (searchResults.length < 1) {
            return <p className={css(styles.suggestion)}>No stations found.</p>
        }

        return searchResults.map((station, i) => (
            <p
                key={station.code}
                className={css(styles.suggestion, styles.suggestion__clickable, i === highlighted ? styles.suggestion__highlighted : null)}
                onClick={this.handleStationClick(station)}
                onMouseOver={this.handleHover(i)}
                onMouseLeave={this.handleUnhover}
            >
                {station.code} - {station.name}
            </p>
        ));
    }

    render () {
        const { name, label, value } = this.props;
        const { focused } = this.state;

        const labelWidth = this.label.current ? this.label.current.offsetWidth : 0;

        return (
            <Themer styles={getStyles(labelWidth)}>
                {styles => (
                    <div className={css(styles.container)}>
                        <label htmlFor={name} className={css(styles.label)} ref={this.label}>
                            {label}
                        </label>
                        <input
                            ref={this.input}
                            autoComplete="off"
                            type="text"
                            id={name}
                            name={name}
                            value={value}
                            className={css(styles.input)}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            onKeyDown={this.handleKeyDown}
                        />

                        {focused && (
                            <div className={css(styles.suggestions)}>
                                {this.renderSuggestions(styles)}
                            </div>
                        )}
                    </div>
                )}
            </Themer>

        );
    }
}

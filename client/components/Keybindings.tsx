import React from 'react'

export type Props = {};
export type State = {};

export class Keybindings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    state =  {};

    render() {
        return ( 
            <div id="keybindings" className="overlay position-absolute top-0 start-0 mt-2 ms-2">
                <small className="keybinding me-1">W</small>
                <small className="keybinding me-1">A</small>
                <small className="keybinding me-1">S</small>
                <small className="keybinding me-1">D</small>
                <small className="text-uppercase ms-1">Move</small>
            </div>
        );
    }
}

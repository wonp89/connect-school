import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

class WaypointReaveal extends Component {
    state = {
        isInView: false
    }
    onEnter = this.onEnter.bind(this)

    onEnter({previousPosition}) {
        if (previousPosition === Waypoint.below) {
            this.setState({isInView: true})
        }
    }

    render() {
        return (
            <div>
                <Waypoint onEnter={this.onEnter}></Waypoint>
                {this.props.children({ isInView: this.state.isInView })}
            </div>
        )
    }
}


export default WaypointReaveal;
import React, { Component } from 'react';
import '../assets/css/Welcome.css';
// import { Parallax } from 'react-materialize';
// import $ from 'jquery';
import Aux from './aux/Aux'

//images
import WaypointReaveal from './waypointReveal/WaypointReveal';
import { FirstContent, MiddleContent, LastContent } from './welcomeContent/WelcomeContent';

class Welcome extends Component {

    componentDidMount() {
        window.$(document).ready(function () {
            window.$('.parallax').parallax();
        });
    }

    render() {
        return (
            <div>
                <div class="parallax-container first-parallax">
                    <FirstContent />
                </div>
                <div className="section">
                    <div className="row container header-container">
                        <WaypointReaveal>
                            {({ isInView }) => <MiddleContent show={isInView} />}
                        </WaypointReaveal>
                    </div>
                </div>
                <div class="parallax-container second-parallax">
                    <div class="container">
                        <WaypointReaveal>
                            {({ isInView }) => <LastContent show={isInView} />}
                        </WaypointReaveal>
                    </div>
                </div>
            </div >
        )
    }
}

export default Welcome;
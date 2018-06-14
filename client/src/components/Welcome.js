import React, { Component } from 'react';
import '../assets/css/Welcome.css';
import { Parallax } from 'react-materialize'
import $ from 'jquery';

//images
import studentMeetingImage from "../assets/images/studentMeeting.jpg";
import welcomeBackgroundImage from "../assets/images/welcomeBackground.jpg";
import createImage from "../assets/images/create.png";
import statusImage from "../assets/images/status.png";
import connectionsImage from "../assets/images/connections.png";

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
                    <h4 id="first-heading">
                        <h5>Networking is difficult..</h5>
                        When one door closes, another opens, but we often look so long and so regretfully upon the closed door that we do not see the one which has opened for us.</h4>
                    <div class="parallax">
                        <img src={welcomeBackgroundImage} />
                    </div>
                </div>
                <div className="section">
                    <div className="row container header-container">
                        <h1 className="header header-text">
                            <span id="welcome-heading">WELECOME TO</span>
                            <span id="connect-school-heading"> CONNECT SCHOOL</span>
                        </h1>
                        <h5 className="header-paragraph">Education is not just about going to school and getting a degree. We don't stop going to school when we graduate. You have to stay in school.</h5>
                        <h5 className="header-paragraph">Join any school events and meet new people. Connect School will help you.</h5>
                    </div>
                </div>
                <div class="parallax-container second-parallax">
                    <div class="container">
                        <div class="row icons-container">
                            <div class="col s4 center-align">
                                <img className="icon-images" src={createImage} />
                                <h5 class="icon-text">Create your events</h5>
                            </div>
                            <div class="col s4 center-align">
                                <img className="icon-images" src={statusImage} />
                                <h5 class="icon-text">Check your event status</h5>
                            </div>
                            <div class="col s4 center-align">
                                <img className="icon-images" src={connectionsImage} />
                                <h5 class="icon-text">Make connections</h5>
                            </div>
                            <div class="parallax"><img src={studentMeetingImage} /></div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Welcome;
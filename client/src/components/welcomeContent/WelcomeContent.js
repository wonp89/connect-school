import React from 'react'
import Aux from '../aux/Aux'
import '../../assets/css/WelcomeContent.css'

//images
import createImage from "../../assets/images/create.png";
import statusImage from "../../assets/images/status.png";
import connectionsImage from "../../assets/images/connections.png";
import studentMeetingImage from "../../assets/images/studentMeeting.jpg";
import welcomeBackgroundImage from "../../assets/images/welcomeBackground.jpg";

export const FirstContent = (props) => {
    return <Aux>
        <h4 id="first-heading">
            <h5>Networking is difficult..</h5>
            When one door closes, another opens, but we often look so long and so regretfully upon the closed door that we do not see the one which has opened for us.</h4>
        <div class="parallax">
            <img src={welcomeBackgroundImage} alt="welcomeBackgroundImage" />
        </div>
    </Aux>
}

export const MiddleContent = (props) => (
    <Aux>
        <h1 className={props.show ? "header-paragraph display-middle-content" : "header-paragraph"} >
            <span id="welcome-heading">WELECOME TO</span>
            <span id="connect-school-heading"> CONNECT SCHOOL</span>
        </h1>
        <h5>Education is not just about going to school and getting a degree. We don't stop going to school when we graduate. You have to stay in school.
        </h5>
        <h5 className={props.show ? "header-paragraph display-middle-content" : "header-paragraph"}>Join any school events and meet new people. Connect School will help you.</h5>
    </Aux>
)

export const LastContent = (props) => (
    <div class="row icons-container">
        <div class="col s4 center-align">
            <img className={props.show ? "icon-images display-last-content" : "icon-images"}
                src={createImage} alt="createImage" />
            <h5 class="icon-text">Create your events</h5>
        </div>
        <div class="col s4 center-align">
            <img className={props.show ? "icon-images display-last-content" : "icon-images"}
                src={statusImage} alt="statusImage" />
            <h5 class="icon-text">Check your event status</h5>
        </div>
        <div class="col s4 center-align">
            <img className={props.show ? "icon-images display-last-content" : "icon-images"}
                src={connectionsImage} alt="connectionsImage" />
            <h5 class="icon-text">Make connections</h5>
        </div>
        <div class="parallax"><img src={studentMeetingImage} alt="studentMeetingImage" /></div>
    </div>
)
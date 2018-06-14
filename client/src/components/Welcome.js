import React from 'react';
import '../assets/css/Welcome.css';
import { Parallax } from 'react-materialize'

//images
import studentMeetingImage from "../assets/images/studentMeeting.jpg";
import studentsImage from "../assets/images/students.jpg";

const Welcome = () => {
    return (
        <div>
            <Parallax id="first-img" imageSrc={studentMeetingImage} />
            <div className="section">
                <div className="row container header-container">
                    <h1 className="header">
                        <span id="welcome-heading">WELECOME TO</span>
                        <span id="connect-school-heading">CONNECT SCHOOL</span>
                    </h1>
                    <h5>Education is not just about going to school and getting a degree. We don't stop going to school when we graduate. You have to stay in school.</h5>
                    <h5>Join the any school events and meet new people. Connect School will help you.</h5>
                </div>
            </div>
            <Parallax imageSrc={studentsImage} />
        </div>
    )
}

export default Welcome;
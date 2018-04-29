import React from 'react';
import '../assets/css/Welcome.css';

//images
import studentMeetingImage from "../assets/images/studentMeeting.jpg";

const Welcome = () => {
    const background = {
        width: "100vw",
        height: "90vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${studentMeetingImage})`
    };

    return (
        <div>
            <div id="main-background" style={background}>
                <div>
                    <h3 className="white-text">WELECOME TO CONNECT SHOOL</h3>
                    <h5 className="white-text">This website is still on development. Feel free to login and look around.</h5>
                </div>
            </div>
        </div>
    )
}

export default Welcome;
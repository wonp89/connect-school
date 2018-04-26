import React from 'react';
import { Link } from 'react-router-dom';

const MeetUpAll = ({ meetUp, id }) => {

    const expiredColor = () => {
        if (meetUp.expired) {
            return "black"
        }
        return "blue-grey"
    }
    const expiredMessage = () => {
        if (meetUp.expired) {
            return <p className="red-text center">THIS POST HAS BEEN EXPIRED</p>
        }
    }

    const showButton = () => {
        if (!meetUp.expired) {
            return <Link to={"/meetup/" + id} className="right white-text">Show</Link>
        }
    }

    return (
        <div>
            <div className={`card ${expiredColor()}`} key={meetUp._id}>
                <div className="card-content white-text">
                    {expiredMessage()}
                    <span className="card-title">
                        <p>{meetUp.school}</p>
                        <p>{meetUp.title}</p>
                        <p>{new Date(meetUp.date).toLocaleDateString()}</p>
                    </span>
                </div>
                <div className="card-action">
                    <a>Attending: {meetUp.attending.length}</a>
                    {showButton()}
                </div>
            </div>
        </div>
    )
};

export default MeetUpAll;
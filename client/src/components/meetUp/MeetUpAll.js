import React from 'react';
import '../../assets/css/MeetUpAll.css';
import { Link } from 'react-router-dom';

const MeetUpAll = ({ meetUp, id }) => {

    const expiredColor = () => {
        if (meetUp.expired) {
            return "grey-text expired-content"
        }
        return "black-text"
    }
    const isExpired = () => {
        if (meetUp.expired) {
            return (
                <div className="card-action expired">
                    <p className="white-text center">THIS EVENT HAS BEEN EXPIRED</p>
                </div>
            )
        }
        return (
            <div className="card-action not-expired">
                <span className="red-text joined">
                <i class="material-icons">account_circle</i>
                JOINED: {meetUp.attending.length}
                </span>
                <Link to={"/meetup/" + id} className="right waves-effect waves-light btn">Show</Link>
            </div>
        )
    }

    return (
        <div>
            <div className="card grey lighten-5" key={meetUp._id}>
                <div className={`card-content ${expiredColor()}`}>
                    <span className="card-title">
                        <p>{meetUp.school}</p>
                        <p>{meetUp.title}</p>
                        <p>{new Date(meetUp.date).toLocaleDateString()}</p>
                    </span>
                </div>
                {isExpired()}
            </div>
        </div>
    )
};

export default MeetUpAll;
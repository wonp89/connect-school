import React from 'react';
import '../../assets/css/EventAll.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

const EventAll = ({ event, id }) => {

    const expiredColor = () => {
        if (event.expired) {
            return "grey-text expired-content"
        }
        return "black-text"
    }
    const isExpired = () => {
        if (event.expired) {
            return (
                <div className="card-action expired">
                    <p className="white-text center">THIS EVENT HAS BEEN EXPIRED</p>
                </div>
            )
        }
        return (
            <div className="card-action not-expired">
                <span className="red-text joined">
                <i class="left material-icons">account_circle</i>
                Joined: {event.joined.length}
                </span>
                <Link to={"/event/" + id} className="right waves-effect waves-light btn">Show</Link>
            </div>
        )
    }

    return (
        <div>
            <div className="card grey lighten-5" key={event._id}>
                <div className={`card-content ${expiredColor()}`}>
                    <span className="card-title">
                        <p>{event.title}</p>
                        <p><i class="left material-icons">account_balance</i>{event.school}</p>
                        <p><i class="left material-icons">timer</i>Expire {moment(event.date).fromNow()}</p>
                    </span>
                </div>
                {isExpired()}
            </div>
        </div>
    )
};

export default EventAll;
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const UserInfoMeetUp = (props) => {

    const isExpired = () => {
        return props.meetUp.expired
            ? <p className="red-text">EXPIRED</p>
            : <Link to={"/meetup/" + props.meetUp._id}>MORE DETAIL</Link>
    }

    return (
        <div class="row">
            <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">{props.meetUp.title}</span>
                        <p>{props.meetUp.school}</p>
                        <p>{props.meetUp.location}</p>
                        <p>{moment(props.meetUp.date).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                    <div class="card-action">
                        {isExpired()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfoMeetUp;
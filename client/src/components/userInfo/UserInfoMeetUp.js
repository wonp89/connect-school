import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class UserInfoMeetUp extends Component {
    meetUp = null;

    componentDidMount() {
        this.props.fetchUserInfo();
    }

    renderMeetUp() {
        if (this.meetUp) {
            return this.meetUp.map((meetUp, index) => {
                return (
                    <div class="col s12 m4">
                        <div class="card card horizonta">
                            <div class="card-content black-text">
                                <span class="card-title">{meetUp.title}</span>
                                <p>{meetUp.school}</p>
                                <p>{meetUp.location}</p>
                                <p>{moment(meetUp.date).format('MMMM Do YYYY, h:mm a')}</p>
                            </div>
                            <div class="card-action center">
                                {meetUp.expired
                                    ? <button type="submit" className="red btn-flat white-text" onClick={() => this.props.removeMeetUps(meetUp._id)}>EXPIRED: Click to remove</button>
                                    : <Link to={"/meetup/" + meetUp._id}>MORE DETAIL</Link>}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        this.meetUp = this.props.userInfo.meetUp

        return (
            <div class="row">
                <h3 className="center">Joined Events</h3>
                <hr/>
                {this.renderMeetUp()}
            </div>
        )
    }
}
const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapStateToProps, actions)(UserInfoMeetUp);
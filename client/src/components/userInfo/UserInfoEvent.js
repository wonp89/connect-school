import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class UserInfoEvent extends Component {
    event = null;

    componentDidMount() {
        this.props.fetchUserInfo();
    }

    renderEvents() {
        if (this.event) {
            return this.event.map((event, index) => {
                return (
                    <div class="col s12 m4">
                        <div class="card card horizonta">
                            <div class="card-content black-text">
                                <span class="card-title">{event.title}</span>
                                <p>{event.school}</p>
                                <p>{event.location}</p>
                                <p>Expire {moment(event.date).fromNow()}</p>
                            </div>
                            <div class="card-action center">
                                {event.expired
                                    ? <button type="submit" className="red btn-flat white-text" onClick={() => this.props.removeEvent(event._id)}>EXPIRED: Click to remove</button>
                                    : <Link to={"/event/" + event._id}>VIEW DETAIL</Link>}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        this.event = this.props.userInfo.event

        return (
            <div class="row">
                <h3 className="center">JOINED EVENTS</h3>
                <hr />
                {this.renderEvents()}
            </div>
        )
    }
}
const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapStateToProps, actions)(UserInfoEvent);
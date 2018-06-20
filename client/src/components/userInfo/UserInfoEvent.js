import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import '../../assets/css/UserInfoEvent.css'

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
                            <div class="card-content black-text event-content">
                                <span class="card-title">
                                    <span class="orange-text">>&nbsp;</span>
                                  {event.title}
                                </span>
                                <p>{event.school}</p>
                                <p>{event.location}</p>
                                <p class="red-text">Expire {moment(event.date).fromNow()}</p>
                            </div>
                            <div class="card-action center userInfo-card-action">
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
                <h3 className="center joined-event-header">JOINED EVENTS</h3>
                <hr />
                {this.renderEvents()}
            </div>
        )
    }
}
const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapStateToProps, actions)(UserInfoEvent);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import '../../assets/css/EventShow.css';
import { Link } from 'react-router-dom';
import EventModal from './EventModal';

class EventShow extends Component {
    event = null;
    user = null; // _userInfo is the id that matches to members' _id inside joined list

    //localStorage : storing object to prevent data becomes undefiend when page is refreshed 
    // 3) when page refreshed (when state become undefined), insert data from localStorage
    componentWillMount() {
        this.event = JSON.parse(localStorage.getItem('event'))
        this.user = JSON.parse(localStorage.getItem('user'))
    }
    // 1) mount new sate
    componentDidMount() {
        !localStorage.getItem('event')
            ? this.props.showEvent(this.props.match.params.id)
            : console.log("using state from localStorage")
    }
    // 2) insert into localstorage after new state mounted
    componentDidUpdate(nextProps, nextState) {
        if (!localStorage.getItem('event')) {
            localStorage.setItem('event', JSON.stringify(this.props.event[0]))
            localStorage.setItem('user', JSON.stringify(this.props.auth))
        }
    }

    //member on the top of the list is the creator of the event
    //border color changes if the user is 'event creator' or 'joined member'
    joinedMembers() {
        return this.event.joined.map((member, index) => {
            let colorText = null;
            let person = null;
            if (index === 0) {
                colorText = "red"
                person = "person"
            } else if (member._id === this.user._userInfo) {
                colorText = "green"
                person = "people"
            } else {
                person = "people";
            }
            return (
                <li class={`collection-item avatar ${colorText}-text`} key={index}>
                    <i class={`left material-icons ${colorText} circle`}>{`${person}`}</i>
                    <span class="title">{member.username}</span>
                    <p>{member.currentState}</p>
                    <p>{member.studying}</p>
                </li>
            )
        })
    }

    //display message if user joined or created the event
    joinedMessage() {
        return this.event.joined.map(member => {
            if (this.user._userInfo === this.event._creator && this.user._userInfo === member._id) {
                return <p className="center red-text">You created this event</p>
            } else if (this.user._userInfo === member._id) {
                return <p className="center green-text">You have already joined this event.</p>
            }
        })
    }

    showBorder() {
        return this.event.joined.map(member => {
            if (this.user._userInfo === this.event._creator && this.user._userInfo === member._id) {
                return " red-border " // to remove comman inside className, I added a space. Not sure why..
            } else if (this.user._userInfo === member._id) {
                return " green-border "// to remove comman inside className, I added a space. Not sure why..
            }
        })
    }

    showButton() {
        let user = null; // if the 'QUIT' button shows up, then 'user' is defined
        for (let member of this.event.joined) {
            if (this.user._userInfo === member._id && this.user._userInfo !== this.event._creator) {
                user = this.user._userInfo;
                return <button
                    className="right red darken-3 white-text btn-flat"
                    onClick={() => this.props.quitEvent(this.event._id)}
                >QUIT</button>
            }
        }
        if (user === null && this.user._userInfo !== this.event._creator) {
            return <button
                className="right green darken-3 white-text btn-flat"
                onClick={() => this.props.joinEvent(this.event._id)}
            > Join </button>
        }
    }

    render() {
        // when user first entered show page, localStorage is empty
        if (!localStorage.getItem('event')) {
            this.event = this.props.event[0];
            this.user = this.props.auth;
        }

        // when user joined or quit event, a modal displays
        const eventModal = () => {
            // ("if state is mutated after joined or quit" && "this.props.event[0] has object value")
            if (this.event !== this.props.event[0] && this.props.event[0]) {
                return <EventModal event={this.props.event[0]} color={this.props.event[0].color} message={this.props.event[0].message} />
            }
        }

        return (
            <div className="container show-container">
                {this.joinedMessage()}
                <div class={`row ${this.showBorder()}`} key={this.event._id}>
                    {eventModal()}
                    <div class="col s12 m8">
                        <div class="card grey lighten-5">
                            <div class="card-content black-text">
                                <p class="card-title">{this.event.title}</p>
                                <p>
                                    <i class="left material-icons">account_balance</i>
                                    <span>{this.event.school}</span>
                                </p>
                                <p>
                                    <i class="left material-icons">announcement</i>
                                    <span>{this.event.body}</span>
                                </p>
                                <p>
                                    <i class="left material-icons">place</i>
                                    <span>{this.event.location}</span>
                                </p>
                                <p>
                                    <i class="left material-icons">date_range</i>
                                    <span>{moment(this.event.date).format('MMMM Do YYYY, h:mm a')}</span>
                                </p>
                            </div>
                            <div class="card-action posted-date">
                                <p> Posted On: {new Date(this.event.posted).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m4">
                        <ul class="collection with-header">
                            <li class="collection-item white-text joined-count">
                                <span>JOINED: </span>
                                <span>{this.event.joined.length}</span>
                            </li>

                            {this.joinedMembers()}

                        </ul>
                    </div>
                </div>
                <div id="buttons-container">
                    <Link
                        to="/event"
                        className="left yellow darken-3 white-text btn-flat"
                    >GO BACK</Link>
                    {this.showButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ event, auth }) => ({ event, auth });

export default connect(mapStateToProps, actions)(EventShow);

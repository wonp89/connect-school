import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import '../../assets/css/EventShow.css';
import { Link } from 'react-router-dom';
import EventModal from './EventModal';

class EventShow extends Component {
    // without state 
    event = null;
    user = null; // "_userInfo" is the id that matches to members' _id inside joined list

    //localStorage : storing object to prevent data becomes undefiend when page is refreshed 
    // 3) when page refreshed (when state become undefined), insert data from localStorage
    componentWillMount() {
        this.event = JSON.parse(localStorage.getItem('event'))
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    // 1) mount new sate
    componentDidMount() {
        console.log(this.props)
        const {params} = this.props.match;
        !localStorage.getItem('event')
            ? this.props.showEvent(params.id)
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
            let personIcon = null;
            //show satus or schoolname
            const school = () => {
                if (member.school && member.currentState === "Student") {
                    return <p><i class="material-icons left">account_balance</i>{member.school}</p>
                }
                return <p><i class="material-icons left">assignment_ind</i>{member.currentState}</p>
            }
            const creatorEmail = () => {
                if (index === 0) {
                    return <p><i class="material-icons left">email</i>{member.email}</p>
                }
            }
            if (index === 0) {
                colorText = "red";
                personIcon = "person";
            } else if (member._id === this.user._userInfo) {
                colorText = "green"
                personIcon = "people"
            } else {
                personIcon = "people";
            }
            return (
                <li class={`collection-item avatar`} key={index}>
                    <i class={`left material-icons ${colorText} circle`}>{`${personIcon}`}</i>
                    <p class={`title ${colorText}-text`}>{member.username}</p>
                    {school()}
                    <p><i class="material-icons left">school</i>{member.studying}</p>
                    {creatorEmail()}
                </li>
            )
        })
    }

    //display message if user joined or created the event
    joinedMessage() {
        return this.event.joined.map(member => {
            if (this.user._userInfo === this.event._creator && this.user._userInfo === member._id) {
                return <span className="red-text"><i class="left material-icons person-icon">person</i>You created this event</span>
            } else if (this.user._userInfo === member._id) {
                return <span className="green-text"><i class="left material-icons person-icon">people</i>You have already joined this event.</span>
            }
        })
    }

    showBorder() {
        return this.event.joined.map(member => {
            if (this.user._userInfo === this.event._creator && this.user._userInfo === member._id) {
                return " red-border " // to remove comman inside className, I added a space. Not sure why comma being added...
            } else if (this.user._userInfo === member._id) {
                return " green-border "
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
            >Join</button>
        }
    }

    render() {
        // when user first entered show page, localStorage is empty
        if (!localStorage.getItem('event')) {
            this.event = this.props.event[0];
            this.user = this.props.auth;
        }
        // when user joined or quit event, a modal displays
        let eventModal = null
        if (this.event !== this.props.event[0] && this.props.event[0]) {
            eventModal = <EventModal event={this.props.event[0]} color={this.props.event[0].color}message={this.props.event[0].message} />
        }
        console.log("Current ", this);

        return (
            <div className="container show-container">
                {this.joinedMessage()}
                <div class="row" key={this.event._id}>
                    {eventModal}
                    <div class="col s12 m8">
                        <div class={`card ${this.showBorder()}`}>
                            <div class="card-content black-text">
                                <p class="card-title">{this.event.title}</p>
                                {/* <img src={`require(${this.event.image})`} alt="eventImage" /> */}
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
                                <p id="posted-on">Posted on {moment(new Date(this.event.posted), "YYYYMMDD").fromNow()}</p>
                            </div>
                            <div class="card-action">
                                <div id="show-buttons-container">
                                    <Link
                                        to="/event"
                                        className="left yellow darken-3 white-text btn-flat"
                                    >GO BACK TO THE LIST</Link>
                                    {this.showButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m4">
                        <ul class="collection with-header">
                            <li class="collection-item white-text joined-count">
                                <span>Joined: </span>
                                <span>{this.event.joined.length}</span>
                            </li>
                            {this.joinedMembers()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ event, auth }) => ({ event, auth });

export default connect(mapStateToProps, actions)(EventShow);

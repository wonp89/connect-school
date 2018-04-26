import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import MeetUpModal from './MeetUpModal';

class MeetUpShow extends Component {
    meetUp = null;
    user = null; // _userInfo is the id that matches to members' _id inside attending list

    //localStorage : storing object to prevent data becomes undefiend when page is refreshed 
    // 3) when page refreshed (when state become undefined), insert data from localStorage
    componentWillMount() {
        this.meetUp = JSON.parse(localStorage.getItem('meetUp'))
        this.user = JSON.parse(localStorage.getItem('user'))
    }
    // 1) mount new sate
    componentDidMount() {
        !localStorage.getItem('meetUp')
            ? this.props.showMeetUps(this.props.match.params.id)
            : console.log("using state from localStorage")
    }
    // 2) insert into localstorage after new state mounted
    componentDidUpdate(nextProps, nextState) {
        if (!localStorage.getItem('meetUp')) {
            localStorage.setItem('meetUp', JSON.stringify(this.props.meetUp[0]))
            localStorage.setItem('user', JSON.stringify(this.props.auth))
        }
    }

    //member on the top of the list is the creator of the meetUp
    joinedMembers() {
        return this.meetUp.attending.map((member, index) => {
            if (index === 0) {
                return <p key={index} className="red-text">Creator : {member.username}</p>
            }
            return <p key={index} >{member.username}</p>
        }
        )
    }

    //display message if user joined or created the meetUp
    attendanceMessage() {
        return this.meetUp.attending.map(member => {
            if (this.user._userInfo === this.meetUp._creator && this.user._userInfo === member._id) {
                return <p className="center red-text">You created this post</p>
            } else if (this.user._userInfo === member._id) {
                return <p className="center green-text">You have already joined this meet up.</p>
            }
        })
    }

    showButton() {
        let user = null; // if the 'QUIT' button shows up, then 'user' is defined
        for (let member of this.meetUp.attending) {
            if (this.user._userInfo === member._id && this.user._userInfo !== this.meetUp._creator) {
                user = this.user._userInfo;
                return <button
                    className="right red darken-3"
                    onClick={() => this.props.quitMeetUps(this.meetUp._id)}
                >QUIT</button>
            }
        }
        if (user === null && this.user._userInfo !== this.meetUp._creator) {
            return <button
                className="right green darken-3 white-text btn-flat"
                onClick={() => this.props.joinMeetUps(this.meetUp._id)}
            > Join </button>
        }
    }

    render() {
        // when user first entered show page, localStorage is empty
        if (!localStorage.getItem('meetUp')) {
            this.meetUp = this.props.meetUp[0];
            this.user = this.props.auth;
        }

        // when user joined or quit meetUp, a modal displays
        const meetUpModal = () => {
            // "if state is mutated after joined or quit" && "this.props.meetUp[0] has object value"
            if (this.meetUp !== this.props.meetUp[0] && this.props.meetUp[0]) {
                return <MeetUpModal meetUp={this.props.meetUp[0]} message={this.props.meetUp[0].message} />
            }
        }

        return (
            <div key={this.meetUp._id}>
                {meetUpModal()}
                {this.attendanceMessage()}
                <div>
                    <p>{this.meetUp.school}</p>
                    <p>{this.meetUp.title}</p>
                    <p>{this.meetUp.body}</p>
                    <p>{this.meetUp.location}</p>
                    <p>{moment(this.meetUp.date).format('MMMM Do YYYY, h:mm a')}</p>
                    <p> Posted On: {new Date(this.meetUp.posted).toLocaleDateString()}</p>
                </div>
                <div>
                    <p>Attending: {this.meetUp.attending.length}</p>
                    <p className="red-text">members:</p>
                    {this.joinedMembers()}
                    <Link
                        to="/meetUp"
                        className="left yellow darken-3 white-text btn-flat"
                    >GO BACK</Link>
                    {this.showButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ meetUp, auth }) => ({ meetUp, auth });

export default connect(mapStateToProps, actions)(MeetUpShow);
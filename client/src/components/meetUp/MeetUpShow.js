import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import '../../assets/css/MeetUpShow.css';
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
    //border color changes if the user is 'event creator' or 'joined member'
    joinedMembers() {
        return this.meetUp.attending.map((member, index) => {
            let colorText = null;
            let person = null;
            if (index === 0) {
                colorText = "red-text"
                person = "person"
            } else if (member._id === this.user._userInfo) {
                colorText = "green-text"
                person = "people"
            } else {
                person = "people";
            }
            return (
                <div>
                    <p className={`${colorText}`}>
                        <i class="left material-icons">{`${person}`}</i>
                        {member.username}
                    </p>
                </div>
            )
        })
    }

    //display message if user joined or created the meetUp
    joinedMessage() {
        return this.meetUp.attending.map(member => {
            if (this.user._userInfo === this.meetUp._creator && this.user._userInfo === member._id) {
                return <p className="center red-text">You created this post</p>
            } else if (this.user._userInfo === member._id) {
                return <p className="center green-text">You have already joined this event.</p>
            }
        })
    }

    showBorder() {
        return this.meetUp.attending.map(member => {
            if (this.user._userInfo === this.meetUp._creator && this.user._userInfo === member._id) {
                return "red-border " // to remove comman inside className, I added a space. Not sure why..
            } else if (this.user._userInfo === member._id) {
                return " green-border"// to remove comman inside className, I added a space. Not sure why..
            }
        })
    }

    showButton() {
        let user = null; // if the 'QUIT' button shows up, then 'user' is defined
        for (let member of this.meetUp.attending) {
            if (this.user._userInfo === member._id && this.user._userInfo !== this.meetUp._creator) {
                user = this.user._userInfo;
                return <button
                    className="right red darken-3 white-text btn-flat"
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
            // ("if state is mutated after joined or quit" && "this.props.meetUp[0] has object value")
            if (this.meetUp !== this.props.meetUp[0] && this.props.meetUp[0]) {
                return <MeetUpModal meetUp={this.props.meetUp[0]} color={this.props.meetUp[0].color} message={this.props.meetUp[0].message} />
            }
        }

        return (
            <div className="container show-container">
                {this.joinedMessage()}
                <div class={`row ${this.showBorder()}`} key={this.meetUp._id}>
                    {meetUpModal()}
                    <div class="col s12 m8">
                        <div class="card grey lighten-5">
                            <div class="card-content black-text">
                                <p class="card-title">{this.meetUp.title}</p>
                                <p>
                                    <i class="left material-icons">account_balance</i>
                                    <span>{this.meetUp.school}</span>
                                </p>
                                <p>
                                    <i class="left material-icons">announcement</i>
                                    <span>{this.meetUp.body}</span>
                                </p>
                                <p>
                                    <i class="left material-icons">place</i>
                                    <span>{this.meetUp.location}</span>
                                </p>
                                <p>
                                    <i class="left material-icons">date_range</i>
                                    <span>{moment(this.meetUp.date).format('MMMM Do YYYY, h:mm a')}</span>
                                </p>
                            </div>
                            <div class="card-action posted-date">
                                <p> Posted On: {new Date(this.meetUp.posted).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m4">
                        <ul class="collection with-header">
                            <li class="collection-item white-text joined-count">
                                <span>Joined: </span>
                                <span>{this.meetUp.attending.length}</span>
                            </li>
                            <li class="collection-item">
                                {this.joinedMembers()}
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="buttons-container">
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

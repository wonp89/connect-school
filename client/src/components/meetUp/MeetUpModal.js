import React, { Component } from 'react';
import moment from 'moment';
import '../../assets/css/MeetUpModal.css'
import $ from "jquery";

class MeetUpModal extends Component {
    constructor({ message, meetUp, color }) {
        super()
        this.message = message;
        this.meetUp = meetUp.meetUp;
        this.color = color;
    }

    componentDidMount() {
        $(document).ready(function () {
            $('.modal').fadeIn('open');
        });
    }

    render() {
        return (
            <div className="overlay">
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h6 className={`${this.color}-text center`}>{this.message}</h6>
                        <h5>{this.meetUp.title}</h5>
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
                    <div className="modal-footer center-button">
                        <button
                            className="yellow darken-3 btn-flat"
                        ><a className="white-text" href="/meetUp">Go Back To the List</a></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeetUpModal;
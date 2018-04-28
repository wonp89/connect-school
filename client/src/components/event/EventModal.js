import React, { Component } from 'react';
import moment from 'moment';
import '../../assets/css/EventModal.css'
import $ from "jquery";

class EventModal extends Component {
    constructor({ message, event, color }) {
        super()
        this.message = message;
        this.event = event.event;
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
                        <h5>{this.event.title}</h5>
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
                    <div className="modal-footer center-button">
                        <button
                            className="yellow darken-3 btn-flat"
                        ><a className="white-text" href="/event">Go Back To the List</a></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventModal;
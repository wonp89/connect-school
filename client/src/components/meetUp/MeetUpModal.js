import React, { Component } from 'react';
import moment from 'moment';
import '../css/MeetUpModal.css'
import $ from "jquery";

class MeetUpModal extends Component {
    constructor({message, meetUp}) {
        super()
        this.message = message
        this.meetUp = meetUp.meetUp
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
                        <p className="green-text center">{this.message}</p>
                        <p>{this.meetUp.school}</p>
                        <p>{this.meetUp.title}</p>
                        <p>{this.meetUp.body}</p>
                        <p>{this.meetUp.location}</p>
                        <p>{moment(this.meetUp.date).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                    <div className="modal-footer">
                        <a href="/meetUp">Go Back To the List</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeetUpModal;
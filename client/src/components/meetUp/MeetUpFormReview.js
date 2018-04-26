import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import MeetUpFormFields from './MeetUpFormFields';
import * as actions from '../../actions';

const MeetUpFormReview = ({ onCancel, formValues, submitMeetUps }) => {

    const reviewFields = _.map(MeetUpFormFields, ({ name, label }) => {
        return (
            <div>
                <label>{label}</label>
                <div>
                    {name === "date" ? moment(formValues[name]).format('MMMM Do YYYY, h:mm a') : formValues[name]}
                </div>
            </div>
        )
    })
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >
                BACK
            </button>
            <button
                onClick={() => submitMeetUps(formValues)}
                className="green btn-flat right white-text">
                Save MeetUp
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({ formValues: state.form.MeetUpForm.values });

export default connect(mapStateToProps, actions)(MeetUpFormReview);
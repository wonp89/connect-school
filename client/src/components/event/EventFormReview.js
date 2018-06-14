import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import EventFormFields from './EventFormFields';
import * as actions from '../../actions';

const EventFormReview = ({ onCancel, formValues, submitEvent }) => {

    const reviewFields = _.map(EventFormFields, ({ name, label }) => {
        return (
            <div>
                <label>{label}</label>
                <div>
                    {name === "date" 
                    ? moment(formValues[name]).format('MMMM Do YYYY, h:mm a') 
                    : name === 'image' //fix if image doesn't exist
                    ? formValues[name][0].name
                    : formValues[name]}
                </div>
            </div>
        )
    })
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <div id="buttons-container">
                <button
                    className="yellow darken-3 white-text btn-flat"
                    onClick={onCancel}
                >
                    BACK
                </button>
                <button
                    onClick={() => submitEvent(formValues)}
                    className="green btn-flat right white-text">
                    Save Event
                    <i className="material-icons right">email</i>
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ formValues: state.form.EventForm.values });

export default connect(mapStateToProps, actions)(EventFormReview);
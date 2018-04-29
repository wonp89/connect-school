import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import '../../assets/css/EventForm.css';
import {renderDropdownList, renderInputField, renderDateTimePicker} from './EventFields'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import 'react-widgets/dist/css/react-widgets.css'
momentLocalizer(moment)

// // adding image function will be added later
// const customFileInput = ({input}) => {
//     delete input.value; // <-- disable error "Failed to set the 'value' property"
//     return <input type="file" id="file" {...input} />;
// };

const EventForm = ({ onEventSubmit, handleSubmit, pristine, reset, submitting, formValues }) => {
    const schools = ["UBC", "SFU", "EMILY CARR"]
    const required = value => (value ? undefined : 'Required')
    return (
        <form onSubmit={handleSubmit(values => onEventSubmit())} enctype="multipart/form-data">
            <div>
                <label>Schools</label>
                <Field
                    name="school"
                    component={renderDropdownList}
                    data={schools}
                    valueField="value"
                    validate={required}
                    textField="school" />
            </div>

            <div>
                <label>Title</label>
                <Field
                    name="title"
                    component={renderInputField}
                    valueField="value"
                    validate={required}
                    textField="title" />
            </div>

            <div>
                <label>Content</label>
                <Field
                    name="body"
                    component={renderInputField}
                    valueField="value"
                    validate={required}
                    textField="body" />
            </div>

            <div>
                <label>Location</label>
                <Field
                    name="location"
                    component={renderInputField}
                    valueField="value"
                    validate={required}
                    textField="location" />
            </div>

            <div>
                <label>Date</label>
                <Field
                    name="date"
                    showTime={true}
                    valueField="value"
                    textField="location"
                    validate={required}
                    component={renderDateTimePicker}
                />
            </div>

            {/* <div>
                <label>Image</label>
                <Field
                    name="image"
                    type="file"
                    component={customFileInput} />
            </div> */}

            <div id="buttons-container">
                <button className="yellow darken-3 white-text btn-flat" type="button" disabled={pristine || submitting} onClick={reset}>Reset Values
            </button>
                <button type="submit" className="teal btn-flat white-text" >
                    SAVE
                     <i className="material-icons right">done</i>
                </button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => ({ formValues: state.form.EventForm });

connect(mapStateToProps)(EventForm);

export default reduxForm({ form: 'EventForm', destroyOnUnmount: false })(EventForm)

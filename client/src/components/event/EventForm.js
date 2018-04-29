import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import '../../assets/css/EventForm.css';
import DropdownList from 'react-widgets/lib/DropdownList'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import 'react-widgets/dist/css/react-widgets.css'
momentLocalizer(moment)

const renderDropdownList = ({ input, data, valueField, textField, meta: { touched, error, warning } }) => (
    <div>
        <DropdownList {...input}
            data={data}
            valueField={valueField}
            textField={textField}
            onChange={input.onChange} />
        {touched &&
            ((error && <span className="red-text">{error}</span>))}
    </div>
)

const renderDateTimePicker = ({ input: { onChange, value }, showTime, meta: { touched, error, warning } }) => {
    const isPast = () => {
        if (Date.parse(value) < new Date()) {
        touched = !touched
          return <span className="red-text">Please Select Another Date</span> 
        } 
    }

    return (
        <div>
            <DateTimePicker 
                onChange={onChange}
                format="MM/DD/YYYY h:mm a"
                time={showTime}
                value={!value ? null : Date.parse(value) < new Date() ? null : new Date(value)}
            />
            {isPast()}
            {touched &&
                ((error && <span className="red-text">{error}</span>))}
        </div>
    )
}

const inputField = ({ input, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} />
        {touched &&
            ((error && <span className="red-text">{error}</span>))}
    </div>
)

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
                    component={inputField}
                    valueField="value"
                    validate={required}
                    textField="title" />
            </div>

            <div>
                <label>Content</label>
                <Field
                    name="body"
                    component={inputField}
                    valueField="value"
                    validate={required}
                    textField="body" />
            </div>

            <div>
                <label>Location</label>
                <Field
                    name="location"
                    component={inputField}
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

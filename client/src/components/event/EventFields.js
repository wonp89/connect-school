import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import '../../assets/css/EventFields.css'
import Aux from '../aux/Aux';

export const renderInputField = ({ input, meta: { touched, error, warning } }) => (
    <Aux>
        {touched &&
            ((error && <span className="red-text right">{error}</span>))}
        <input {...input} className="event-field-input" />
    </Aux>
)

export const renderDropdownList = ({ input, data, valueField, textField, meta: { touched, error, warning } }) => (
    <Aux>
        {touched &&
            ((error && <span className="red-text right">{error}</span>))}
        <DropdownList {...input}
            className="school-dropdown"
            data={data}
            valueField={valueField}
            textField={textField}
            onChange={input.onChange} />
    </Aux>
)

export const renderDateTimePicker = ({ input: { onChange, value }, showTime, meta: { touched, error, warning } }) => {
    const isPast = () => {
        if (Date.parse(value) < new Date()) {
            touched = !touched
            return <span className="red-text right">Please Select Another Date</span>
        }
    }
    return (
        <Aux>
            {isPast()}
            {touched &&
                ((error && <span className="red-text right">{error}</span>))}
            <DateTimePicker
                onChange={onChange}
                format="MM/DD/YYYY h:mm a"
                time={showTime}
                value={!value ? null : Date.parse(value) < new Date() ? null : new Date(value)}
            />
        </Aux>
    )
}

export const customFileInput = ({ input, meta: { touched, error, warning } }) => {
    delete input.value; // <-- disable error "Failed to set the 'value' property"
    return (
        <Aux>
            {touched &&
                ((error && <span className="red-text right">{error}</span>))}
            <input type="file" id="file" {...input} id="file-selector" />
        </Aux>
        )
};

export default (renderInputField, renderDropdownList, renderDateTimePicker, customFileInput);
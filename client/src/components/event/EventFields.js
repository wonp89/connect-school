import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

export const renderInputField = ({ input, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} />
        {touched &&
            ((error && <span className="red-text">{error}</span>))}
    </div>
)

export const renderDropdownList = ({ input, data, valueField, textField, meta: { touched, error, warning } }) => (
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

export const renderDateTimePicker = ({ input: { onChange, value }, showTime, meta: { touched, error, warning } }) => {
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

export default (renderInputField, renderDropdownList, renderDateTimePicker);
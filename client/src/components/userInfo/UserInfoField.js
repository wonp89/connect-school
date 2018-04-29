import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import { RadioButtonGroup } from 'material-ui/RadioButton'

export const renderInputField = ({ input, label, meta: { error, touched } }) =>
    (
        <div>
            <label>{label}</label>
            <input {...input} />
            <div className="red-text">
                {touched && error}
            </div>
        </div>
    )


export const renderDropdownList = ({ input, data, label, valueField, textField, meta: { error, touched } }) => {
    return (
        <div>
            <DropdownList {...input}
                data={data}
                valueField={valueField}
                textField={textField}
                onChange={input.onChange} />
        </div>
    )
}

export const renderRadioGroup = ({ input, ...rest }) => (
    <RadioButtonGroup
        {...input}
        {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}
    />
)

export default (renderInputField, renderDropdownList, renderRadioGroup);



import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import UserInfoFormFields from './UserInfoFormFields';
import UserInfoField from './UserInfoField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserInfoForm extends Component {
    renderFields = () =>
    _.map(UserInfoFormFields, field => {
        const renderRadioGroup = ({ input, ...rest }) => (
            <RadioButtonGroup
              {...input}
              {...rest}
              valueSelected={input.value}
              onChange={(event, value) => input.onChange(value)}
            />
        )
        if (field.name === 'currentState') {
            return (
                <MuiThemeProvider>
                <div>
                    <label>{field.label}</label>
                    <Field name={field.name} component={renderRadioGroup}>
                        <RadioButton value="Student" label="Student" />
                        <RadioButton value="Non-student" label="Not a student" />
                    </Field>
                </div>
                </MuiThemeProvider>
            )
        }
        return <Field component={UserInfoField} type="text" label={field.label} name={field.name} />
    })

    render() {
        const { submitUserInfo, formValues } = this.props
        return (
            <div>
                <form onSubmit={() => submitUserInfo(formValues.values)}>
                    {this.renderFields()}
                    <button type="submit" className="teal btn-flat right white-text">
                        SAVE
                     <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

const validate = (values) => {
    const errors = {};
    _.each(UserInfoFormFields, ({ name }) =>
        !values[name] ? errors[name] = "you must provide a value" : errors
    )
    return errors;
}

const mapStateToProps = (state) => ({ formValues: state.form.userInfoForm });

UserInfoForm = connect(mapStateToProps, actions)(UserInfoForm);

export default reduxForm({ validate, form: 'userInfoForm' })(UserInfoForm);
import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../../assets/css/UserInfoForm.css';
import UserInfoFormFields from './UserInfoFormFields';
import {renderInputField, renderDropdownList, renderRadioGroup} from './UserInfoField';
import { RadioButton } from 'material-ui/RadioButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserInfoForm extends Component {
    renderFields = () => {
        return _.map(UserInfoFormFields, field => {
            if (field.name === 'username') {
                return <Field component={renderInputField} type="text" label={field.label} name={field.name} />
            } else if (field.name === "studying") {
                return <Field component={renderInputField} type="text" label={field.label} name={field.name} />
            } else if (field.name === 'currentState') {
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
            } else if (field.name === 'school' && this.props.formValues.currentState === 'Student') {
                const schools = ["UBC", "SFU", "EMILY CARR"]
                return (
                    <div>
                        <label>{field.label}</label>
                        <Field
                            name="school"
                            component={renderDropdownList}
                            data={schools}
                            valueField="value"
                            textField="school" />
                    </div>
                )
            }
        })
    }
    
    render() {
        const { submitUserInfo, formValues } = this.props
        return (
            <div className="container userInfo-form">
                <form onSubmit={() => submitUserInfo(formValues)}>
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

const mapStateToProps = (state) => ({ formValues: state.form.userInfoForm.values });

UserInfoForm = connect(mapStateToProps, actions)(UserInfoForm);

export default reduxForm({ validate, form: 'userInfoForm', initialValues: { currentState: "Student" } })(UserInfoForm);
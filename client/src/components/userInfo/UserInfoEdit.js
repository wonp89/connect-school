import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import '../../assets/css/UserInfoEdit.css'
import UserInfoFormFields from './UserInfoFormFields';
import { renderInputField, renderDropdownList, renderRadioGroup } from './UserInfoField';
import { RadioButton } from 'material-ui/RadioButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserEditForm extends Component {

    renderFields() {
        return _.map(UserInfoFormFields, field => {
            // username should be consistent
            if (field.name === 'username') {
                return null;
            }
            if (field.name === "studying") {
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
        const { editUserInfo, formValues } = this.props
        return (
            <div className="container edit-container">
                <form onSubmit={() => editUserInfo(formValues)}>
                    {this.renderFields()}
                    <div id="buttons-container">
                        <button
                            className="yellow darken-3 white-text btn-flat"
                            onClick={this.props.goBack}
                        > Go Back </button>
                        <button type="submit" className="teal btn-flat white-text">
                            SAVE
                     <i className="material-icons right">done</i>
                        </button>
                    </div>
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

const mapStateToProps = (state) => ({ formValues: state.form.userEditForm.values });

UserEditForm = connect(mapStateToProps, actions)(UserEditForm);

//Sets up initialValues to avoid undefined error for { if (currentState === "Student)" } 
export default reduxForm({ validate, form: 'userEditForm', initialValues: { currentState: "Student" } })(UserEditForm);
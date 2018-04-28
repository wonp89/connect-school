import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import UserInfoFormFields from './UserInfoFormFields';
import UserInfoField from './UserInfoField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserEditForm extends Component {
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
            if (field.name === 'username') return null;
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
        const { editUserInfo, formValues } = this.props
        return (
            <div>
                <form onSubmit={() => editUserInfo(formValues.values)}>
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

const mapStateToProps = (state) => ({ formValues: state.form.userEditForm });

UserEditForm = connect(mapStateToProps, actions)(UserEditForm);

export default reduxForm({ validate, form: 'userEditForm' })(UserEditForm);
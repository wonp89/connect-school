import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import MeetUpForm from './MeetUpForm';
import MeetUpFormReview from './MeetUpFormReview';

class MeetUpNew extends Component {
    state = { showFormReview: false };

    //render form component and review component
    renderContent() {
        if (this.state.showFormReview) {
            return <MeetUpFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }
        return <MeetUpForm onMeetUpSubmit={() => this.setState({ showFormReview: true })} />
    }

    render() {
        return (
            <div className="container">
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({ form: 'MeetUpForm' })(MeetUpNew);
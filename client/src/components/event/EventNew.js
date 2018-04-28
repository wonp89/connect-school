import React, { Component } from 'react'
import { reduxForm } from 'redux-form';
import EventForm from './EventForm';
import '../../assets/css/EventNew.css';
import EventFormReview from './EventFormReview';

class EventNew extends Component {
    state = { showFormReview: false };

    //render form component and review component
    renderContent() {
        if (this.state.showFormReview) {
            return <EventFormReview onCancel={() => this.setState({ showFormReview: false })} />;
        }
        return <EventForm onEventSubmit={() => this.setState({ showFormReview: true })} />
    }

    render() {
        return (
            <div className="container">
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({ form: 'EventForm' })(EventNew);
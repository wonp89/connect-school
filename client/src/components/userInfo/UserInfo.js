import React, { Component } from 'react';
import UserInfoEdit from './UserInfoEdit';
import UserInfoReview from './UserInfoReview';

class UserInfo extends Component {
    state = { showEditForm: false };

    renderContent = () =>
        !this.state.showEditForm ? <UserInfoReview onEdit={() => this.setState({ showEditForm: true })} /> : <UserInfoEdit goBack={() => this.setState({ showEditForm: false })} />

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default UserInfo;
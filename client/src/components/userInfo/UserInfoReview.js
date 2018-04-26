import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfoMeeUp from './UserInfoMeetUp';
import * as actions from '../../actions';

class UserInfo extends Component {

    componentWillMount() {
        window.localStorage.clear();
    }

    componentDidMount() {
        this.props.fetchMeetUps();
    }

    renderReview() {
        let personInfo = this.props.userInfo
        return (
            <div>
                <div>{personInfo.username}</div>
                <div>{personInfo.currentState}</div>
                <div>{personInfo.studying}</div>
                <div>{personInfo.email}</div>
                <button
                    className="yellow darken-3 white-text btn-flat"
                    onClick={this.props.onEdit}
                > EDIT </button>
            </div>
        )
    }


    render() {

        return (
            <div>
                {this.renderReview()}
                <UserInfoMeeUp />
            </div>
        )
    }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo });

export default connect(mapStateToProps, actions)(UserInfo);
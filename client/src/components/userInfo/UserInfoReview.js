import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInfoMeeUp from './UserInfoMeetUp';
import '../../assets/css/UserInfoReview.css'
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
                <ul class="collection with-header">
                    <li class="collection-header">
                        <h4>Your Information</h4>
                        <button
                            className="yellow darken-3 white-text right btn-flat"
                            onClick={this.props.onEdit}
                        > EDIT </button>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">account_circle</i>
                        <span class="title">USERNAME</span>
                        <p class="red-text">{personInfo.username}</p>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">assignment_ind</i>
                        <span class="title">CURRENT STATE</span>
                        <p class="red-text">{personInfo.currentState}</p>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">school</i>
                        <span class="title">STUDYING</span>
                        <p class="red-text">{personInfo.studying}</p>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">email</i>
                        <span class="title">EMAIL</span>
                        <p class="red-text">{personInfo.email}</p>
                    </li>
                </ul>
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


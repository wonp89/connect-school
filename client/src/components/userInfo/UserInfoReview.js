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
                        <h4>USER INFORMATION</h4>
                        <button
                            className="yellow darken-3 white-text right btn-flat update-user"
                            onClick={this.props.onEdit}
                        >
                        UPDATE INFO
                        <i class="material-icons">create</i>
                        </button>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">account_circle</i>
                        <span class="title red-text">USERNAME</span>
                        <p>{personInfo.username}</p>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">assignment_ind</i>
                        <span class="title red-text">CURRENT STATE</span>
                        <p>{personInfo.currentState}</p>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">school</i>
                        <span class="title red-text">STUDYING</span>
                        <p>{personInfo.studying}</p>
                    </li>
                    <li class="collection-item avatar">
                        <i class="material-icons circle red">email</i>
                        <span class="title red-text">EMAIL</span>
                        <p>{personInfo.email}</p>
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


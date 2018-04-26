import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//components
import Header from './Header'
import Welcome from './Welcome';
import UserInfoForm from './userInfo/UserInfoForm';
import UserInfo from './userInfo/UserInfo';
import MeetUpNew from './meetUp/MeetUpNew';
import MeetUpList from './meetUp/MeetUpList';
import MeetUpShow from './meetUp/MeetUpShow';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserInfo();
  }

  // if user already have user information, it will redirect to userinfoReview comopnent
  // require "this.props.fetchUserInfo()" to check if userInformation exist
  userInfoSaved = () => !this.props.userInfo.username ? UserInfoForm : UserInfo

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/userInfo" component={this.userInfoSaved()} />
            <Route exact path="/meetup" component={MeetUpList} />
            <Route exact path="/meetup/new" component={MeetUpNew} />
            <Route exact path="/meetup/:id" component={MeetUpShow} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo })

export default connect(mapStateToProps, actions)(App);
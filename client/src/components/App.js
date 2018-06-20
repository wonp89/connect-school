import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//components
import Header from './Header'
import Footer from './Footer'
import Welcome from './Welcome';
import UserInfoForm from './userInfo/UserInfoForm';
import UserInfo from './userInfo/UserInfo';
import EventNew from './event/EventNew';
import EventList from './event/EventList';
import EventShow from './event/EventShow';

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
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/userInfo" component={this.userInfoSaved()} />
            <Route exact path="/event" component={EventList} />
            <Route exact path="/event/new" component={EventNew} />
            <Route exact path="/event/:id" component={EventShow} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({ userInfo })

export default connect(mapStateToProps, actions)(App);



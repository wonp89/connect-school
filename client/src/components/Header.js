import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize'
import '../assets/css/Header.css';

class Header extends Component {

    // must need userInfo to view and join the events
    isUserInfo() {
        if (this.props.auth._userInfo) {
            return <NavItem><Link to="/event">Event</Link></NavItem>
        }
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <Navbar left className="indigo lighten-1 nav-wrapper"><NavItem><a href="/auth/google">Login With Google</a></NavItem></Navbar>;
            default:
                return (
                    <div>
                        <Navbar left className="indigo lighten-1">
                            <NavItem><Link to="/">Home</Link></NavItem>
                            {this.isUserInfo()}
                            <NavItem><Link to="/userInfo">My Information</Link></NavItem>
                            <NavItem><a href="/api/logout">Logout</a></NavItem>
                        </Navbar>
                    </div>
                )
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header);
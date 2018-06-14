import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize'
import '../assets/css/Header.css';
import logo from "../assets/images/logo.png";
import logoBackgroundImage from "../assets/images/logoBackground.png";

class Header extends Component {

    // must need userInfo to view and join the events
    isUserInfo() {
        if (this.props.auth._userInfo) {
            return <NavItem><Link to="/event" className="black-text">Event</Link></NavItem>
        }
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <Navbar left className="white lighten-1">
                        <NavItem><Link to="/event" className="black-text">Event</Link></NavItem>
                        <NavItem><a href="/auth/google" className="black-text">Login With Google</a></NavItem>
                    </Navbar>
                        )
            default:
                return (
                    <div>
                        <Navbar left className="white lighten-1">
                            {this.isUserInfo()}
                            <NavItem><Link to="/userInfo" className="black-text">My Information</Link></NavItem>
                            <NavItem><a href="/api/logout" className="black-text">Logout</a></NavItem>
                        </Navbar>
                    </div>
                )
        }
    }

    render() {

        const logoBackground = {
            width: "100vw",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${logoBackgroundImage})`
        };

        return (
            <div>
                <div style={logoBackground}>
                <Link to="/"><img id="logo" src={logo} /></Link>
                </div>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header);
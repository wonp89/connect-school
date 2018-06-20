import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-materialize'
import '../assets/css/Header.css';
import logo from "../assets/images/logo.png";
import logoBackgroundImage from "../assets/images/logoBackground.png";

class Header extends Component {

    state = {
        navItems: [
            { name: 'home', to: '/' },
            { name: 'event', to: '/event' },
            { name: 'myInformation', to: '/userInfo' }
        ]
    }

    selectedNavItem(navItem) {
        this.setState({ active: navItem });
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <Navbar className="white lighten-1">
                        {this.state.navItems.map((navItem) => {
                            return navItem.name === 'event'
                                ? <li className="navItem"><Link
                                    to={navItem.to}
                                    className={this.state.active === navItem ? "orange-text navItem-link" : "black-text navItem-link"}
                                    onClick={this.selectedNavItem.bind(this, navItem)}>Event</Link></li>
                                : null
                        })}
                        <li className="black-text link-divider">|</li>
                        <li className="navItem"><a
                            href="/auth/google"
                            className="black-text navItem-link"
                        >Login With Google</a></li>
                    </Navbar>
                )
            default:
                return (
                    <div>
                        <Navbar className="white lighten-1">
                            {this.state.navItems.map((navItem) => {
                                return navItem.name === 'event'
                                    ? <li
                                        className="navItem"><Link
                                            to={navItem.to}
                                            className={this.state.active === navItem ? "orange-text navItem-link" : "black-text navItem-link"}
                                            onClick={this.selectedNavItem.bind(this, navItem)}
                                        >Event</Link></li>
                                    : null

                            })}
                            <li className="black-text link-divider">|</li>
                            {this.state.navItems.map((navItem) => {
                                return navItem.name === 'myInformation'
                                    ? <li
                                        className="navItem"><Link
                                            to={{ pathname: '/userinfo' }}
                                            className={this.state.active === navItem ? "orange-text navItem-link" : "black-text navItem-link"}
                                            onClick={this.selectedNavItem.bind(this, navItem)}>My Information</Link></li>
                                    : null
                            })}
                            <li className="black-text link-divider">|</li>
                            <li className="navItem"><a
                                href="/api/logout"
                                className="black-text navItem-link">Logout</a></li>
                        </Navbar>
                    </div>
                )
        }
    }

    render() {

        const logoBackground = {
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${logoBackgroundImage})`
        };

        return (
            <div>
                <div style={logoBackground}>
                    {this.state.navItems.map((navItem) => {
                        return navItem.name === 'home'
                            ? <Link
                                to={navItem.to}
                                onClick={this.selectedNavItem.bind(this, navItem)}>
                                <img id="logo" src={logo} alt="logo" />
                            </Link>
                            : null
                    })}
                </div>
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header);


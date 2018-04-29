import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Header extends Component {

    // // ------------- need to figureout the problem of sidenav -------
    // componentDidMount() {
    //     $(document).ready(function(){
    //         $('.sidenav').sidenav();
    //       });
    // }

    // must need userInfo to view and join the events
    isUserInfo () {
        if (this.props.auth._userInfo) {
            return <Link to="/event"><li style={{ marginLeft: "20px" }}>Event</li></Link>
        }
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return (
                    <div>
                        <Link to="/"><li>Home</li></Link>
                        {this.isUserInfo()}
                        <li className="right"><a href="/api/logout">Logout</a></li>
                        <Link to="/userInfo" className="right"><li style={{ marginLeft: "20px" }}>My Information</li></Link>
                    </div>
                )
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="indigo lighten-1 nav-wrapper">
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="hide-on-med-and-down">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/userInfo"><li>My Information</li></Link>
                    <Link to="/event"><li>Event</li></Link>
                    {/* <Link to="/event/new"><li>Event New</li></Link> */}
                    <li><a href="/api/logout">Logout</a></li>
                </ul>
            </div>

        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header);
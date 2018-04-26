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
                        <Link to="/userInfo"><li style={{ marginLeft: "20px" }}>My Information</li></Link>
                        <Link to="/meetup"><li style={{ marginLeft: "20px" }}>Meet Up</li></Link>
                        <Link to="/meetup/new"><li style={{ marginLeft: "20px" }}>Meet Up New</li></Link>
                        <li><a href="/api/logout">Logout</a></li>
                    </div>
                )
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="hide-on-med-and-down">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/userInfo"><li>My Information</li></Link>
                    <Link to="/meetup"><li>Meet Up</li></Link>
                    <Link to="/meetup/new"><li>Meet Up New</li></Link>
                    <li><a href="/api/logout">Logout</a></li>
                </ul>
            </div>

        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header);
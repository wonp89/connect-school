import React from 'react';
import '../assets/css/Footer.css'

const Footer = () => {

    return (
        <footer class="blue darken-3 page-footer">
            <div class="container">
                <div class="row">
                    <div class="col l3 s12 contact-container">
                        <h5 class="white-text">CONTACT</h5>
                        <i class="material-icons white-text left">email</i>
                        <p class="grey-text text-lighten-4">won@wonpark.ca</p>
                        <i class="material-icons white-text left">link</i>
                        <a href="https://www.wonpark.ca" class="grey-text text-lighten-4">www.wonpark.ca</a>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div>
                    © 2018 Copyright Won Park
                </div>
            </div>
        </footer>
    )
}

export default Footer;
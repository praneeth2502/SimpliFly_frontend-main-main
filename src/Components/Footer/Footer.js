import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h5>About SimplyFly</h5>
                        <p>SimplyFly is your one-stop solution for all your air travel needs. We are committed to providing you the best service.</p>
                    </div>
                    <div className="col-md-6 text-right"> {/* Push to the right */}
                        <h5>Connect with SimplyFly</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="https://www.facebook.com/SimplyFly">
                                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://twitter.com/SimplyFly">
                                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.instagram.com/SimplyFly">
                                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://www.linkedin.com/company/SimplyFly">
                                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <p>&copy; 2024 SimplyFly All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

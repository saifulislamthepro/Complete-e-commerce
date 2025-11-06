
import "./Footer.css";

export default function Footer() {




    return(
        <footer className="footer">
            <div className="footer-container">
                { /* <!-- Brand --> */}
                <div className="footer-section">
                <h2>SmartGen Digital</h2>
                <p>Building scalable digital solutions for e-commerce, SaaS, and creative storytelling in Bangladesh and beyond.</p>
                </div>

                { /* <!-- Navigation --> */}
                <div className="footer-section">
                <h3>Explore</h3>
                <ul>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                </div>

            { /* <!-- Contact --> */}
                <div className="footer-section">
                <h3>Contact</h3>
                <ul>
                    <li><i className="fas fa-envelope"></i> hello@smartgen.digital</li>
                    <li><i className="fas fa-map-marker-alt"></i> Dhaka, Bangladesh</li>
                    <li><i className="fab fa-upwork"></i> Upwork: @smartgen</li>
                </ul>
                </div>

            { /* <!-- Social --> */}
                <div className="footer-section">
                <h3>Follow Us</h3>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 SmartGen Digital. All rights reserved.
            </div>
        </footer>
    )
}
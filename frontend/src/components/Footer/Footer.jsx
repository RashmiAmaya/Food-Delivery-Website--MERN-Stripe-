import "./footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="footer" id="contact-us">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="logo" width={"290px"}/>
            <p>
              SpiceRoute - Your gateway to authentic Sri Lankan Chinese fusion cuisine. Order food online for delivery within Colombo city limits. Currently serving from our flagship branch in Colombo 03.
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="fb" />
              <img src={assets.linkedin_icon} alt="ln" />
              <img src={assets.twitter_icon} alt="tw" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+94 76 123 4567</li>
                <li>contact@spiceroute.com</li>
                <li>123 Galle Road, Colombo 03, Sri Lanka</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
            © {currentYear} SpiceRoute. All Rights Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;

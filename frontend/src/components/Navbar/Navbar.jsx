import { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import SearchModal from "../SearchModal/SearchModal";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalCartAmount, setToken } = useContext(StoreContext);
  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem("Token")
    localStorage.removeItem("Email")
    setToken("")
    navigate('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (menuItem, path = null) => {
    setMenu(menuItem);
    setIsMobileMenuOpen(false);
    
    if (path === 'home') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else if (path) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // const handleHomeClick = (e) => {
  //   e.preventDefault();
  //   setMenu("home");
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };

  const handleLogoClick = () => {
    setMenu("home");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Shadow logic
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Menu selection logic
      const sections = {
        "explore-menu": "menu",
        "app-download": "mobileapp",
        "contact-us": "contactus"
      };

      // Find the current section
      for (const [sectionId, menuValue] of Object.entries(sections)) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is in viewport (with some buffer)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setMenu(menuValue);
            return;
          }
        }
      }

      // If we're at the top, set to home
      if (window.scrollY < 100) {
        setMenu("home");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <button 
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link to={"/"} className="logo-a" onClick={handleLogoClick}>
          <img
            src={assets.logo}
            className="logo"
            alt="logo"
          />
        </Link>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <a 
            href="/"
            className={menu === "home" ? "active" : ""} 
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick("home", "home");
            }}
          >
            Home
          </a>
          <a
            href="#explore-menu"
            className={menu === "menu" ? "active" : ""}
            onClick={() => handleMenuClick("menu", "explore-menu")}
          >
            Menu
          </a>
          <a
            href="#app-download"
            className={menu === "mobileapp" ? "active" : ""}
            onClick={() => handleMenuClick("mobileapp", "app-download")}
          >
            Mobile App
          </a>
          <a
            href="#contact-us"
            className={menu === "contactus" ? "active" : ""}
            onClick={() => handleMenuClick("contactus", "contact-us")}
          >
            Contact Us
          </a>
        </div>
        <div className="navbar-right">
          <img 
            src={assets.search_icon} 
            alt="search" 
            onClick={() => setIsSearchOpen(true)}
            style={{ cursor: 'pointer' }}
          />
          <div className="navbar-search-icon">
            <Link to={"/cart"}>
              <img
                onClick={() => setMenu("cart")}
                src={assets.bag_icon}
                alt=""
              />
            </Link>
            <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
          </div>
          {localStorage.getItem('Token') ? (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="profile" onClick={()=> {navigate("/myprofile")}} />
              <ul className='nav-profile-dropdown'>
                <Link to={'/myorders'}><li><img src={assets.bag_icon} alt="bag" /> 
                  <p>Orders</p>
                </li></Link>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="logout" /><p>Logout</p></li>
              </ul>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          )}
        </div>
      </div>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default Navbar;

import "./navbar.css"
import {assets} from "../../assets/assets"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    onLogout(); // Call the callback to update app state
    navigate('/login', { replace: true });
  };

  const handleUpdate = () => {
    // Navigate to update profile page
    navigate('/update-profile');
  };

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <img 
        className='logo' 
        src={assets.logo} 
        alt="logo" 
        onClick={() => navigate('/')}
      />
      <div className="nav-right">
        <div className="profile-container" ref={dropdownRef}>
          <img 
            className='profile' 
            src={assets.profile_image} 
            alt="profile_pic"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <div className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`}>
            <div className="dropdown-item" onClick={handleUpdate}>
              <i className="fas fa-user-edit"></i>
              Update Profile
            </div>
            <div className="dropdown-item" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Navbar;
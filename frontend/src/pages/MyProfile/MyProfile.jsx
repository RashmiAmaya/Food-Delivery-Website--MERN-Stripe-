import { useEffect, useState } from "react";
import "./myprofile.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/outline";

function MyProfile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [apartmentNo, setApartmentNo] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const token = localStorage.getItem("Token");

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/");
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const email = localStorage.getItem("Email");
    setLoading(true);
    const response = await axios.post(
      `${DOMAIN}/api/user/getUserByEmail`,
      { email },
      { headers: { token } }
    );
    if (response.data.success) {
      setName(response.data.data.name || "");
      setEmail(response.data.data.email || "");
      setPhone(response.data.data.phoneNumber || "");
      setApartmentNo(response.data.data.apartmentNo || "");
      setArea(response.data.data.area || "");
      setStreet(response.data.data.street || "");
      setLandmark(response.data.data.landmark || "");
      setCity(response.data.data.city || "");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const response = await axios.post(
      `${DOMAIN}/api/user/updateUserByEmail`,
      { name, email, phone, apartmentNo, street, area, landmark, city },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      fetchUserData();
      setUpdateLoading(false);
    } else {
      setUpdateLoading(false);
      toast.error(response.data.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <UserIcon className="profile-icon" />
          <h2>My Profile</h2>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="profile-form-container">
          <form onSubmit={updateUser} className="profile-form">
            <div className="form-grid">
              <div className="form-left">
                <div className="profile-image">
                  <img src={assets.profile_image} alt="Profile" />
                  <h3>{name || "User Profile"}</h3>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => {
                      if (e.target.value.length <= 10) {
                        setPhone(e.target.value);
                      }
                    }}
                    maxLength="10"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    disabled
                    placeholder="Email"
                    value={email}
                  />
                </div>
              </div>

              <div className="form-right">
                <div className="form-section">
                  <h4>Delivery Address</h4>

                  <div className="form-group">
                    <label>Apartment & Street</label>
                    <div className="input-row">
                      <input
                        type="text"
                        placeholder="Apartment No"
                        value={apartmentNo}
                        onChange={(e) => setApartmentNo(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Area</label>
                    <input
                      type="text"
                      placeholder="Enter your locality"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Landmark & City</label>
                    <div className="input-row">
                      <input
                        type="text"
                        placeholder="Landmark"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-primary">
                {updateLoading ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/myorders")}
              >
                My Orders
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MyProfile;

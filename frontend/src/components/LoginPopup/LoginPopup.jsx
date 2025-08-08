import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

function LoginPopup({ setShowLogin }) {
  const { setToken, setEmail } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currState === "Sign Up") {
        setLoading(true);
        const response = await axios.post(`${DOMAIN}/api/user/register`, {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("Token", response.data.token);
          setCurrState("Login");
        } else {
          toast.error(response.data.message);
        }
      } else if (currState === "Login") {
        setLoading(true);
        const response = await axios.post(`${DOMAIN}/api/user/login`, {
          email: userData.email,
          password: userData.password,
        });
        if (response.data.success) {
          setEmail(response.data.email);
          localStorage.setItem("Email", response.data.email);
          localStorage.setItem("Token", response.data.token);
          setToken(response.data.token);
          setShowLogin(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleContainerClick = (e) => {
    e.stopPropagation(); // Prevent click from reaching the parent
  };

  return (
    <>
      <div className="login" onClick={() => setShowLogin(false)}>
        <div className="login-container" onClick={handleContainerClick}>
          <div className="login-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <form onSubmit={onSubmitHandler} className="login-form">
            <div className="login-inputs">
              {currState === "Sign Up" ? (
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={userData.name}
                  type="text"
                  placeholder="Your name"
                  required
                />
              ) : (
                <></>
              )}
              <div className={currState == "Sign Up" ? "email" : ""}>
                <input
                  name="email"
                  onChange={onChangeHandler}
                  value={userData.email}
                  type="email"
                  placeholder="Your email"
                  required
                />
                {currState == "Sign Up" ? (
                  <span>Use valid emai to receive order details*</span>
                ) : (
                  <></>
                )}
              </div>
              <div className="password">
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={userData.password}
                  type={showPassword ? "password" : "text"}
                  placeholder={
                    currState === "Sign Up"
                      ? "Set your password"
                      : "Your password"
                  }
                  required
                />
                <p onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "show" : "hide"}
                </p>
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {currState === "Sign Up"
                ? loading
                  ? "Processing..."
                  : "Create account"
                : loading
                ? "Logging in..."
                : "Login"}
            </button>
            {currState === "Sign Up" ? (
              <div className="login-condition">
                <input type="checkbox" required />
                <p>By continuing, I agree to terms of use & privacy policy.</p>
              </div>
            ) : (
              <></>
            )}

            {currState === "Sign Up" ? (
              <p>
                Already have an account?
                <span onClick={() => setCurrState("Login")}>Login</span>
              </p>
            ) : (
              <p>
                Create a new account?{" "}
                <span onClick={() => setCurrState("Sign Up")}>Sign up</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired
};

export default LoginPopup;

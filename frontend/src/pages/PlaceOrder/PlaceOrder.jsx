import { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, promoApplied } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const Token = localStorage.getItem("Token");
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codLoading, setCodLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: localStorage.getItem("Email") || "",
    apartmentNo: "",
    city: "",
    area: "",
    street: "",
    landmark: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const fetchUserData = async () => {
    const email = localStorage.getItem("Email");
    setDataLoading(true);
    const response = await axios.post(
      `${DOMAIN}/api/user/getUserByEmail`,
      { email },
      { headers: { Token } }
    );
    if (response.data.success) {
      setData({
        ...data,
        email: email,
        name: response.data.data.name || "",
        phone: response.data.data.phoneNumber || "",
        apartmentNo: response.data.data.apartmentNo || "",
        area: response.data.data.area || "",
        landmark: response.data.data.landmark || "",
        street: response.data.data.street || "",
        city: response.data.data.city || "",
      });
      setDataLoading(false);
    } else {
      toast.error(response.data.message);
      setDataLoading(false);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: promoApplied
        ? getTotalCartAmount() + 350 + 5 - 25
        : getTotalCartAmount() + 350 + 5,
      promoApplied,
    };
    setLoading(true);
    let response = await axios.post(
      `${DOMAIN}/api/order/placeorder`,
      orderData,
      {
        headers: {
          token,
        },
      }
    );
    if (response.data.success) {
      const { session_url } = response.data;
      setLoading(false);
      window.location.replace(session_url);
    } else {
      toast.error(response.data.message);
    }
  };

  const cod = async (e) => {
    e.preventDefault();
    console.log("Checking fields:", {
      name: data.name,
      email: data.email,
      apartmentNo: data.apartmentNo,
      city: data.city,
      area: data.area,
      street: data.street,
      phone: data.phone
    });

    if (
      data.name === "" ||
      data.email === "" ||
      data.apartmentNo === "" ||
      data.city === "" ||
      data.area === "" ||
      data.street === "" ||
      data.phone === ""
    ) {
      const emptyFields = Object.entries(data)
      .filter(([key, value]) => value === "" && key !== "landmark")
      .map(([key]) => key);
      toast.error(`Empty fields: ${emptyFields.join(", ")}`);
      return;
    }
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: promoApplied
        ? getTotalCartAmount() + 350 + 5 - 25
        : getTotalCartAmount() + 350 + 5,
      promoApplied,
    };
    setCodLoading(true);
    let response = await axios.post(`${DOMAIN}/api/order/cod`, orderData, {
      headers: {
        token,
      },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      setCodLoading(false);
      window.location.replace(session_url);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      toast.warn("Please login to continue.");
      navigate("/cart");
    }
    fetchUserData();
  }, [token, navigate]);

  return (
    <div className="place-order-container">
      <div className="place-order-header">
        <div className="header-title">
          <ShoppingBagIcon className="header-icon" />
          <h2>Place Order</h2>
        </div>
      </div>

      {getTotalCartAmount() > 0 ? (
        <div className="place-order-content">
          <form className="place-order-form" onSubmit={placeOrder}>
            <div className="form-section delivery-info">
              <h3>Delivery Information</h3>
              {dataLoading ? (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      required
                      name="name"
                      value={data.name}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      required
                      name="email"
                      value={data.email}
                      onChange={onChangeHandler}
                      type="email"
                      placeholder="Enter email address"
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      required
                      name="phone"
                      value={data.phone}
                      onChange={onChangeHandler}
                      type="number"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="address-grid">
                    <div className="form-group">
                      <label>Apartment No/Name</label>
                      <input
                        required
                        name="apartmentNo"
                        value={data.apartmentNo}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Enter apartment details"
                      />
                    </div>

                    <div className="form-group">
                      <label>Street</label>
                      <input
                        required
                        name="street"
                        value={data.street}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Enter street name"
                      />
                    </div>

                    <div className="form-group">
                      <label>Area</label>
                      <input
                        required
                        name="area"
                        value={data.area}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Enter area/locality"
                      />
                    </div>

                    <div className="form-group">
                      <label>Landmark (Optional)</label>
                      <input
                        name="landmark"
                        value={data.landmark}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Enter nearby landmark (optional)"
                      />
                    </div>

                    <div className="form-group">
                      <label>City</label>
                      <input
                        required
                        name="city"
                        value={data.city}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Enter city name"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {getTotalCartAmount()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee + GST</span>
                  <span>Rs. 350</span>
                </div>
                <div className="summary-row">
                  <span>Platform Fee</span>
                  <span>Rs. 5</span>
                </div>
                {promoApplied && (
                  <div className="summary-row discount">
                    <span>Discount Applied</span>
                    <span>- Rs. 25</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>Rs. {promoApplied ? getTotalCartAmount() + 350 + 5 - 25 : getTotalCartAmount() + 350 + 5}</span>
                </div>
              </div>

              <div className="payment-methods">
                <button type="submit" className="payment-button online" disabled={loading}>
                  {loading ? "Processing..." : (
                    <>
                      Pay Online
                      <div className="payment-icons">
                        <img src={assets.card} alt="card" />
                        <img src={assets.upi} alt="upi" />
                      </div>
                    </>
                  )}
                </button>

                <button type="button" className="payment-button cod" onClick={cod} disabled={codLoading}>
                  {codLoading ? "Processing..." : "Cash On Delivery"}
                </button>
                <p className="cod-note">This option will place your order for cash payment on delivery</p>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="empty-cart">
          <img src={assets.empty_cart} alt="empty cart" />
          <h2>Your cart is Empty.</h2>
          <p>
            Looks like you have not added anything to your cart. Go ahead and
            explore top categories.
          </p>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;

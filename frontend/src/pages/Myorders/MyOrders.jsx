import { useEffect, useState } from "react";
import "./myOrders.css";
import axios from "axios";
import { DOMAIN } from "../../config";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { ClockIcon } from "@heroicons/react/24/outline";

function MyOrders() {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("Token");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${DOMAIN}/api/order/userorder`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setdata(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
        setdata([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
      setdata([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="my-orders">
      {localStorage.getItem("Token") ? (
        <>
          {data.length === 0 ? (
            <div className="my-order-signout">
              <img src={assets.my_order} alt="No orders" />
              <p>Your order history is empty</p>
            </div>
          ) : (
            <>
              <h2>
                <ClockIcon className="header-icon" />
                Order History
              </h2>
              <div className="container">
                {data.reverse().map((order, index) => (
                  <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="order" />
                    <p className="order-items">
                      {order.items.map((item, i) => 
                        `${item.name} × ${item.quantity}${i < order.items.length - 1 ? ', ' : ''}`
                      )}
                    </p>
                    <p className="order-amount">Rs. {order.amount}.00</p>
                    <p className="order-count">Items: {order.items.length}</p>
                    <p className="status-dot">
                      <span>●</span> {order.status}
                    </p>
                    <p className="payment-status">
                      {!order.payment && order.cod ? 'Cash on Delivery' : 'Paid'}
                    </p>
                    <button onClick={fetchData}>Track Order</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="my-order-signout">
          <img src={assets.my_order} alt="Sign in" />
          <p>Please sign in to access your order history</p>
        </div>
      )}
    </div>
  );
}

export default MyOrders;

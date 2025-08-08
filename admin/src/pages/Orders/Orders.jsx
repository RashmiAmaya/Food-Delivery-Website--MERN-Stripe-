import "./orders.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { DOMAIN } from "../../config";
import toast from "react-hot-toast";
import { ShoppingBagIcon, TruckIcon, FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${DOMAIN}/api/order/update`, {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        toast.success("Order status updated");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesSearch = searchTerm === "" || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  const formatPrice = (amount) => {
    return `Rs. ${Number(amount).toFixed(2)}`;
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title">
          <ShoppingBagIcon className="users-icon" />
          <h2>Orders Management ({filteredOrders.length})</h2>
        </div>
        <div className="filter-section">
          <div className="search-bar">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search by order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="status-filter">
            <FunnelIcon className="filter-icon" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Orders ({orders.length})</option>
              <option value="Food Processing">
                Processing ({getStatusCount("Food Processing")})
              </option>
              <option value="Out for Delivery">
                Out for Delivery ({getStatusCount("Out for Delivery")})
              </option>
              <option value="Delivered">
                Delivered ({getStatusCount("Delivered")})
              </option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : filteredOrders.length > 0 ? (
        <div className="orders-container">
          {filteredOrders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <div className="order-title">
                  <TruckIcon className="order-icon" />
                  <div>
                    <h3>Order #{order._id.slice(-5)}</h3>
                    <span className={`order-status ${order.status.toLowerCase().replaceAll(' ', '-')}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="status-select"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="order-details">
                <div className="order-items">
                  <h4>Order Items</h4>
                  <p>{order.items.map((item, i) => 
                    `${item.name} × ${item.quantity}${i !== order.items.length - 1 ? ', ' : ''}`
                  )}</p>
                </div>

                <div className="customer-details">
                  <h4>Delivery Details</h4>
                  <p className="customer-name">{order.address.name}</p>
                  <p className="customer-address">
                    {[
                      order.address.apartmentNo,
                      order.address.street,
                      order.address.area,
                      order.address.city,
                      order.address.landmark
                    ].filter(Boolean).join(', ')}
                  </p>
                  <p className="customer-phone">{order.address.phone}</p>
                </div>

                <div className="order-summary">
                  <div className="summary-item">
                    <span>Items</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="summary-item">
                    <span>Payment</span>
                    <span className={`payment-status ${!order.payment && order.cod ? 'cod' : 'paid'}`}>
                      {!order.payment && order.cod ? 'COD' : 'Paid'}
                    </span>
                  </div>
                  <div className="summary-item total">
                    <span>Total</span>
                    <span>{formatPrice(order.amount)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          No orders found for selected status
        </div>
      )}
    </div>
  );
}

export default Orders;

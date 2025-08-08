import { useState, useEffect } from 'react';
import axios from 'axios';
import { DOMAIN } from '../../config';
import './dashboard.css';
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  Square3Stack3DIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/order/list`);
        if (response.data.success) {
          const orders = response.data.data;
          setStats({
            orders: orders.length,
            revenue: orders.reduce((acc, order) => acc + order.amount, 0),
            users: 0,
            products: 0
          });
          setRecentOrders(orders.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  const formatPrice = (amount) => {
    return `Rs. ${Number(amount).toFixed(2)}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="stats-container">
        <div className="stat-card revenue">
          <div className="stat-icon">
            <CurrencyDollarIcon />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>{formatPrice(stats.revenue)}</p>
            <span className="trend positive">+12.5% ↑</span>
          </div>
        </div>

        <div className="stat-card orders">
          <div className="stat-icon">
            <ShoppingBagIcon />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>{stats.orders}</p>
            <span className="trend positive">+5.2% ↑</span>
          </div>
        </div>

        <div className="stat-card users">
          <div className="stat-icon">
            <UsersIcon />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
            <span className="trend negative">-2.4% ↓</span>
          </div>
        </div>

        <div className="stat-card products">
          <div className="stat-icon">
            <Square3Stack3DIcon />
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p>{stats.products}</p>
            <span className="trend positive">+8.1% ↑</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="recent-orders">
          <h3>Recent Orders</h3>
          <div className="orders-list">
            {recentOrders.map((order, index) => (
              <div key={index} className="order-row">
                <div className="order-info">
                  <div className="order-icon">
                    <TruckIcon />
                  </div>
                  <div>
                    <h4>Order #{order._id.slice(-5)}</h4>
                    <p>{order.address.name}</p>
                  </div>
                </div>
                <div className="order-status">
                  <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                    {order.status}
                  </span>
                  <p className="amount">{formatPrice(order.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-stats">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="quick-stat-item">
              <h4>Pending Orders</h4>
              <p>{recentOrders.filter(o => o.status === "Food Processing").length}</p>
            </div>
            <div className="quick-stat-item">
              <h4>Delivered Today</h4>
              <p>{recentOrders.filter(o => o.status === "Delivered").length}</p>
            </div>
            <div className="quick-stat-item">
              <h4>Average Order</h4>
              <p>{formatPrice(stats.orders ? stats.revenue / stats.orders : 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

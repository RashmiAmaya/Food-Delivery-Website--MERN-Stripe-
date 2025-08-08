import { useEffect, useState } from "react";
import { DOMAIN } from "../../config";
import toast from "react-hot-toast";
import axios from "axios";
import { UsersIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "./user.css";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DOMAIN}/api/user/`);
      if (response.data.success) {
        setUsers(response.data.data || []);
      } else {
        toast.error(response.data.message || "Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error loading users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search functionality
  const filteredUsers = users.filter(user => {
    if (!searchTerm.trim()) return true;
    
    const search = searchTerm.toLowerCase().trim();
    return (
      (user?.name?.toLowerCase() || '').includes(search) ||
      (user?.email?.toLowerCase() || '').includes(search) ||
      (user?.phoneNumber?.toString() || '').toLowerCase().includes(search)
    );
  });

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title">
          <UsersIcon className="users-icon" />
          <h2>Users ({filteredUsers.length})</h2>
        </div>
        <div className="search-bar">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : filteredUsers.length > 0 ? (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id || index}>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber || "N/A"}</td>
                  <td>
                    <span className="user-status active">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-results">
          No users found matching {searchTerm}
        </div>
      )}
    </div>
  );
}

export default User;

import { useEffect, useState } from "react";
import "./list.css";
import { DOMAIN } from "../../config";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import axios from "axios";
import { Square3Stack3DIcon, PencilIcon } from "@heroicons/react/24/outline";

function List() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/api/food/list`);
      if (response.data.success) {
        setFoods(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch foods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title">
          <Square3Stack3DIcon className="users-icon" />
          <h2>Food Items ({foods.length})</h2>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading food items...</div>
      ) : (
        <div className="foods-table-container">
          <table className="foods-table">
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className={!food.available ? 'inactive' : ''}>
                  <td>
                    <div className="food-cell">
                      <img 
                        src={food.image} 
                        alt={food.name} 
                        className="food-image"
                      />
                      <div className="food-info">
                        <span className="food-name">{food.name}</span>
                        <span className={`food-type ${food.veg ? 'veg' : 'non-veg'}`}>
                          {food.veg ? 'Vegetarian' : 'Non-vegetarian'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{food.category}</td>
                  <td>Rs. {food.price}</td>
                  <td>
                    <span className={`status-badge ${food.available ? 'active' : 'inactive'}`}>
                      {food.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <Link to={`/update/${food._id}`} className="edit-button">
                      <PencilIcon className="edit-icon" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default List;

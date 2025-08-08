import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./update.css";
import axios from "axios";
import { DOMAIN } from "../../config";
import toast from "react-hot-toast";
import { PencilIcon, TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [data, setData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
    available: isAvailable,
    veg: "",
  });

  const fetchFoodData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${DOMAIN}/api/food/getFoodById/${id}`);
      if (response.data.success) {
        setData(response.data.data);
        setIsAvailable(response.data.data.available);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch food details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${DOMAIN}/api/food/update/available/${id}`, {
        price: data.price,
        name: data.name,
        available: data.available
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update food item");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await axios.post(`${DOMAIN}/api/food/remove`, { id });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/list');
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete food item");
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading food details...</div>;
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title">
          <PencilIcon className="users-icon" />
          <h2>Update Food Item</h2>
        </div>
        <button onClick={handleDelete} className="delete-button">
          <TrashIcon className="button-icon" />
          Delete Item
        </button>
      </div>

      <div className="update-form-container">
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-left">
              <div className="food-preview">
                {data.image ? (
                  <img 
                    src={data.image}
                    alt={data.name}
                    className="preview-image"
                  />
                ) : (
                  <div className="no-image">
                    <PhotoIcon className="no-image-icon" />
                    <p>No image available</p>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Enter food name"
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={data.category}
                  disabled
                  className="disabled-input"
                />
              </div>

              <div className="form-group">
                <label>Price (Rs)</label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={data.description}
                  disabled
                  className="disabled-input"
                  rows="3"
                />
              </div>

              <div className="form-group toggle-group">
                <label>Availability</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={data.available}
                    onChange={(e) => setData({ ...data, available: e.target.checked })}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="form-group">
                <label>Food Type</label>
                <div className="food-type-badge">
                  {data.veg ? (
                    <span className="badge veg">Vegetarian</span>
                  ) : (
                    <span className="badge non-veg">Non-vegetarian</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            <PencilIcon className="button-icon" />
            Update Food Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;

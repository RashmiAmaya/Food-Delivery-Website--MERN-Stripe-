import { useState } from "react";
import "./add.css";
import { DOMAIN } from "../../config";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusIcon, PhotoIcon } from "@heroicons/react/24/outline";

function Add() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    available: isAvailable,
    veg: "",
  });

  const handleVegChange = (e) => {
    const isVeg = e.target.value === "true";
    setData((prevData) => ({ ...prevData, veg: isVeg }));
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("available", Boolean(data.available));
    formData.append("veg", Boolean(data.veg));
    formData.append("image", image);
    const response = await axios.post(`${DOMAIN}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
        available: isAvailable,
        veg: "",
      });
      setImage(false);

      setLoading(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <div className="users-title">
          <PlusIcon className="users-icon" />
          <h2>Add New Food Item</h2>
        </div>
      </div>

      <div className="add-form-container">
        <form className="add-form" onSubmit={onSubmitHandler}>
          <div className="form-grid">
            <div className="form-left">
              <div className="image-upload-container">
                <label htmlFor="image" className="image-upload">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="upload-placeholder">
                      <PhotoIcon className="upload-icon" />
                      <p>Click to upload image</p>
                      <span>SVG, PNG, JPG (max. 800x400px)</span>
                    </div>
                  )}
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  required
                  hidden
                  accept="image/*"
                />
              </div>

              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={onChangeHandler}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={onChangeHandler}
                  placeholder="Enter product description"
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Starter">Starter</option>
                  <option value="Momos">Momos</option>
                  <option value="Soup">Soup</option>
                  <option value="Rice & Noodles">Rice & Noodles</option>
                  <option value="Special Combo">Special Combo</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Special Drinks">Special Drinks</option>
                  <option value="Hot Drinks">Hot Drinks</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price (Rs)</label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="form-group toggle-group">
                <label>Availability</label>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => {
                      setIsAvailable(e.target.checked);
                      setData((prevData) => ({
                        ...prevData,
                        available: e.target.checked,
                      }));
                    }}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="form-group">
                <label>Food Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="veg"
                      value="true"
                      checked={data.veg === true}
                      onChange={handleVegChange}
                    />
                    <span className="radio-text">Vegetarian</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="veg"
                      value="false"
                      checked={data.veg === false}
                      onChange={handleVegChange}
                    />
                    <span className="radio-text">Non-Vegetarian</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              "Adding Food..."
            ) : (
              <>
                <PlusIcon className="button-icon" />
                Add Food Item
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;

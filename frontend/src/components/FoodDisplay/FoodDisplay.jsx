import { useContext, useState, useEffect } from "react"; 
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list, loading } = useContext(StoreContext);
  const [sortOrder, setSortOrder] = useState("asc");
  const [vegOnly, setVegOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [category, vegOnly]);

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const handleVegSwitch = () => {
    setVegOnly((prevVegOnly) => !prevVegOnly);
  };

  const sortedFoodList = [...food_list]
    .filter((item) => (vegOnly ? item.veg : true))
    .filter((item) => (category === "All" ? true : category === item.category))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      }
      return 0;
    });

  const totalPages = Math.ceil(sortedFoodList.length / itemsPerPage);
  const paginatedFoodList = sortedFoodList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const element = document.getElementById('food-display');
    const elementPosition = element?.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 180;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <br />
      <motion.div 
        className="title"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Top dishes</h2>
        {!loading && (
          <motion.div 
            className="controls"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sort-container">
              <select id="sort" value={sortOrder} onChange={handleSort}>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
            <div className="veg-switch">
              <label>
                <input
                  type="checkbox"
                  checked={vegOnly}
                  onChange={handleVegSwitch}
                />
                <span>Veg Only</span>
              </label>
            </div>
          </motion.div>
        )}
      </motion.div>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="food-display" id="food-display">
          <AnimatePresence mode="wait">
            <motion.div 
              className="food-display-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={category + vegOnly + sortOrder + currentPage}
            >
              {paginatedFoodList.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FoodItem
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    category={item.category}
                    available={item.available}
                    veg={item.veg}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {sortedFoodList.length === 0 ? (
            <motion.div 
              className="no-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p>No items found for the selected criteria <span className="emoji">:(</span></p>
            </motion.div>
          ) : (
            <motion.div 
              className="pagination"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired
};

export default FoodDisplay;

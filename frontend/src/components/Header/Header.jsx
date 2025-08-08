import { useState, useEffect } from "react";
import "./header.css";

function Header() {
  const slides = [
    {
      title: "Authentic Sri Lankan Restaurant.",
      desc: "Order delicious Sri Lankan cuisine online now! Choose from a variety of options, including flavorful kottu, aromatic rice and curry, crispy hoppers, and more. Experience the authentic taste of Sri Lanka delivered straight to your door."
    },
    {
      title: "Fresh & Healthy Food Options",
      desc: "Discover our wide range of fresh, locally sourced ingredients prepared with authentic recipes. From traditional favorites to modern fusion dishes, we have something for everyone."
    },
    {
      title: "Special Offers & Combos",
      desc: "Enjoy great value with our special combo meals and daily offers. Perfect for family dinners or group orders, with generous portions and amazing flavors."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 7000); // Increased from 5000 to 7000ms for more comfortable reading time

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="header">
      <div className="header-backdrop">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`header-content ${index === current ? 'fade-in' : 'fade-out'}`}
          >
            <h2>{slide.title}</h2>
            <p>{slide.desc}</p>
            <a href="#explore-menu">
              <button>View Menu &nbsp; &rarr;</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;

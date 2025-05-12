import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <h1>Welcome to E-Shop</h1>
        <div className="home__hero">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3"
            alt="Shopping"
            className="home__image"
          />
          <div className="home__content">
            <h2>Discover Amazing Products</h2>
            <p>Shop the latest trends at unbeatable prices</p>
            <a href="/products" className="home__button">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 
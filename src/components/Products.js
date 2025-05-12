import React, { useState } from 'react';
import './Products.css';

function Products() {
  const [products] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      image: "https://via.placeholder.com/200",
      description: "This is product 1"
    },
    {
      id: 2,
      name: "Product 2",
      price: 149.99,
      image: "https://via.placeholder.com/200",
      description: "This is product 2"
    },
    // Add more products as needed
  ]);

  return (
    <div className="products">
      <h2>Our Products</h2>
      <div className="products__container">
        {products.map(product => (
          <div key={product.id} className="product__card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product__price">${product.price}</p>
            <button className="product__button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products; 
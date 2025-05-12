import React, { useState } from 'react';
import './Cart.css';

function Cart() {
  const [cartItems] = useState([]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart__container">
          {cartItems.map(item => (
            <div key={item.id} className="cart__item">
              <img src={item.image} alt={item.name} />
              <div className="cart__item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="cart__quantity">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart__total">
            <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            <button className="cart__checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart; 
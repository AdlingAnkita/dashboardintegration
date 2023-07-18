import React, { useContext } from 'react';
import CartContext from './CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - {item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

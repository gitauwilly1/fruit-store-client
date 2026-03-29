import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const getEmoji = (name) => {
  const emojis = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    strawberry: '🍓',
    pineapple: '🍍',
    watermelon: '🍉',
  }
  const key = name?.toLowerCase()
  return emojis[key] || '🍑'
}

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-emoji">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any fruits to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-emoji">{getEmoji(item.name)}</div>
              
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <div className="cart-item-price">Ksh {item.price.toFixed(2)}</div>
              </div>
              
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              
              <div className="cart-item-total">
                Ksh {(item.price * item.quantity).toFixed(2)}
              </div>
              
              <button onClick={() => removeFromCart(item._id)} className="remove-item-btn">
                ✕
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="cart-total">
            <span>Total:</span>
            <strong>Ksh {getCartTotal().toFixed(2)}</strong>
          </div>
          
          <div className="cart-actions">
            <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
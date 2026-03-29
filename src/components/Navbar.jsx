import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand-link">
          <div className="brand-dot"></div>
          <h1 className='text-red-500'>Fruit Store</h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to='/'>Fruits</Link>
          </li>
          <li>
            <Link to='/cart'>
              Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li>
            <Link to='/admin'>Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
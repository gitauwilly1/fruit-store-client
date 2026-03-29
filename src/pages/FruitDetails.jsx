import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import Loader from '../components/Loader'
import { useCart } from '../context/CartContext'

const FruitDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [fruit, setFruit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchFruitDetails = async () => {
      try {
        const response = await API.get(`/api/fruits/${id}`)
        setFruit(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFruitDetails()
  }, [id])

  const handleAddToCart = () => {
    addToCart(fruit, quantity)
    navigate('/cart')
  }

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

  if (loading) return <Loader />
  if (error) return <div className="error-state">Error: {error}</div>
  if (!fruit) return <div className="error-state">Fruit not found</div>

  return (
    <div className="fruit-details-page">
      <Link to="/" className="back-link">← Back to Fruits</Link>
      
      <div className="fruit-details-card">
        <div className="fruit-details-emoji">{getEmoji(fruit.name)}</div>
        
        <div className="fruit-details-info">
          <h1>{fruit.name}</h1>
          
          <div className="fruit-details-meta">
            <div className="detail-item">
              <strong>Price:</strong>
              <span className="detail-price">Ksh {fruit.price.toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <strong>Available Quantity:</strong>
              <span className={fruit.quantity > 0 ? "in-stock" : "out-of-stock"}>
                {fruit.quantity > 0 ? `${fruit.quantity} units` : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="fruit-description">
            <strong>Description:</strong>
            <p>
              Fresh {fruit.name} sourced from the best farms. 
              {fruit.quantity > 0 ? ' Ready for delivery to your doorstep!' : ' Currently out of stock.'}
            </p>
          </div>

          {fruit.quantity > 0 && (
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={fruit.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(fruit.quantity, Math.max(1, parseInt(e.target.value) || 1)))}
                />
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to Cart 🛒
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FruitDetails
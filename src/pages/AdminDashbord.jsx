import React, { useState, useEffect } from 'react'
import API from '../api/axios'
import Loader from '../components/Loader'

const AdminDashboard = () => {
  const [fruits, setFruits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingFruit, setEditingFruit] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  })

  useEffect(() => {
    fetchFruits()
  }, [])

  const fetchFruits = async () => {
    try {
      const response = await API.get('/api/fruits')
      const data = response.data
      setFruits(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
      setFruits([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingFruit) {
        await API.put(`/api/fruits/${editingFruit._id}`, formData)
      } else {
        await API.post('/api/fruits', formData)
      }
      fetchFruits()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (fruit) => {
    setEditingFruit(fruit)
    setFormData({
      name: fruit.name,
      price: fruit.price,
      quantity: fruit.quantity
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fruit?')) {
      try {
        await API.delete(`/api/fruits/${id}`)
        fetchFruits()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const resetForm = () => {
    setEditingFruit(null)
    setFormData({
      name: '',
      price: '',
      quantity: ''
    })
  }

  if (loading) return <Loader />
  if (error) return <div className="error-state">Error: {error}</div>

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your fruit inventory</p>
      </div>

      <div className="admin-form">
        <h2>{editingFruit ? 'Edit Fruit' : 'Add New Fruit'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Fruit Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price (Ksh)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingFruit ? 'Update Fruit' : 'Add Fruit'}
            </button>
            {editingFruit && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="fruits-list">
        <h2>Fruits Inventory</h2>
        <div className="admin-fruits-grid">
          {fruits.map((fruit) => (
            <div key={fruit._id} className="admin-fruit-card">
              <div className="admin-fruit-info">
                <h3>{fruit.name}</h3>
                <p>Price: Ksh {Number(fruit.price).toFixed(2)}</p>
                <p>Quantity: {fruit.quantity}</p>
              </div>
              <div className="admin-fruit-actions">
                <button onClick={() => handleEdit(fruit)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(fruit._id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
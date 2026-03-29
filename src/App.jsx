import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Fruits } from './pages/Fruits'
import FruitDetails from './pages/FruitDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Fruits />} />
          <Route path="/fruit/:id" element={<FruitDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App
import React from 'react'
import API from '../api/axios'
import Loader from '../components/Loader'
import FruitCard from '../components/FruitCard'
import { useState, useEffect } from 'react'

export const Fruits = () => {
    const [fruits, setFruits] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
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

        fetchFruits()
    }, [])

    if (loading) return <Loader />
    if (error) return <div className="error-state">Error: {error}</div>

    return (
        <div className="fruits-page">
            <div className="fruits-hero">
                <div className="hero-kicker">ORCHARD FRESH</div>
                <h2>Fresh Fruits</h2>
                <p>Discover the best selection of fresh fruits delivered straight to your doorstep.</p>
                <div className="hero-count">{fruits.length} fruits available</div>
            </div>
            <div className="fruits-grid">
                {fruits.map((fruit) => (
                    <FruitCard key={fruit._id} fruit={fruit} />
                ))}
            </div>
        </div>
    )
}
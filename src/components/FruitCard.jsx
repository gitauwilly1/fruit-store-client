import { Link } from 'react-router-dom'

const emojis = {
    apple: '🍎',
    banana: '🍌',
    orange: '🍊',
    grape: '🍇',
    strawberry: '🍓',
    pineapple: '🍍',
    watermelon: '🍉',
}

const getEmoji = (name) => {
    const key = name?.toLowerCase()
    return emojis[key] || '🍑'
}

const FruitCard = ({ fruit }) => {
    return (
        <Link to={`/fruit/${fruit._id}`} className="fruit-card-link">
            <div className='fruit-card'>
                <div className="fruit-emoji">{getEmoji(fruit.name)}</div>
                <div className="fruit-info">
                    <h3>{fruit.name}</h3>
                    <div className="fruit-meta">
                        <span className="fruit-price">Ksh {fruit.price.toFixed(2)}</span>
                        <span className="fruit-qty">Qty: {fruit.quantity}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default FruitCard
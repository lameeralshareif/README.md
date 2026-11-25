import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Produces oxygen at night and requires minimal care.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg',
          description: 'Filters indoor pollutants and thrives in bright indirect light.',
          cost: '$12',
        },
      ],
    },
    {
      category: 'Aromatic Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1565011523534-747a8601f10a?auto=format&fit=crop&w=800&q=80',
          description: 'Calming fragrance and attractive purple blooms.',
          cost: '$20',
        },
      ],
    },
  ];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <button type="button" onClick={onHomeClick}>Paradise Nursery</button>
        <button type="button" onClick={() => setShowCart(false)}>Plants</button>
        <button type="button" onClick={() => setShowCart(true)}>
          Cart ({totalQuantity})
        </button>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj) => (
            <div key={categoryObj.category}>
              <h2>{categoryObj.category}</h2>
              <div className="plant-list">
                {categoryObj.plants.map((plant) => {
                  const isAdded = Boolean(addedToCart[plant.name]);
                  return (
                    <div key={plant.name} className="plant-card">
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p>{plant.cost}</p>
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;

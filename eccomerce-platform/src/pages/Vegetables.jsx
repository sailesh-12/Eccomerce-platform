import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Cart from './Cart';

const Vegetables = () => {
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchVegetables();
  }, []);

  const fetchVegetables = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/vegetables');
      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to fetch vegetables');
      }
      const data = await response.json();
      setVegetables(data);
      setError(null);
    } catch (err) {
      setError('Failed to load vegetables. Please try again later.');
      console.error('Error fetching vegetables:', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setQuantities(prev => ({
      ...prev,
      [id]: newValue
    }));
  }

  const sortedVegetables = [...vegetables].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      const priceA = parseInt(a.price.match(/\d+/)[0]);
      const priceB = parseInt(b.price.match(/\d+/)[0]);
      return priceA - priceB;
    }
  });

  const filteredVegetables = sortedVegetables.filter(veg => {
    if (filter === 'all') return true;
    const price = parseInt(veg.price.match(/\d+/)[0]);
    switch (filter) {
      case 'under20': return price < 20;
      case '20to30': return price >= 20 && price <= 30;
      case 'above30': return price > 30;
      default: return true;
    }
  });

  const handleAddToCart = (id) => {
    if (quantities[id] > 0) {
      const quantity = quantities[id];
      const item = vegetables.find(v => v.id === id);
      setCartCount(prev => prev + quantity);
      setCartItems((prev) => [...prev, { ...item, quantity }]);
      setQuantities(prev => ({
        ...prev,
        [id]: 0
      }));
      localStorage.setItem('cart', JSON.stringify([...cartItems, { ...item, quantity }]));
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-green-600 text-xl">Loading vegetables...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <nav className="bg-green-600 text-white p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vegetable Store</h1>
          <div className="flex items-center gap-4">
            <select
              className="bg-green-700 text-white px-3 py-1 rounded outline-none focus:ring-green-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <select
              className="bg-green-700 text-white px-3 py-1 rounded outline-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under20">Under ₹20</option>
              <option value="20to30">₹20 - ₹30</option>
              <option value="above30">Above ₹30</option>
            </select>
            <Link to='/cart'>
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <span className="bg-white text-green-600 px-2 py-1 rounded-full font-bold">
                  {cartCount}
                </span>
              </div>
            </Link>

          </div>
        </div>
      </nav>

      <div className="mt-20 container mx-auto">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4'>
          {
            filteredVegetables.map((vegetable) => (
              <div key={vegetable.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                <div className="w-full h-48 overflow-hidden rounded-lg">
                  <img
                    src={vegetable.image}
                    alt={vegetable.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="mt-4 text-xl font-semibold">{vegetable.name}</h1>
                <p className="text-gray-600">{vegetable.price}</p>
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Quantity
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={quantities[vegetable.id] || ''}
                      onChange={(e) => handleQuantityChange(vegetable.id, e.target.value)}
                      className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                    <button
                      onClick={() => handleAddToCart(vegetable.id)}
                      disabled={!quantities[vegetable.id]}
                      className="bg-green-600 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                      
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Vegetables


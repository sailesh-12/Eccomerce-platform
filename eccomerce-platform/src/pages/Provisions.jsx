import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Provisions = () => {
  const [cartItems, setCartItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [provisions,setProvisions]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(null);

  useEffect(()=>{
    fetchProvisions();
    localStorage.setItem('provisionsCart',JSON.stringify(cartItems));
  },[cartItems]);
  

  const fetchProvisions=async()=>{
    setLoading(true);
    try{
      const response=await fetch('http://localhost:3000/api/provisions');
      console.log(response);
      
      if(!response.ok){
        throw new Error('Failed to fetch provisions');
      }
      const data=await response.json();
      setProvisions(data);  

    }catch(err){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  if(loading){
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-green-600 text-xl'>Loading provisions...</div>
      </div>
    )
  }
  if(error){
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-red-600 text-xl'>{error}</div>
      </div>
    )
  }


  const handleAddToCart = (id) => {
    if (quantities[id] > 0) {
      const itemToAdd = provisions.find(item => item.id === id);
      const existingItem = cartItems.find(item => item.id === id);

      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantities[id] }
            : item
        ));
      } else {
        setCartItems([...cartItems, { ...itemToAdd, quantity: quantities[id] }]);
      }

      setQuantities(prev => ({
        ...prev,
        [id]: 0
      }));
    }
  }

  const sortedProvisions = [...provisions].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    else {
      const priceA = parseInt(a.price.match(/\d+/)[0]);
      const priceB = parseInt(b.price.match(/\d+/)[0]);
      return priceA - priceB;
    }
  });

  const filteredProvisions = sortedProvisions.filter(item => {
    if (filter === 'all') return true;
    const price = parseInt(item.price.match(/\d+/)[0]);
    switch (filter) {
      case 'under50': return price < 50;
      case '50to100': return price >= 50 && price <= 100;
      case 'above100': return price > 100;
      default: return true;
    }
  });

  const handleQuantityChange = (id, value) => {
    let newvalue = Math.max(0, parseInt(value) || 0);
    setQuantities(prev => ({ ...prev, [id]: newvalue }));
  }

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className=''>
      <nav className='bg-green-600 fixed p-4 top-0 left-0 right-0 z-10 text-white'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-6'>
            <h1 className='text-2xl font-bold'>
              <Link to="/provisions" className='cursor-pointer text-2xl'>
                Provisions
              </Link>
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            <select 
              className='bg-green-700 text-white px-3 py-1 rounded outline-none focus:ring-green-200'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort By Name</option>
              <option value="price">Sort By Price</option>
            </select>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='bg-green-700 text-white px-3 py-1 rounded outline-none focus:ring-green-200'
            >
              <option value="all">All Prices</option>
              <option value="under50">Under ₹50</option>
              <option value="50to100">₹50 - ₹100</option>
              <option value="above100">Above ₹100</option>
            </select>
            <Link to="/provisions-cart" className='flex items-center justify-evenly gap-2'>
              <span>&#128722;</span>
              <h2 className='text-xl bg-white text-green-600 p-1 font-bold rounded-sm'>
                {getTotalCartItems()}
              </h2>
            </Link>
          </div>
        </div>
      </nav>

      <div className='mt-20 container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
          {filteredProvisions.map((item) => (
            <div className='bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition' key={item.id}>
              <div className='w-full h-48 overflow-hidden rounded-lg'>
                <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
              </div>
              <h1 className='mt-4 text-2xl font-semibold'>{item.name}</h1>
              <p className='font-semibold text-gray-600 mt-2'>Price: {item.price}</p>
              <p className='text-xl font-semibold text-gray-500 mt-2'>{"Quantity:"}</p>
              <div className='flex items-center gap-2 mb-2'>
                <input
                  type="number"
                  min="0"
                  value={quantities[item.id] || "0"}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  placeholder="0"
                  className='w-20 mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                />
                <button
                  onClick={() => handleAddToCart(item.id)}
                  disabled={!quantities[item.id]}
                  className="bg-green-600 mt-2 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Provisions 
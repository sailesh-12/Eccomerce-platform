import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
  
const FruitsCart = () => {
  const storedItems = JSON.parse(localStorage.getItem('fruits-cart')) || [];
  console.log(storedItems);
  
  const getTotal = () => {
    let subTotal = 0;
    for(const fruit of storedItems){
      subTotal += parseInt(fruit.price.match(/\d+/)[0]) * fruit.quantity;
    }
    return subTotal;
  }

  
  const getTotalQuantity = () => {
    let quantities = 0;
    for(const fruit of storedItems){
      quantities += fruit.quantity
    }
    return quantities
  }

  const handleRemove = (id) => {
    const updatedItems = storedItems.filter(item => item.id !== id);
    localStorage.setItem('fruits-cart', JSON.stringify(updatedItems));
    window.location.reload();
  }

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = storedItems.map(item => 
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    localStorage.setItem('fruits-cart', JSON.stringify(updatedItems));
    window.location.reload();
  }

  const handleCheckout=async ()=>{
    const response=await axios.post('http://localhost:3000/api/checkout',{
      totalAmount:getTotal(),
      totalQuantity:getTotalQuantity(),
    })
    window.location.href=response.data.url;
  }
  const subTotal = getTotal();
  const quantities = getTotalQuantity();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Fruits Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {storedItems.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow">
                <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
                <Link to="/fruits" className="text-green-600 hover:text-green-700 font-semibold">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              storedItems.map((fruit) => (
                <div key={fruit.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-32 h-32 bg-gray-200 rounded">
                    <img src={fruit.image} className='object-cover w-full h-32' alt={fruit.name} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{fruit.name}</h2>
                    <p className="text-green-600 font-bold mt-2">{fruit.price}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <input 
                        type="number" 
                        min="1" 
                        value={fruit.quantity} 
                        onChange={(e) => handleQuantityChange(fruit.id, e.target.value)}
                        className="w-20 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500" 
                      />
                      <button 
                        onClick={() => handleRemove(fruit.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {storedItems.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{quantities}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Subtotal:</span>
                <span>₹{subTotal}</span>
              </div>

              <button onClick={handleCheckout} className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FruitsCart

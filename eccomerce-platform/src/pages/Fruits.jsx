import React, { useEffect, useState } from 'react'
import Vegetables from './Vegetables';
import { Link } from 'react-router-dom';

const Fruits = () => {
	
	const [filter, setFilter] = useState('all');
	const [quantities, setQuantities] = useState({});
	const [sortBy, setSortBy] = useState('name');
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [fruits,setFruits]=useState([]);
	const [loading,setLoading]=useState(true);
	const [error,setError]=useState(null);

	useEffect(()=>{
		fetchFruits();
	},[]);
	useEffect(() => {
	const storedCart = JSON.parse(localStorage.getItem('fruits-cart')) || [];
	setCartItems(storedCart);

	const total = storedCart.reduce((acc, item) => acc + item.quantity, 0);
	setCartCount(total);
}, []);


	const fetchFruits=async ()=>{
		setLoading(true);
		try{
			const response=await fetch('https://eccomerce-backend-11dr.onrender.com/api/fruits');
			console.log(response);																																		
			
			if(!response.ok){																	
				throw new Error('Failed to fetch fruits');
			}
			const data=await response.json();
			setFruits(data);

		}catch(error){
			console.error('Error fetching fruits:',error);
			setError(error.message);
		}finally{
			setLoading(false);
		}
	}
	const handleAddToCart = (id) => {
		const item = fruits.find((fruit) => fruit.id === id);
		const quantity = quantities[id]
		if (quantities[id] > 0) {
			setCartCount(prev => prev + quantities[id]);
			setCartItems(prev => [...prev, { ...item, quantity }])
			setQuantities(prev => ({
				...prev,
				[id]: 0
			}));
		}
		localStorage.setItem('fruits-cart', JSON.stringify([...cartItems, { ...item, quantity }]))
	}
	const sortedFruits = [...fruits].sort((a, b) => {
		if (sortBy === 'name') {
			a.name.localeCompare(b.name)
		}
		else {
			const priceA = parseInt(a.price.match(/\d+/)[0]);
			const priceB = parseInt(b.price.match(/\d+/)[0]);
			return priceA - priceB;
		}
	})
	const filteredFruits = sortedFruits.filter(veg => {
		if (filter === 'all') return true;
		const price = parseInt(veg.price.match(/\d+/)[0]);
		switch (filter) {
			case 'under100': return price < 100;
			case '100to200': return price >= 100 && price <= 200;
			case 'above200': return price > 200;
			default: return true;
		}
	});
	const handleQuantityChange = (id, value) => {
		let newvalue = Math.max(0, parseInt(value) || 0);
		setQuantities(prev => ({ ...prev, [id]: newvalue }));
	}
	if (loading) {
		return (
		  <div className="min-h-screen flex items-center justify-center">
			<div className="text-green-600 text-xl">Loading Fruits...</div>
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
		<div className=''>
			<nav className='bg-green-600 fixed p-4 top-0 left-0 right-0 z-10 text-white'>
				<div className='container mx-auto flex justify-between items-center '>
					<Link className='cursor-pointer text-2xl font-bold' to='/dashboard' ><h1 className='text-2xl font-bold '></h1>Fruits</Link>
					
					<div className='flex items-center gap-4'>
						<select className='bg-green-700 text-white px-3 py-1 rounded outline-none focus:ring-green-200' value={sortBy}
							onChange={(e) => setSortBy(e.target.value)} name="" id="">
							<option name="name" value="">
								Sort By Name
							</option>
							<option name="price" value="">
								Sort By Price
							</option>
						</select>
						<select name="" id="" value={filter}
							onChange={(e) => setFilter(e.target.value)} className='bg-green-700 text-white px-3 py-1 rounded outline-none focus:ring-green-200'>
							<option value="all">All Prices</option>
							<option value="under100">Under ₹100</option>
							<option value="100to200">₹100 - ₹200</option>
							<option value="above200">Above ₹200</option>
						</select>
						<Link to='/fruits-cart' className='cursor-pointer'>
							<div className='flex items-center justify-evenly gap-2'>
								<span>&#128722;</span>
								<h2 className='text-xl bg-white text-green-600 p-1 font-bold rounded-sm '>{cartCount}</h2>
							</div>
						</Link>
					</div>
				</div>
			</nav>

			<div className='mt-20 container mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
					{
						filteredFruits.map((fruit) => (
							<div className='bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition' key={fruit.id} >
								<div className='w-full h-48 overflow-hidden rounded-lg'>
									<img src={fruit.image} alt={fruit.name} />
								</div>
								<h1 className=' mt-4 text-2xl font-semibold '>{fruit.name}</h1>
								<p className='font-semibold text-gray-600 mt-2'>Price:  {fruit.price}</p>
								<p className='text-xl font-semibold text-gray-500 mt-2'>{"Quantity:"}</p>
								<div className='flex items-center gap-2 mb-2'>
									<input type="number" min={"0"} value={quantities[fruit.id] || "0"} onChange={(e) => handleQuantityChange(fruit.id, e.target.value)} placeholder="0" className='w-20 mt-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500' />
									<button
										onClick={() => handleAddToCart(fruit.id)}
										disabled={!quantities[fruit.id]}
										className="bg-green-600 mt-2 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Add to Cart
									</button>
								</div>
							</div>
						))
					}
				</div>
			</div>
			
		</div>
	)
}

export default Fruits

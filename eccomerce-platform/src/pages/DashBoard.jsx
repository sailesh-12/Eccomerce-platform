import React from 'react'
import fruits from '../../public/pexels-janetrangdoan-1132047.jpg?url';
import background from '../../public/background.gif'
import { Link } from 'react-router-dom'
import '../index.css'
const DashBoard = () => {
	return (
		<div className='bg-green-200 min-h-screen  px-4 sm:px-8 lg:px-20 py-8'>
			<Link
				to="/home"
				className="text-sm  hover:shadow-lg p-2 font-extrabold rounded-md bg-red-400 cursor-pointer"
			>
				Back to Home
			</Link>

			<div className="relative w-full h-[30vh] rounded-md mt-4 overflow-hidden">
				<img
					src="https://png.pngtree.com/thumb_back/fh260/back_our/20190620/ourmid/pngtree-summer-atmosphere-restaurant-supermarket-vegetable-psd-layered-promotion-background-image_159939.jpg"
					alt="FreshMart Banner"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
					<h1 className="text-green-100 text-4xl mb-10 sm:text-5xl font-bold mb-2">Welcome to FreshMart</h1>
					<p className="text-black font-bold  text-lg sm:text-xl max-w-xl">Your one-stop shop for fresh vegetables, fruits, and provisions.</p>
				</div>
			</div>


			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 cursor-pointer'>
				<Link to='/vegetables'>
					<div className='bg-yellow-400 rounded-lg shadow-md hover:shadow-l p-4 transition hover:scale-105 m-4 sm:m-3 lg:m-6'>
						<h1 className='text-xl font-semibold'>Vegetables</h1>
						<img
							src="https://media.istockphoto.com/id/453963935/photo/fruits-and-vegetables-at-city-market-in-riga.jpg?s=612x612&w=0&k=20&c=YLdfhKvGlc6woYVN93OfCVzEUbDdgnqODsvypz3aBvc="
							alt="Vegetables"
							height={"300px"}
							className='w-full object-cover rounded-md mt-1 mb-2'
						/>
						<p className='text-sm text-black-600'>
							Fresh, organic vegetables sourced from local farms to ensure the best quality and taste for your meals.
						</p>
					</div>
				</Link>

				<Link to='/fruits'>
					<div className='bg-red-400 cursor-pointer rounded-lg shadow-md hover:shadow-l p-6 transition hover:scale-105 m-4 sm:m-3 lg:m-6'>
						<h1 className='text-xl font-semibold'>Fruits</h1>
						<img src={fruits} className='w-full object-cover rounded-md mt-2 mb-2' height={"300px"} alt="Fruits" />
						<p className='text-sm text-black-600'>
							Juicy and ripe fruits picked at peak season, offering a delicious and healthy snack option every day.
						</p>
					</div>
				</Link>

				<Link to='/provisions'>
					<div className='bg-orange-400 rounded-lg cursor-pointer shadow-md hover:shadow-l p-6 transition hover:scale-105 m-4 sm:m-3 lg:m-6'>
						<h1 className='text-xl font-semibold'>Provisions</h1>
						<img
							src="https://content.jdmagicbox.com/comp/valsad/j8/9999p2632.2632.130606145417.t6j8/catalogue/ashirwad-provision-stores-valsad-valsad-grocery-stores-27h2eg6.jpg"
							alt="Provisions"
							className='w-full object-cover rounded-md mt-1 mb-2'
							height={"700px"}
						/>
						<p className='text-sm text-black-600'>
							Essential daily provisions including grains, pulses, and spices to keep your kitchen well-stocked and ready.
						</p>
					</div>
				</Link>

			</div>
		</div>
	)
}

export default DashBoard

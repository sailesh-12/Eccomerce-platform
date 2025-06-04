import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Navigation */}
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						<div className="flex-shrink-0">
							<h1 className="text-2xl font-bold text-green-600">FreshMart</h1>
						</div>
						<div className="hidden sm:flex sm:space-x-8">
							<Link to="/vegetables" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md">Vegetables</Link>
							<Link to="/fruits" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md">Fruits</Link>
							<Link to="/provisions" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md">Provisions</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="relative bg-white overflow-hidden">
				<div className="max-w-7xl mx-auto">
					<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
						<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
							<div className="sm:text-center lg:text-left">
								<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
									<span className="block">Fresh Groceries</span>
									<span className="block text-green-600">Delivered to Your Door</span>
								</h1>
								<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
									Get fresh vegetables, fruits, and provisions delivered right to your doorstep. Shop from our wide selection of quality products at great prices.
								</p>
								<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
									<div className="rounded-md shadow">
										<Link to="/dashboard" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
											Start Shopping
										</Link>
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="py-12 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="lg:text-center">
						<h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Why Choose Us?
						</p>
					</div>

					<div className="mt-10">
						<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
							<div className="flex flex-col items-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
									🚚
								</div>
								<h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Fast Delivery</h3>
								<p className="mt-2 text-base text-gray-500">
									Same day delivery for orders placed before 2 PM
								</p>
							</div>

							<div className="flex flex-col items-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
									🥬
								</div>
								<h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Fresh Products</h3>
								<p className="mt-2 text-base text-gray-500">
									Farm-fresh vegetables and fruits sourced daily
								</p>
							</div>

							<div className="flex flex-col items-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
									💰
								</div>
								<h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Best Prices</h3>
								<p className="mt-2 text-base text-gray-500">
									Competitive prices and regular discounts
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="bg-white">
				<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
					<div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
						<div className="flex space-x-6 md:order-2">
							<Link to="#" className="text-gray-400 hover:text-gray-500">
								About Us
							</Link>
							<Link to="#" className="text-gray-400 hover:text-gray-500">
								Contact
							</Link>
							<Link to="#" className="text-gray-400 hover:text-gray-500">
								Terms
							</Link>
						</div>
						<p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
							© 2024 GreenMart. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Home

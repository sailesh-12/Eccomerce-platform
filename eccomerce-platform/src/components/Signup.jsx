import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
	const [username,setUsername]=useState('');
	const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');
	const [error,setError]=useState('');
	const [loading,setLoading]=useState(false);
	const navigate=useNavigate();

	const handleSignup=async(e)=>{
		e.preventDefault();
		try{
			setLoading(true);
			const response=await axios.post("https://eccomerce-backend-11dr.onrender.com/api/auth/signup",{
				username,email,password
			})
			console.log(response);
			localStorage.setItem("token",response.data.token);
			localStorage.setItem("user",JSON.stringify(response.data.user));
			setUsername("");
			setEmail("");
			setPassword("");
			navigate("/home");
		}catch(err){
			setError(err.response?.data?.message || "Failed to signup");
			console.log(err);
		}finally{
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="text-3xl font-extrabold text-green-600 text-center mb-2">FreshMart</h1>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Create your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Already have an account?{' '}
					<Link to="/" className="font-medium text-green-600 hover:text-green-500">
						Sign in here
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSignup}>
						<div>
							<label htmlFor="name" className="block text-sm font-medium text-gray-700">
								Full Name
							</label>
							<div className="mt-1">
								<input
									id="name"
									name="name"
									type="text"
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
									placeholder="Enter your full name"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
									placeholder="Enter your email"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
									placeholder="Create a password"
								/>
							</div>
						</div>

						<div className="flex items-center">
							<input
								id="terms"
								name="terms"
								type="checkbox"
								required
								className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
							/>
							<label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
								I agree to the{' '}
								<a href="#" className="text-green-600 hover:text-green-500">
									Terms and Conditions
								</a>
							</label>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							>
								Create Account
							</button>
						</div>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or sign up with</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<div>
								<a
									href="#"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									Google
								</a>
							</div>
							<div>
								<a
									href="#"
									className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
								>
									Facebook
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup

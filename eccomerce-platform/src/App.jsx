import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import DashBoard from './pages/DashBoard'
import Vegetables from './pages/Vegetables'
import Fruits from './pages/Fruits'
import Provisions from './pages/Provisions'
import FruitsCart from './pages/FruitsCart'
import ProvisionsCart from './pages/ProvisionsCart'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/provisions" element={<Provisions />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/fruits-cart" element={<FruitsCart />} />
        <Route path="/provisions-cart" element={<ProvisionsCart />} />
      </Routes>
    </>
  )
}

export default App

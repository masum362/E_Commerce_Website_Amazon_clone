import Navbar from './components/Header/Navbar'
import Newnav from './components/newnavbar/Newnav'
import './app.css'
import Maincom from './components/home/Maincom'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './components/Authentication_page/Signin'
import Signup from './components/Authentication_page/Signup'
import Cart from './components/cart/Cart'
import Buynow from './components/buynow/Buynow'
import { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'


function App() {
  const [isloading, setIsloading] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setIsloading(true);
    }, 1000);
  }, [])
  return (
    <Router>
      <Navbar />
      <Newnav />
      {isloading && <Routes>
        <Route path='/' element={<Maincom />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/singleproduct/:id' element={<Cart />} />
        <Route path='/buynow' element={<Buynow />} />
      </Routes>}
      {!isloading && <ScaleLoader

        color={"#000"}
        size={150}
        style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
        aria-label="Loading Spinner"
        data-testid="loader" />}

      <Footer />
    </Router>
  )
}

export default App

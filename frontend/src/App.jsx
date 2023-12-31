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
import { useContext, useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'
import Users from './components/Admin/Users/Users'
import EditUser from './components/Admin/Users/EditUser'
import AddNewUser from './components/Admin/Users/AddNewUser'
import Products from './components/Admin/Products/Products'
import AddNewProduct from './components/Admin/Products/AddNewProduct'
import EditProduct from './components/Admin/Products/EditProduct'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import Error from './components/Error/Error'
import { LoginContext } from './components/context/AccountContext'

function App() {
  const [isloading, setIsloading] = useState(false);
  const [isAdmin , setIsadmin] = useState(false);


  const { account,setAccount } = useContext(LoginContext);
console.log({account})
 
  console.log({isAdmin})



  useEffect(() => {
    const userRole = () => {
      if(account?.role==='admin') {
        return setIsadmin(true)
      }else{
       return setIsadmin(false)
      }
    }
    userRole();
  }, [account])


  return (
    <Router>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path='/' element={<Maincom />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/singleproduct/:id' element={<Cart />} />
        <Route path='/buynow' element={<Buynow />} />
        <Route path='*' element={<Error />} />
        <Route path='/dashboard' element={<Dashboard />} />

        {isAdmin && <>
          <Route path='/users' element={<Users />} />
          <Route path='/adduser' element={<AddNewUser />} />
          <Route path='/products' element={<Products />} />
          <Route path='/edit/:id' element={<EditUser />} />
          <Route path='/addproduct' element={<AddNewProduct />} />
          <Route path='/product/edit/:id' element={<EditProduct />} />
          
        </>}

      </Routes>

      <Footer />
    </Router>
  )
}

export default App

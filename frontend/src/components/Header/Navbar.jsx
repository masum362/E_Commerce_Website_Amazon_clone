import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import logo from '../../assets/amazon_logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/AccountContext'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { base_url } from '../../../base';



const Navbar = () => {

  const { account, setAccount } = useContext(LoginContext);
  const { products } = useSelector(state => state.productsR)

  const [searchInput, setSearchInput] = useState('')

  const [toggle, setToggle] = useState(false);
  const [sidebar, setSidebar] = useState(false);



  const navigate = useNavigate();



  const logOut = async () => {

    await axios(`${base_url}/logout`, {
      method: 'GET',
      headers: {
        contentType: 'application/json',
        Accept: 'application/json',
        headers:{
          Authorization: 'Bearer ' +localStorage.getItem('token')
        }

      },
      withCredentials: true
    }).then(res => {
      console.log(res.data);
      setAccount('')
      navigate('/signin')
    }).catch(err => console.log(err));
  }

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  const handleAfterClick = () => {
    setSearchInput('')
  }


  return (
    <header className=''>
      <nav>
        <div className='left '>

          {/* sidebar Start */}
          <i className="hamburgur fa-solid fa-bars text-white  cursor-pointer" onClick={() => setSidebar(!sidebar)}></i>

          {sidebar && <aside onClick={() => setSidebar(!sidebar)} className='fixed top-0 left-0 z-40 w-48 h-screen  '>
            <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
              <i className="hamburgur space-y-2 px-3 my-2 fa-solid fa-bars text-black  cursor-pointer" onClick={() => setSidebar(!sidebar)}></i>
              {account && <span className='text-center w-full h-full m-auto ml-2'>Wellcome</span>}
              <hr />
              <ul className='space-y-2 font-medium ' >
                <li>
                  <NavLink to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Home</NavLink>
                </li>
                <li>
                  <NavLink to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Best Choose</NavLink>
                </li>

                <li>
                  <NavLink to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Today's Deal</NavLink>
                </li>


                <li>
                  {account ? <NavLink to={'/'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => logOut()}>Sign out</NavLink> :
                    <NavLink to={'/signin'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Sign In</NavLink>}
                </li>

              </ul>
            </div>
          </aside>}

          {/* sidebar End */}


          <div className="navlogo">
            <NavLink to={'/'}>
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" placeholder='Search your product' value={searchInput} onChange={(e) => handleSearchInput(e)} />
            <div className='search_icon' onClick={() => handleInputSubmit()} >
              <i className="fa-solid fa-magnifying-glass" ></i>
            </div>


            {/* Search Filter Start */}
            {searchInput && <div className='extrasearch'>
              <ul className=' m3'>
                {products.filter(product => product.title.longTitle.toLowerCase().includes(searchInput.toLowerCase())).map(product => (
                  <NavLink className={"p4 hover:bg-blue-gray-200 block"} to={`/singleproduct/${product._id}`} onClick={() => handleAfterClick()}>{product.title.longTitle}</NavLink>
                ))}
              </ul>
            </div>}

            {/* Search Filter End */}



          </div>

        </div>

        <div className='right gap-5 flex '>
          {!account && <div className='text-white'>
            <NavLink className='' to="/signin">Sign In</NavLink>
          </div>}

          {account && <div className=''>

            <NavLink to="/buynow" type="button" className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white  rounded-lg ">
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-white " >{account ? account.cart.length : 0}</div>
              <i class="fa-solid fa-cart-shopping text-base text-yellow-600"></i>

            </NavLink>

          </div>}
          {
            account && <button onClick={() => setToggle(!toggle)} className="text-gray-600  bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-2  text-center inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-blue-800 relative" type="button"><span className="text-gray-600   text-2xl mx-3 cursor-pointer" id="menu-button">{account.name[0].toUpperCase()}</span></button>
          }




          <div onClick={() => setToggle(!toggle)} style={toggle ? { display: " block " } : { display: "none" }} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-24 text-center dark:bg-gray-700 absolute right-12 top-14">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" >

              {account?.role === 'admin' && <li>
                <NavLink to="/dashboard" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</NavLink>
              </li>}


              <li>
                <NavLink to="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</NavLink>
              </li>
              <li>
                <NavLink to="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</NavLink>
              </li>
              <li>
                <NavLink to={'/'} className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => logOut()}>Sign out</NavLink>
              </li>
            </ul>
          </div>





        </div>


      </nav>
    </header>
  )
}

export default Navbar
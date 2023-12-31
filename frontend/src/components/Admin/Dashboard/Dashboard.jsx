import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { LoginContext } from '../../context/AccountContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'

const Dashboard = () => {

  const { account, setAccount } = useContext(LoginContext)
  const [isAdmin, setIsadmin] = useState(false)

  const navigate = useNavigate()

  console.log(account)

  useEffect(() => {


    setTimeout(() => {
      if (account?.role === 'admin') {
        setIsadmin(true)
      }
      else {
        navigate('/login')
      }
    }, 3000);

  }, [account])

  

  return (
    <div >
      {!isAdmin ? <ScaleLoader

        color={"#000"}
        size={150}
        style={{ margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
        aria-label="Loading Spinner"
        data-testid="loader" /> : <div className='h-screen w-full relative top-[60px] flex bg-[#e7e7e7]'> <Sidebar />
        <div className='w-full'>
          <div className='w-full h-12  py-8 flex justify-between items-center '>
            <h1 className='font-bold ml-5'>Dashboard</h1>
          </div>

          <div className="container grid grid-cols-3 gap-3 ">

            <div className="Sales flex items-center bg-[#ffffff] rounded mx-2 py-4 ">
              <div className='px-4 flex items-center '>
                <i class="fa-solid fa-dollar-sign p-4 bg-[#ddad6d] w-full rounded-full text-center text-white" ></i>
              </div>
              <div className=' p-4 '>
                <h3 className=' font-medium'>Total Sales</h3>
                <p className='p2 font-bold'>$1,000,0000</p>
              </div>
            </div>

            <div className="Orders flex items-center bg-[#ffffff] rounded py-4">
              <div className='px-4 flex items-center '>
                <i class="fa-solid fa-cart-shopping p-4 bg-[#22755c] w-full rounded-full text-center" style={{ color: "#fff" }}></i>
              </div>
              <div className=' p-4 '>
                <h3 className='font-medium'>Total Orders</h3>
                <p className='font-bold'>3200</p>
              </div>
            </div>

            <div className="Orders flex items-center bg-[#ffffff]  rounded py-4" >
              <div className='px-4 flex items-center '>
                <i class="fa-solid fa-bag-shopping p-4 bg-[#752222] w-full rounded-full text-center" style={{ color: "#fff" }}></i>
              </div>
              <div className=' p-4 '>
                <h3 className='font-medium'>Total Product</h3>
                <p className='font-bold '>3200</p>
              </div>
            </div>



          </div>


        </div></div>}
    </div>
  )
}

export default Dashboard
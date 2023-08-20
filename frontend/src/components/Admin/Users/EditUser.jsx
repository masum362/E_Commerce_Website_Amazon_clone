import React, {  useEffect, useState } from 'react'
import { getUser,updateUser } from '../Api/api.js';
import { useNavigate,useParams } from "react-router-dom";


const EditUser = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile:"",
  })

  useEffect(() => {
 loaduserData() ;
  }, [])

  const handleOnChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value })

  }

  const navigate = useNavigate();



  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateUser(user,id)

    
    
  }
 
  
  const {id} = useParams();

  const loaduserData = async () =>{
    const response = await getUser(id)
    setUser(response.data[0])
   
  }


  return (
    <div className='relative top-[60px] text-center w-full m-auto h-auto bg-[#e7e7e7]'>
       <h3 className='w-full bg-gray-800 py-2 font-bold	text-white'>Edit user</h3>
      <form className="w-full max-w-sm m-auto py-8 mt-8" onSubmit={(e) => handleSubmit(e)}>
        <div className="md:flex md:items-center mb-6 ">
          <div className="md:w-1/3">
            <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" name="name" type="text" placeholder='masum ahmed' onChange={(e) => handleOnChange(e)}  value={user.name}/>
          </div>
        </div>


        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email" name="email" type="email" placeholder="masum@gmail.com" onChange={(e) => handleOnChange(e)} value={user.email} />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="mobile">
              Phone No.
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="mobile" name="mobile" type="number" placeholder="masum@gmail.com" onChange={(e) => handleOnChange(e)} value={user.mobile} />
          </div>
        </div>

        

        
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="px-12 shadow bg-yellow-900 hover:bg-yellow-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 my-8 rounded" type="submit" >
              Edit User
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditUser
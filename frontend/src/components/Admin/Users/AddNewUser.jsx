import React, { useState } from 'react'
import { addUser } from '../Api/api.js';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const AddNewUser = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile:"",
        password: "",
        cpassword:"" 
    })


    const handleOnChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value })

    }

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUser(user).then(res => {
            if(res.status=201){
                toast.success('User added successfully!');
                navigate('/users')
            }
            else{
                toast.warning('Invalid Details!');
            }
        }).catch(err => {
            toast.error('Something Went Wrong!');    
        })
       


    }

    return (
        <div className='relative top-[60px] Adduser text-center w-full bg-[#e7e7e7]'>
            <h3 className='w-full bg-gray-800 py-2 font-bold text-white'>Add user</h3>
            <form className="w-full max-w-sm m-auto pt-6 pb-6" onSubmit={(e) => handleSubmit(e)}>
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Full Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" name="name" type="text" placeholder='masum ahmed' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Email
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email" name="email" type="email" placeholder="masum@gmail.com" onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="mobile">
                            Phone No.
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="mobile" name="mobile" type="number" placeholder="Enter Your Phone Number:" onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" name="password" type="password" placeholder="******************" onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="cpassword">
                            Confirm Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="cpassword" name="cpassword" type="password" placeholder="******************" onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-yellow-900 hover:bg-yellow-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" >
                            Add User
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddNewUser
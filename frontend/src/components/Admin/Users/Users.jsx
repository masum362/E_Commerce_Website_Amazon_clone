import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../Api/api.js'
import { Link } from "react-router-dom"
import Sidebar from '../Sidebar/Sidebar.jsx'


const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers();
    }, [])



    const getAllUsers = async () => {
        const response = await getUsers();
        setUsers(response.data)

    }

    const deleteUserBtn = async (id) => {
        await deleteUser(id)
        getAllUsers();
    }


    return (
        <div className='flex  relative top-[60px] bg-[#e7e7e7]'>
            <Sidebar />
            <div className='w-full'>
                <div className='w-full h-12  py-8 flex justify-between items-center '>
                    <h1 className='font-bold ml-5'>All Users</h1>
                    <Link to={`/adduser`}><button className='bg-yellow-900 px-4 rounded py-2 mr-5 hover:bg-yellow-800 font-bold text-white'>Add User</button></Link>
                </div>
                <div className="w-full h-screen   mx-2">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SI.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="px-6 py-3" >
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3" >
                                    
                                </th>

                            </tr>
                        </thead>
                        <tbody className='w-fll'>
                            {users.map((user, i) => {


                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full" key={user._id}>

                                        <td className='px-6 py-4'>
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.mobile}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>

                                        <td className=" py-4 ">
                                            <Link to={`/edit/${user._id}`} className="bg-gray-700 hover:bg-yellow-900 text-white font-semibold hover:text-white py-2 px-4 border border-yellow-800 hover:border-transparent rounded">
                                                Edit
                                            </Link>
                                            <Link onClick={() => deleteUserBtn(user._id)} className="ml-2 bg-gray-700  hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-yellow-800 hover:border-transparent rounded">
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                );


                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Users
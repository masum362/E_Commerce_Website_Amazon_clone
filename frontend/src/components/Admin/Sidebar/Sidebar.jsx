import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
   return (
      <div>

         <aside id="default-sidebar" className="z-40 w-[200px] h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-screen px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
               <ul className="space-y-2 font-bold">
                  <li>
                     <Link to={'/dashboard'} className="flex items-center p-2 my-2 mt-4 text-yellow-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="ml-3">Dashboard</span>
                     </Link>
                  </li>
                  <li>
                     <a href="#" className="flex items-center p-2 my-2 text-yellow-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>

                     </a>
                  </li>
                  <li>
                     <Link to={'/users'} className="flex items-center p-2 my-2 text-yellow-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                     </Link>
                  </li>
                  <li>
                     <Link to={'/admins'} className="flex items-center p-2 my-2 text-yellow-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">


                        <span className="flex-1 ml-3 whitespace-nowrap">Admins</span>
                     </Link>
                  </li>
                  <li>
                     <Link to={'/products'} className="flex items-center p-2 my-2 text-yellow-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
                     </Link>
                  </li>

                  <li>
                     <Link to={'/orders'} className="flex items-center p-2 my-2 text-yellow-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                     </Link>
                  </li>


               </ul>
            </div>
         </aside>


      </div>
   )
}

export default Sidebar
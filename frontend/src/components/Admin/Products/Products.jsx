import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { deleteProducts, getProduct } from '../Api/api.js';
import Sidebar from '../Sidebar/Sidebar.jsx';

const Products = () => {


    const [products, setProducts] = useState([])
    

    useEffect(() => {
        getAllProducts();
    }, [products])



    const getAllProducts = async () => {
        const response = await getProduct();
        setProducts(response.data)

    }

    const deleteProductBtn = async (id) => {
        await deleteProducts(id)
        getAllProducts();
    }


console.log(products)


    return (
        <>
            <div className='relative top-[60px] flex bg-[#e7e7e7]'>
                <Sidebar />

                <div>
                <div className='w-full h-12  py-8 flex justify-between items-center '>
                    <h1 className='font-bold ml-5'>All Products</h1>
                    <Link to={`/addproduct`}><button className='bg-yellow-900 px-4 rounded py-2 mr-5 hover:bg-yellow-800 font-bold text-white'>Add Products</button></Link>
                </div>
                <div className="w-full h-screen mx-2  ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    SI.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Prize
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, i) => {


                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 " key={product._id}>

                                        <td className='px-6 py-4'>
                                            {i + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img className='w-[50px] h-[50px]' src={product.detailUrl} alt="Image" />
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.title.shortTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.title.longTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price.cost}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.quantity}
                                        </td>

                                        <td className=" py-4 ">
                                            <Link to={`/product/edit/${product._id}`} className="bg-gray-700 hover:bg-yellow-900 text-white font-semibold hover:text-white py-2 px-4 border border-yellow-800 hover:border-transparent rounded">
                                                Edit
                                            </Link>
                                            <Link onClick={() => deleteProductBtn(product._id)} className="ml-2 bg-gray-700  hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-yellow-800 hover:border-transparent rounded">
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
        </>
    )
}

export default Products
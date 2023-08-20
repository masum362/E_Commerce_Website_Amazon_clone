import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addProduct} from '../Api/api.js';

const AddNewProduct = () => {

    const [product, setProduct] = useState({
        title: "",
        description: "",
        category:"",
        mrp:Number,
        cost:Number,
        discount:"",
        tags:"",
        quantity:Number,

    })
    const [image,setImage] = useState(null);
    

    

    const handleOnChange = (e) => {
        e.preventDefault();
        setProduct({ ...product, [e.target.name]: e.target.value })

    }
    const handleImageChange = (e) => {
        setImage (e.target.files[0])
    }

    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('image',image);
        const {title , description,category,mrp,cost,discount,tags,quantity} = product;
        formData.append('title',title);
        formData.append('description',description);
        formData.append('category',category);
        formData.append('mrp',mrp);
        formData.append('cost',cost);
        formData.append('discount',discount);
        formData.append('tags',tags)
        formData.append('quantity',quantity)

        // console.log(product)
        console.log(formData)

        e.preventDefault();
        await addProduct(formData).then(res => console.log(res)).catch(err => console.log(err))
        navigate('/products')


    }
    

  return (
    <div className='relative top-[60px] Adduser text-center w-full bg-[#e7e7e7]'>
            <h3 className='w-full bg-gray-800 py-2 font-bold text-white'>Add Product</h3>
            <form className="w-full max-w-sm m-auto pt-6 pb-6" onSubmit={(e) => handleSubmit(e)}>
               
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-title">
                           Title
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-title" name="title" type="text" placeholder='Rubber Band' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-description">
                           Description
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea rows={8} className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-description" name="description" type="text" placeholder='Rubber Band' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-category">
                           Category
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-category" name="category" type="text" placeholder='clothes' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                           Upload Image
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="image" name="image" type="file" value={product.detailUrl} placeholder='masum ahmed' onChange={(e) => handleImageChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-mrp">
                           MRP
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-mrp" name="mrp" type="number" placeholder='MRP' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>
            
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-cost">
                          Cost
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-cost" name="cost" type="number" placeholder='Cost' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-discount">
                          Discount
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-discount" name="discount" type="text" placeholder='discount' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>


                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-quantity">
                           Quantity
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-quantity" name="quantity" type="number" placeholder='Quantity' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>
            
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-tags">
                          Tags
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-tags" name="tags" type="text" placeholder='tags' onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>
            

            

                
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-yellow-900 hover:bg-yellow-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" >
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default AddNewProduct
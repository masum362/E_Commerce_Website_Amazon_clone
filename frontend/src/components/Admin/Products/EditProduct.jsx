import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct, updateProduct } from '../Api/api.js';

const EditProduct = () => {


    const [shortTitle , setShortTitle] = useState('')
    const [longTitle , setLongTitle] = useState('')
    const [description , setDescription] = useState('')
    const [mrp , setMRP] = useState('')
    const [cost , setCost] = useState('')
    const [discount , setDiscount] = useState('')
    const [quantity , setQuantity] = useState('')
    const [tagline , setTagLine] = useState('')
    

    const [image, setImage] = useState(null)



    useEffect(() => {
        loaduserData();
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
    
        if(e.target.name === 'shortTitle'){
            setShortTitle(e.target.value);
        }
        if(e.target.name === 'longTitle'){
            setLongTitle(e.target.value);
        }
        if(e.target.name === 'description'){
            setDescription(e.target.value);
        }
        if(e.target.name === 'mrp'){
            setMRP(e.target.value);
        }
       
        if(e.target.name === 'cost'){
            setCost(e.target.value);
        }
       
        if(e.target.name === 'discount'){
            setDiscount(e.target.value);
        }
        if(e.target.name === 'quantity'){
            setDiscount(e.target.value);
        }
        if(e.target.name === 'tagline'){
            setTagLine(e.target.value);
        }
       
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const navigate = useNavigate();

    const { id } = useParams();


    const loaduserData = async () => {
        await getSingleProduct(id).then(res =>{

        setImage(res.data[0].url)
        setLongTitle(res.data[0].title.longTitle)
        setShortTitle(res.data[0].title.shortTitle)
        setMRP(res.data[0].price.mrp)
        setCost(res.data[0].price.cost)
        setDiscount(res.data[0].discount)
        setTagLine(res.data[0].tagline)
        setQuantity(res.data[0].quantity)
    }).catch(err => console.log(err))
            
    }

    console.log({longTitle , shortTitle , description ,mrp , cost , discount , tagline ,quantity,image })


    const handleSubmit = async (e) => {
        console.log('clicked')

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', longTitle);
        formData.append('description', description);
        formData.append('category', shortTitle);
        formData.append('mrp', mrp);
        formData.append('cost', cost);
        formData.append('discount', discount);
        formData.append('tags', tagline)
        formData.append('quantity', quantity)

        e.preventDefault();
        await updateProduct(formData, id).then(res => console.log(res)).catch(err => console.log(err))

    }



    return (
        <div className='relative top-[60px] text-center w-full m-auto h-auto  bg-[#e7e7e7]'>
            <h3 className='w-full bg-gray-800 py-2 font-bold	text-white'>Edit user</h3>
            <form className="w-full max-w-sm m-auto py-8 mt-8 " onSubmit={(e) => handleSubmit(e)}>
                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-title">
                            Title
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-title" name="longTitle" type="text" value={longTitle} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-description">
                            Description
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <textarea rows={8} className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-description" name="description" type="text" value={description} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-category">
                            Category
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-category" name="shortTitle" type="text" value={shortTitle} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Upload Image
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="image" name="image" type="file" onChange={(e) => handleImageChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-mrp">
                            MRP
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-mrp" name="mrp" type="text" value={mrp} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-cost">
                            Cost
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-cost" name="cost" type="text" value={cost} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-discount">
                            Discount
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-discount" name="discount" type="text" value={discount} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>


                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-quantity">
                            Quantity
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-quantity" name="quantity" type="number" value={quantity} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6 ">
                    <div className="md:w-1/3">
                        <label className="block text-gray-900 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="product-tags">
                            Tags
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="product-tags" name="tagline" type="text" value={tagline} onChange={(e) => handleOnChange(e)} />
                    </div>
                </div>



                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="px-12 shadow bg-yellow-900 hover:bg-yellow-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 my-8 rounded" type="submit" >
                            Edit Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProduct
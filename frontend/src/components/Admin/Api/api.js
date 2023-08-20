import axios  from "axios"
import { base_url } from "../../../../base"

export const addUser = async (user) =>{
    try {
        return await axios.post(`${base_url}/register` , user)
    } catch (error) {

        console.log("add user failed", error)
    }
}

export const addProduct = async (product) =>{
    try {
        return   await axios.post(`${base_url}/addproduct`,product, {
            withCredentials: true,
            })
        }
     catch (error) {

        console.log("add product failed", error)
    }
}


export const getUsers = async () =>{
    try {
        return await axios.get(`${base_url}/users`)
    
    } catch (error) {

        console.log("add user failed", error)
        
    }
}

export const getUser = async(id) => {
    try{
        return await axios.get(`${base_url}/user/${id}`,)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}

export const getSingleProduct = async(id) => {
    try{
        return await axios.get(`${base_url}/product/${id}`,)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}

export const getProduct = async() => {
    try{
        return await axios.get(`${base_url}/products`,)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}


export const updateUser = async(user,id) => {
  
    console.log({user, id})
    try{
        console.log(user)
        return await axios.post(`${base_url}/edit/${id}`,user)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}

export const updateProduct = async(product,id) => {
  
 console.log('clicked')
    try{
        return await axios.post(`${base_url}/product/edit/${id}`,product)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}

export const deleteUser = async(id) => {

    try{
        return await axios.delete(`${base_url}/user/${id}`)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}

export const deleteProducts = async(id) => {

    try{
        return await axios.delete(`${base_url}/products/${id}`)
    }catch(error){
        console.log("error calling white adduser working" , error)

    }
}






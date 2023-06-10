import axios from 'axios';
import { GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESS } from '../constant/Constant';

const getProducts =() =>async(dispatch)=> {
 try {
    const res = await axios.get("http://localhost:3002/")
    const data = res.data;
    dispatch({type:GET_PRODUCTS_SUCCESS , payload:data})
 } catch (error) {
    dispatch({type:GET_PRODUCTS_FAILED , payload:error.message})
    console.log(error.message)
 }
}

export default getProducts ;
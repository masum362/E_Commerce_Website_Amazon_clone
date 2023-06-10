import { GET_PRODUCTS_FAILED, GET_PRODUCTS_SUCCESS } from "../constant/Constant";

const products = []
const ProductsReducer = (state = { products }, action) => {
    switch (action.type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                products: action.payload
            }


            

        default:
            return state;
    }
}


export default ProductsReducer;
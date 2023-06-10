import {combineReducers} from 'redux'
import ProductsReducer from './ProductsReducers'

const rootReducer = combineReducers({

    productsR:ProductsReducer});

export default rootReducer ;
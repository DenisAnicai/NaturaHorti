import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

import { CartItemProp} from "./utils/props";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const cartItemsFromStorage: [CartItemProp] = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') as string) : []



const middleware = [thunk]

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: {
        cart: {
            cartItems: cartItemsFromStorage
        }
    },
    devTools: process.env.NODE_ENV !== 'production',
})

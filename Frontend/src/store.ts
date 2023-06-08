import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productListReducer, productDetailsReducer, productReviewCreateReducer, productReviewsListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, userUpdateReducer} from "./reducers/userReducers";

import { CartItemProp, ShippingAddressProp} from "./utils/props";
import { orderCreateReducer, orderListReducer, orderPayReducer} from "./reducers/orderReducers";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    productReviewCreate: productReviewCreateReducer,
    productReviewsList: productReviewsListReducer,
})

const cartItemsFromStorage: [CartItemProp] = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems') as string) : []

const shippingAddressFromStorage: ShippingAddressProp = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress') as string) : {}

const userInfoFromStorage: any = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo') as string) : null

const paymentMethodFromStorage: string = localStorage.getItem('paymentMethod') || '';

const personalDetailsFromStorage: any = localStorage.getItem('personalDetails')
    ? JSON.parse(localStorage.getItem('personalDetails') as string)
    : { Name: '', Email: '', Phone: '' };


const middleware = [thunk]

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: {
        cart: {
            cartItems: cartItemsFromStorage,
            shippingAddress: shippingAddressFromStorage,
            paymentMethod: paymentMethodFromStorage,
            personalDetails: personalDetailsFromStorage
        },
        userLogin: {
            userInfo: userInfoFromStorage
        }
    },
    devTools: process.env.NODE_ENV !== 'production',
})

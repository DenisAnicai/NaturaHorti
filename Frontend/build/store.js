"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const productReducers_1 = require("./reducers/productReducers");
const cartReducers_1 = require("./reducers/cartReducers");
const userReducers_1 = require("./reducers/userReducers");
const orderReducers_1 = require("./reducers/orderReducers");
const rootReducer = (0, toolkit_1.combineReducers)({
    productList: productReducers_1.productListReducer,
    productDetails: productReducers_1.productDetailsReducer,
    cart: cartReducers_1.cartReducer,
    userLogin: userReducers_1.userLoginReducer,
    userUpdate: userReducers_1.userUpdateReducer,
    userRegister: userReducers_1.userRegisterReducer,
    orderCreate: orderReducers_1.orderCreateReducer,
    orderList: orderReducers_1.orderListReducer,
    orderPay: orderReducers_1.orderPayReducer,
    productReviewCreate: productReducers_1.productReviewCreateReducer,
    productReviewsList: productReducers_1.productReviewsListReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {};
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') || '';
const personalDetailsFromStorage = localStorage.getItem('personalDetails')
    ? JSON.parse(localStorage.getItem('personalDetails'))
    : { Name: '', Email: '', Phone: '' };
const middleware = [redux_thunk_1.default];
exports.store = (0, toolkit_1.configureStore)({
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
});

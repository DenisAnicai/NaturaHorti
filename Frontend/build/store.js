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
const rootReducer = (0, toolkit_1.combineReducers)({
    productList: productReducers_1.productListReducer,
    productDetails: productReducers_1.productDetailsReducer,
    cart: cartReducers_1.cartReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];
const middleware = [redux_thunk_1.default];
exports.store = (0, toolkit_1.configureStore)({
    reducer: rootReducer,
    middleware,
    preloadedState: {
        cart: {
            cartItems: cartItemsFromStorage
        }
    },
    devTools: process.env.NODE_ENV !== 'production',
});

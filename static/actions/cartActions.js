"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = exports.updateCartItem = exports.removeFromCart = exports.getCartItems = exports.fetchCartItems = void 0;
const axios_1 = __importDefault(require("axios"));
const cartConstants_1 = require("../constants/cartConstants");
const fetchCartItems = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    // Load the cart items from local storage
    const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
    // Dispatch the CART_ADD_ITEM action with the payload as cart items
    dispatch({
        type: cartConstants_1.CART_GET_ITEMS,
        payload: cartItems || [] // Provide a default value of empty array
    });
});
exports.fetchCartItems = fetchCartItems;
const getCartItems = () => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    // Load the cart items from local storage
    const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
    // Dispatch the CART_ADD_ITEM action with the payload as cart items
    dispatch({
        type: cartConstants_1.CART_ADD_ITEM,
        payload: cartItems || [] // Provide a default value of empty array
    });
});
exports.getCartItems = getCartItems;
const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: cartConstants_1.CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
exports.removeFromCart = removeFromCart;
const updateCartItem = (id, qty) => (dispatch, getState) => {
    dispatch({
        type: cartConstants_1.CART_UPDATE_ITEM,
        payload: {
            id,
            qty
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
exports.updateCartItem = updateCartItem;
const addToCart = (id, qty) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/products/${id}`);
    dispatch({
        type: cartConstants_1.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
});
exports.addToCart = addToCart;

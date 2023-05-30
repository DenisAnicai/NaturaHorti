"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartReducer = void 0;
const cartConstants_1 = require("../constants/cartConstants");
const cartReducer = (state = {
    cartItems: [{
            product: '',
            quantity: 0
        }]
}, action) => {
    switch (action.type) {
        case cartConstants_1.CART_ADD_ITEM:
            let item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                item = Object.assign(Object.assign({}, item), { qty: item.qty + existItem.qty });
                return Object.assign(Object.assign({}, state), { cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x) });
            }
            else {
                return Object.assign(Object.assign({}, state), { cartItems: [...state.cartItems, action.payload] });
            }
        case cartConstants_1.CART_REMOVE_ITEM:
            return Object.assign(Object.assign({}, state), { cartItems: state.cartItems.filter((x) => x.product !== action.payload) });
        case cartConstants_1.CART_UPDATE_ITEM:
            return Object.assign(Object.assign({}, state), { cartItems: state.cartItems.map((x) => x.product === action.payload.id ? Object.assign(Object.assign({}, x), { qty: action.payload.qty }) : x) });
        case cartConstants_1.CART_GET_ITEMS:
            return Object.assign({}, state);
        default:
            return state;
    }
};
exports.cartReducer = cartReducer;

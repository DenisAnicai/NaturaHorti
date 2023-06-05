"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartReducer = void 0;
const cartConstants_1 = require("../constants/cartConstants");
const cartReducer = (state = {
    cartItems: [{
            product: '',
            quantity: 0
        }],
    shippingAddress: {
        address: '',
        city: '',
        postalCode: '',
        country: ''
    },
    paymentMethod: '',
    personalDetails: {
        Name: '',
        Email: '',
        Phone: '',
    }
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
        case cartConstants_1.CART_SAVE_SHIPPING_ADDRESS:
            return Object.assign(Object.assign({}, state), { shippingAddress: action.payload });
        case cartConstants_1.CART_SAVE_PAYMENT_METHOD:
            return Object.assign(Object.assign({}, state), { paymentMethod: action.payload });
        case cartConstants_1.CART_SAVE_PERSONAL_DETAILS:
            return Object.assign(Object.assign({}, state), { personalDetails: action.payload });
        case cartConstants_1.CART_CLEAR_ITEMS:
            return Object.assign(Object.assign({}, state), { cartItems: [] });
        default:
            return state;
    }
};
exports.cartReducer = cartReducer;

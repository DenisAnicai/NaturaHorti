import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_ITEM,
    CART_GET_ITEMS,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_PERSONAL_DETAILS,
    CART_CLEAR_ITEMS
} from "../constants/cartConstants";

export const cartReducer = (state = {
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
}, action: any) => {

    switch (action.type) {
        case CART_ADD_ITEM:
            let item = action.payload;
            const existItem: any = state.cartItems.find((x: any) => x.product === item.product);

            if (existItem) {
                item = {
                    ...item,
                    qty: item.qty + existItem.qty
                }
                return {
                    ...state,
                    cartItems: state.cartItems.map((x: any) => x.product === existItem.product ? item : x)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x: any) => x.product !== action.payload),
            };
        case CART_UPDATE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.map((x: any) => x.product === action.payload.id ? {
                    ...x,
                    qty: action.payload.qty
                } : x)
            };
        case CART_GET_ITEMS:
            return {
                ...state,
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_SAVE_PERSONAL_DETAILS:
            return {
                ...state,
                personalDetails: action.payload
            }
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
};

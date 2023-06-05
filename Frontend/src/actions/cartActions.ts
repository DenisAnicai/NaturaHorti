import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM, CART_GET_ITEMS,
CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_SAVE_PERSONAL_DETAILS, CART_CLEAR_ITEMS} from "../constants/cartConstants";


export const fetchCartItems = () => async (dispatch: any, getState: any) => {
    // Load the cart items from local storage
    const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems') as string)
        : [];

    // Dispatch the CART_ADD_ITEM action with the payload as cart items
    dispatch({
        type: CART_GET_ITEMS,
        payload: cartItems || [] // Provide a default value of empty array
    });
}
export const getCartItems = () => async (dispatch: any, getState: any) => {
    // Load the cart items from local storage
    const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems') as string)
        : [];

    // Dispatch the CART_ADD_ITEM action with the payload as cart items
    dispatch({
        type: CART_ADD_ITEM,
        payload: cartItems || [] // Provide a default value of empty array
    });
};


export const removeFromCart = (id: string) => (dispatch: any, getState: any) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const updateCartItem = (id: string, qty: number) => (dispatch: any, getState: any) => {
    dispatch({
        type: CART_UPDATE_ITEM,
        payload: {
            id,
            qty
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToCart = (id: string, qty: number) => async (dispatch: any, getState: any) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
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
}

export const updateShipping = (data: any) => (dispatch: any) => {
    dispatch({
        type: 'CART_SAVE_SHIPPING_ADDRESS',
        payload: data
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
}

export const updatePaymentMethod = (data: any) => (dispatch: any) => {
    dispatch({
        type: 'CART_SAVE_PAYMENT_METHOD',
        payload: data
    });
    localStorage.setItem("paymentMethod", data);
}

export const updatePersonalDetails = (data: any) => (dispatch: any) => {
    dispatch({
        type: CART_SAVE_PERSONAL_DETAILS,
        payload: data
    });
    localStorage.setItem("personalDetails", JSON.stringify(data));
}

export const clearCart = () => (dispatch: any) => {
    dispatch({
        type: CART_CLEAR_ITEMS,
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
    console.log("Cart cleared")
}
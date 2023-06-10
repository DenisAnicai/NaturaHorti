import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_RESET,
    ORDER_RESET_ALL,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS,
    ORDER_GET_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action: any) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case ORDER_RESET:
            return {
                ...state,
                success: false,
                loading: false,
            }
        case ORDER_RESET_ALL:
            return {};
        default:
            return state;
    }
}

export const orderListReducer = (state = {orders: []}, action: any) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            };
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                hasMoreOrders: action.payload.hasMoreOrders
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const orderPayReducer = (state = {}, action: any) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            };
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
}

export const orderGetReducer = (state = {order: {}}, action: any) => {
    switch (action.type) {
        case ORDER_GET_REQUEST:
            return {
                loading: true
            };
        case ORDER_GET_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case ORDER_GET_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
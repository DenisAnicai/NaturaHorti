"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPayReducer = exports.orderListReducer = exports.orderCreateReducer = void 0;
const orderConstants_1 = require("../constants/orderConstants");
const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_CREATE_REQUEST:
            return {
                loading: true
            };
        case orderConstants_1.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            };
        case orderConstants_1.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case orderConstants_1.ORDER_RESET:
            return Object.assign(Object.assign({}, state), { success: false, loading: false });
        case orderConstants_1.ORDER_RESET_ALL:
            return {};
        default:
            return state;
    }
};
exports.orderCreateReducer = orderCreateReducer;
const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_LIST_REQUEST:
            return {
                loading: true
            };
        case orderConstants_1.ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                hasMoreOrders: action.payload.hasMoreOrders
            };
        case orderConstants_1.ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
exports.orderListReducer = orderListReducer;
const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case orderConstants_1.ORDER_PAY_REQUEST:
            return {
                loading: true
            };
        case orderConstants_1.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case orderConstants_1.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case orderConstants_1.ORDER_PAY_RESET:
            return {};
        default:
            return state;
    }
};
exports.orderPayReducer = orderPayReducer;

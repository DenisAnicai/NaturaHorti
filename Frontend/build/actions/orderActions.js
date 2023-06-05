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
exports.payOrder = exports.listOrders = exports.resetOrderAll = exports.resetOrder = exports.saveOrder = void 0;
const orderConstants_1 = require("../constants/orderConstants");
const axios_1 = __importDefault(require("axios"));
const saveOrder = (order) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: orderConstants_1.ORDER_CREATE_REQUEST });
        let config = {};
        if (getState().userLogin.userInfo) {
            config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                }
            };
        }
        else {
            config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
        }
        const { data } = yield axios_1.default.post("/api/orders/add", order, config);
        dispatch({ type: orderConstants_1.ORDER_CREATE_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: orderConstants_1.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.saveOrder = saveOrder;
const resetOrder = () => (dispatch) => {
    dispatch({ type: orderConstants_1.ORDER_RESET });
};
exports.resetOrder = resetOrder;
const resetOrderAll = () => (dispatch) => {
    dispatch({ type: orderConstants_1.ORDER_RESET_ALL });
};
exports.resetOrderAll = resetOrderAll;
const listOrders = (page, limit) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: orderConstants_1.ORDER_LIST_REQUEST });
        let config = {};
        if (getState().userLogin.userInfo) {
            config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                }
            };
        }
        else {
            config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
        }
        const { data } = yield axios_1.default.get(`/api/orders/?page=${page}&limit=${limit}`, config);
        dispatch({ type: orderConstants_1.ORDER_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: orderConstants_1.ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.listOrders = listOrders;
const payOrder = (orderId, paymentResult) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: orderConstants_1.ORDER_PAY_REQUEST });
        let config = {};
        if (getState().userLogin.userInfo) {
            config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                }
            };
        }
        else {
            config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
        }
        const { data } = yield axios_1.default.put(`/api/orders/${orderId}/pay`, paymentResult, config);
        dispatch({ type: orderConstants_1.ORDER_PAY_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: orderConstants_1.ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.payOrder = payOrder;

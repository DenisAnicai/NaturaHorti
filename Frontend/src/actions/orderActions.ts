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
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
} from "../constants/orderConstants";
import axios from "axios";

export const saveOrder = (order: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST});
        let config: any = {};
        if (getState().userLogin.userInfo) {
            config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                }
            }
        } else {
            config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }

        const {data} = await axios.post("/api/orders/add", order, config);

        dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
        localStorage.setItem("currentOrder", JSON.stringify(data));
    } catch
        (error: any) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
    }
}

export const resetOrder = () => (dispatch: any) => {
    dispatch({type: ORDER_RESET});
}

export const resetOrderAll = () => (dispatch: any) => {
    dispatch({type: ORDER_RESET_ALL});
    localStorage.removeItem("currentOrder");
}

export const listOrders = (page: number, limit: number) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST});
        let config: any = {};
        if (getState().userLogin.userInfo) {
            config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                }
            }
        } else {
            config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }

        const {data} = await axios.get(`/api/orders/?page=${page}&limit=${limit}`, config);

        dispatch({type: ORDER_LIST_SUCCESS, payload: data});
    } catch
        (error: any) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
    }
}

export const payOrder = (orderId: string, paymentResult: any) => async (dispatch: any, getState: any) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST});
        let config: any = {};
        if (getState().userLogin.userInfo) {
            config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
                }
            }
        } else {
            config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        }

        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch
        (error: any) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
    }
}

export const resetPayOrder = () => (dispatch: any) => {
    dispatch({type: ORDER_PAY_RESET});
}

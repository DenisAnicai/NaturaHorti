import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGOUT_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/userConstants';
import axios from 'axios';
import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../constants/productConstants";


export const userLoginReducer = (state = {}, action: any) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGOUT_REQUEST:
            return {};
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userUpdateReducer = (state = {}, action: any) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT_REQUEST:
            return {};

        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action: any) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false};
        case USER_LOGOUT_REQUEST:
            return {};
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
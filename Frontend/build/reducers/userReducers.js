"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterReducer = exports.userUpdateReducer = exports.userLoginReducer = void 0;
const userConstants_1 = require("../constants/userConstants");
const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_LOGIN_REQUEST:
            return { loading: true };
        case userConstants_1.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case userConstants_1.USER_LOGOUT_REQUEST:
            return {};
        case userConstants_1.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.userLoginReducer = userLoginReducer;
const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_UPDATE_REQUEST:
            return { loading: true };
        case userConstants_1.USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case userConstants_1.USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case userConstants_1.USER_LOGOUT_REQUEST:
            return {};
        default:
            return state;
    }
};
exports.userUpdateReducer = userUpdateReducer;
const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case userConstants_1.USER_REGISTER_REQUEST:
            return { loading: true };
        case userConstants_1.USER_REGISTER_SUCCESS:
            return { loading: false };
        case userConstants_1.USER_LOGOUT_REQUEST:
            return {};
        case userConstants_1.USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.userRegisterReducer = userRegisterReducer;

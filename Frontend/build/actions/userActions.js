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
exports.register = exports.update = exports.logout = exports.login = void 0;
const userConstants_1 = require("../constants/userConstants");
const axios_1 = __importDefault(require("axios"));
const login = (email, password) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: userConstants_1.USER_LOGIN_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = yield axios_1.default.post('/api/users/login', { 'username': email, 'password': password }, config);
        dispatch({ type: userConstants_1.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            dispatch({ type: userConstants_1.USER_LOGIN_FAIL, payload: 'Parola sau email incorecte.' });
        }
        else {
            dispatch({
                type: userConstants_1.USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    }
});
exports.login = login;
const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: userConstants_1.USER_LOGOUT_REQUEST });
};
exports.logout = logout;
const update = (user) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: userConstants_1.USER_UPDATE_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = yield axios_1.default.put(`/api/users/profile/update`, user, config);
        dispatch({ type: userConstants_1.USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: userConstants_1.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: userConstants_1.USER_UPDATE_FAIL,
            payload: error.response && error.response.data ? error.response.data : error.message
        });
    }
});
exports.update = update;
const register = (name, email, password) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: userConstants_1.USER_REGISTER_REQUEST });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = yield axios_1.default.post('/api/users/register', {
            'email': email,
            'password': password,
            'name': name
        }, config);
        dispatch({ type: userConstants_1.USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: userConstants_1.USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch (error) {
        dispatch({
            type: userConstants_1.USER_REGISTER_FAIL,
            payload: error.response && error.response.data ? error.response.data : error.message
        });
    }
});
exports.register = register;

import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

} from '../constants/userConstants';
import axios from 'axios';

export const login = (email: string, password: string) => async (dispatch: any): Promise<void> => {
    try {
        dispatch({type: USER_LOGIN_REQUEST});
        const config = {headers: {'Content-Type': 'application/json'}};
        const {data} = await axios.post('/api/users/login', {'username': email, 'password': password}, config);
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            dispatch({type: USER_LOGIN_FAIL, payload: 'Parola sau email incorecte.'});
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    }
}

export const logout = () => (dispatch: any): void => {
    localStorage.removeItem('userInfo');

    dispatch({type: USER_LOGOUT_REQUEST});
}

export const update = (user: any) => async (dispatch: any, getState: any): Promise<void> => {
    try {
        dispatch({type: USER_UPDATE_REQUEST});
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(`/api/users/profile/update`, user, config);
        dispatch({type: USER_UPDATE_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data ? error.response.data : error.message
        });
    }
}

export const register = (name: string, email: string, password: string) => async (dispatch: any): Promise<void> => {
    try {
        dispatch({type: USER_REGISTER_REQUEST});
        const config = {headers: {'Content-Type': 'application/json'}};
        const {data} = await axios.post('/api/users/register', {
            'email': email,
            'password': password,
            'name': name
        }, config);
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data ? error.response.data : error.message
        });
    }
}
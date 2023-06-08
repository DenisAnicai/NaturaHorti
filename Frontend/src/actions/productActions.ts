import
{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    LIST_REVIEWS_FAIL,
    LIST_REVIEWS_REQUEST,
    LIST_REVIEWS_SUCCESS
} from "../constants/productConstants";
import axios from "axios";
import {AnyAction} from "redux";
import {ProductProp} from "../utils/props";

export const listProducts = () => async (dispatch: any): Promise<void> => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get<ProductProp[]>('/api/products/');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error: any) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const listProductDetails = (id: string) => async (dispatch: any): Promise<void> => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get<ProductProp>(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const createProductReview = (productId: string, review: any) => async (dispatch: any, getState: any): Promise<void> => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST });
        const {userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productId}/reviews/create`, review, config);
        dispatch({ type: CREATE_REVIEW_SUCCESS });
    } catch (error: any) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

export const listProductReviews = (productId: string) => async (dispatch: any): Promise<void> => {
    try {
        dispatch({ type: LIST_REVIEWS_REQUEST });
        const { data } = await axios.get(`/api/products/${productId}/reviews`);
        dispatch({ type: LIST_REVIEWS_SUCCESS, payload: data });
    } catch (error: any) {
        dispatch({
            type: LIST_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
}

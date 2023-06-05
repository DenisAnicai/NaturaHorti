import
{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
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

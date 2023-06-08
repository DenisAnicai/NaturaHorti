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
exports.listProductReviews = exports.createProductReview = exports.listProductDetails = exports.listProducts = void 0;
const productConstants_1 = require("../constants/productConstants");
const axios_1 = __importDefault(require("axios"));
const listProducts = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.PRODUCT_LIST_REQUEST });
        const { data } = yield axios_1.default.get('/api/products/');
        dispatch({ type: productConstants_1.PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.listProducts = listProducts;
const listProductDetails = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.PRODUCT_DETAILS_REQUEST });
        const { data } = yield axios_1.default.get(`/api/products/${id}`);
        dispatch({ type: productConstants_1.PRODUCT_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.listProductDetails = listProductDetails;
const createProductReview = (productId, review) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.CREATE_REVIEW_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        yield axios_1.default.post(`/api/products/${productId}/reviews/create`, review, config);
        dispatch({ type: productConstants_1.CREATE_REVIEW_SUCCESS });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.createProductReview = createProductReview;
const listProductReviews = (productId) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dispatch({ type: productConstants_1.LIST_REVIEWS_REQUEST });
        const { data } = yield axios_1.default.get(`/api/products/${productId}/reviews`);
        dispatch({ type: productConstants_1.LIST_REVIEWS_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({
            type: productConstants_1.LIST_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
});
exports.listProductReviews = listProductReviews;

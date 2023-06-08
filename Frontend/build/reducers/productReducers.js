"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productReviewsListReducer = exports.productReviewCreateReducer = exports.productDetailsReducer = exports.productListReducer = void 0;
const productConstants_1 = require("../constants/productConstants");
const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [], error: null };
        case productConstants_1.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload, error: null };
        case productConstants_1.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productListReducer = productListReducer;
const productDetailsReducer = (state = { Product: {} }, action) => {
    switch (action.type) {
        case productConstants_1.PRODUCT_DETAILS_REQUEST:
            return Object.assign({ loading: true }, state);
        case productConstants_1.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case productConstants_1.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productDetailsReducer = productDetailsReducer;
const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case productConstants_1.CREATE_REVIEW_REQUEST:
            return { loading: true };
        case productConstants_1.CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case productConstants_1.CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productReviewCreateReducer = productReviewCreateReducer;
const productReviewsListReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case productConstants_1.LIST_REVIEWS_REQUEST:
            return { loading: true, reviews: [] };
        case productConstants_1.LIST_REVIEWS_SUCCESS:
            return { loading: false, reviews: action.payload };
        case productConstants_1.LIST_REVIEWS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
exports.productReviewsListReducer = productReviewsListReducer;

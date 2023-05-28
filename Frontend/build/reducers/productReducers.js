"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDetailsReducer = exports.productListReducer = void 0;
const productConstants_1 = require("../constants/productConstants");
const sample_product = {
    _id: '1',
    name: 'Sample Product',
    image: '/images/sample.jpg',
    description: 'Sample Description',
    brand: 'Sample Brand',
    category: 'Sample Category',
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
};
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

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

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
}

export const productListReducer = (state = { products: [] }, action: any) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [], error: null };
    case PRODUCT_LIST_SUCCESS:
        return { loading: false, products: action.payload, error: null };
    case PRODUCT_LIST_FAIL:
        return { loading: false, error: action.payload };
    default:
        return state;
  }
}

export const productDetailsReducer = (state = { Product: {} }, action: any) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
          return { loading: true, ...state };
      case PRODUCT_DETAILS_SUCCESS:
          return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
    }
}
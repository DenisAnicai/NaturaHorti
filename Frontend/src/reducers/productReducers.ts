import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_RESET,
    LIST_REVIEWS_FAIL,
    LIST_REVIEWS_REQUEST,
    LIST_REVIEWS_SUCCESS
} from "../constants/productConstants";

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

export const productReviewCreateReducer = (state = {}, action: any) => {
    switch (action.type) {
      case CREATE_REVIEW_REQUEST:
          return { loading: true };
      case CREATE_REVIEW_SUCCESS:
          return { loading: false, success: true };
      case CREATE_REVIEW_FAIL:
          return { loading: false, error: action.payload };
        case CREATE_REVIEW_RESET:
            return {};
      default:
          return state;
    }
}

export const productReviewsListReducer = (state = { reviews: [] }, action: any) => {
    switch (action.type) {
      case LIST_REVIEWS_REQUEST:
          return { loading: true, reviews: [] };
      case LIST_REVIEWS_SUCCESS:
          return { loading: false, reviews: action.payload };
      case LIST_REVIEWS_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
    }
}
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// ReviewList.js
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const rating_1 = require("./rating");
const productActions_1 = require("../actions/productActions");
const ReviewList = ({ productId }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const productReviews = (0, react_redux_1.useSelector)((state) => state.productReviewsList);
    const { loading, error, reviews } = productReviews;
    (0, react_1.useEffect)(() => {
        dispatch((0, productActions_1.listProductReviews)(productId));
    }, [dispatch, productId]);
    if (loading || !reviews || loading === undefined) {
        return (react_1.default.createElement(react_bootstrap_1.Spinner, { animation: "border", role: "status" },
            react_1.default.createElement("span", { className: "visually-hidden" }, "Se incarca...")));
    }
    else if (error) {
        return react_1.default.createElement("div", { className: "alert alert-danger" }, error);
    }
    else {
        return (react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: "flush" }, reviews.map((review) => (react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { key: review._id },
            react_1.default.createElement(react_bootstrap_1.Card, null,
                react_1.default.createElement(react_bootstrap_1.Card.Header, { as: "h5", className: "d-flex justify-content-between" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("strong", null, review.name),
                        react_1.default.createElement(rating_1.Rating, { rating: review.rating })),
                    react_1.default.createElement("p", { className: "text-secondary" }, review.createdAt.substring(0, 10))),
                react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                    react_1.default.createElement(react_bootstrap_1.Card.Text, null, review.comment))))))));
    }
};
exports.default = ReviewList;

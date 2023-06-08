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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const productActions_1 = require("../actions/productActions");
const ReviewForm = ({ productId }) => {
    const [rating, setRating] = (0, react_1.useState)(0);
    const [comment, setComment] = (0, react_1.useState)('');
    const dispatch = (0, react_redux_1.useDispatch)();
    const productReviewCreate = (0, react_redux_1.useSelector)((state) => state.productReviewCreate);
    const { error, loading } = productReviewCreate;
    const submitHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        try {
            yield dispatch((0, productActions_1.createProductReview)(productId, { 'rating': rating, 'comment': comment }));
            dispatch((0, productActions_1.listProductReviews)(productId));
        }
        catch (error) {
            console.error(error);
        }
    });
    return (react_1.default.createElement(react_bootstrap_1.Card, { className: 'my-4' },
        react_1.default.createElement(react_bootstrap_1.Card.Header, { as: "h5" }, "Adauga o recenzie"),
        react_1.default.createElement(react_bootstrap_1.Card.Body, null,
            loading &&
                react_1.default.createElement(react_bootstrap_1.Spinner, { animation: "border", role: "status" },
                    react_1.default.createElement("span", { className: "visually-hidden" }, "Se incarca...")),
            error && react_1.default.createElement(react_bootstrap_1.Alert, { variant: 'danger' }, error),
            react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'rating' },
                    react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Evaluare"),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { as: 'select', value: rating, onChange: (e) => setRating(Number(e.target.value)) },
                        react_1.default.createElement("option", { value: '' }, "Selecta\u021Bi..."),
                        react_1.default.createElement("option", { value: '1' }, "1 - Slab"),
                        react_1.default.createElement("option", { value: '2' }, "2 - Acceptabil"),
                        react_1.default.createElement("option", { value: '3' }, "3 - Bun"),
                        react_1.default.createElement("option", { value: '4' }, "4 - Foarte bun"),
                        react_1.default.createElement("option", { value: '5' }, "5 - Excelent"))),
                react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'comment' },
                    react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Comentariu"),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "mb-3", as: 'textarea', value: comment, onChange: (e) => setComment(e.target.value) })),
                react_1.default.createElement(react_bootstrap_1.Button, { type: 'submit', variant: 'primary' }, "Trimite")))));
};
exports.default = ReviewForm;

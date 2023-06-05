"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const rating_1 = require("./rating");
const price_1 = require("./price");
const react_router_dom_1 = require("react-router-dom");
const Product = ({ _id, name, image, price, rating, numReviews, countInStock, }) => {
    if (name.length > 50) {
        name = name.substring(0, 50) + "...";
    }
    return (react_1.default.createElement(react_bootstrap_1.Card, { className: "my-3 p-3 rounded border-0 text-center shadow-sm" },
        react_1.default.createElement(react_router_dom_1.Link, { to: `/product/${name.replace(/\s/g, '-')}/${_id}`, className: "text-decoration-none text-dark" },
            react_1.default.createElement(react_bootstrap_1.Card.Img, { src: image, variant: "top", className: "", style: { height: "200px", objectFit: "cover", objectPosition: "center", borderRadius: "0.5rem" } }),
            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                react_1.default.createElement(react_bootstrap_1.Card.Title, { as: "div", className: "text-center hover-effect mb-3 ", style: { height: "6rem" } },
                    react_1.default.createElement("strong", null, name)),
                react_1.default.createElement(react_bootstrap_1.Card.Text, { as: "div" },
                    react_1.default.createElement("div", { className: "my-3" },
                        react_1.default.createElement(rating_1.Rating, { rating: rating, numReviews: numReviews }))),
                react_1.default.createElement(price_1.Price, { price: Number(price), textSize: 0.9 }),
                react_1.default.createElement("div", { className: "text-center mt-2", style: { fontSize: "0.8em" } }, countInStock > 0 ? (react_1.default.createElement("span", { style: { color: "#6cb95c" } },
                    react_1.default.createElement("i", { className: "fa-solid fa-boxes-stacked" }),
                    " IN STOC")) : (react_1.default.createElement("span", { style: { color: "red" } },
                    react_1.default.createElement("i", { className: "fa-solid fa-boxes-stacked" }),
                    " INDISPONIBIL")))))));
};
exports.Product = Product;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const Price = ({ price, textSize }) => {
    const integerPart = Math.floor(price);
    const decimalPart = price % 1 !== 0 ? price.toString().split('.')[1] : null;
    textSize = textSize || 0.8;
    const decimalTextSize = 0.35 * textSize;
    return (react_1.default.createElement(react_bootstrap_1.Card.Text, { as: "h3", className: "my-2 mb-0", style: { color: "#CC0000FF" } },
        react_1.default.createElement("span", { style: { fontSize: `${textSize}em` } }, integerPart),
        decimalPart && (react_1.default.createElement("span", { style: { fontSize: `${decimalTextSize}em`, verticalAlign: 'super' } }, decimalPart)),
        " Lei"));
};
exports.Price = Price;

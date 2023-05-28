"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendedPercentage = void 0;
const react_1 = __importDefault(require("react"));
const RecommendedPercentage = ({ rating }) => {
    if (!rating) {
        rating = 0;
    }
    rating = Number(rating);
    const recommendedPercentage = (rating * 100 / 5).toFixed(0);
    return (react_1.default.createElement("div", { className: "recommended-percentage" },
        react_1.default.createElement("span", { className: "fw-semibold" },
            recommendedPercentage,
            "%"),
        react_1.default.createElement("span", { className: "text-secondary" }, " recomanda acest produs")));
};
exports.RecommendedPercentage = RecommendedPercentage;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const react_1 = __importDefault(require("react"));
const Rating = ({ rating, numReviews, showNumReviews }) => {
    rating = Number(rating);
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        for (let i = 0; i < fullStars; i++) {
            stars.push(react_1.default.createElement("i", { className: "fa-solid fa-star", key: i, style: { color: "#f0bc00" } }));
        }
        if (hasHalfStar) {
            stars.push(react_1.default.createElement("i", { className: "fa-solid fa-star-half-stroke", key: fullStars, style: { color: "#f0bc00" } }));
        }
        const remainingStars = 5 - stars.length;
        for (let i = 1; i <= remainingStars; i++) {
            stars.push(react_1.default.createElement("i", { className: "fa-regular fa-star", key: fullStars + i, style: { color: "#f0bc00" } }));
        }
        return stars;
    };
    return (react_1.default.createElement("div", { className: "mb-4 py-2", style: { height: "1.5rem" } },
        renderStars(),
        " ",
        showNumReviews && react_1.default.createElement("span", { className: "fw-semibold" }, rating),
        showNumReviews && numReviews && react_1.default.createElement("span", { className: "text-secondary" },
            " (",
            numReviews,
            ")")));
};
exports.Rating = Rating;

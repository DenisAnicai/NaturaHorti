"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.Breadcrumb = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Breadcrumb = ({items}) => {
  return (react_1.default.createElement("nav", {"aria-label": "breadcrumb"},
    react_1.default.createElement("ol", {className: "breadcrumb"}, items.map((item, index) => (react_1.default.createElement("li", {
      key: index,
      className: `breadcrumb-item ${index === items.length - 1 ? "active" : ""}`,
      "aria-current": index === items.length - 1 ? "page" : undefined
    }, index === items.length - 1 ? (item.label) : (react_1.default.createElement(react_router_dom_1.Link, {to: item.path}, item.label))))))));
};
exports.Breadcrumb = Breadcrumb;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
// @ts-ignore
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const Header = () => {
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { cartItems } = cart;
    const cartItemsCount = cartItems.length;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (react_1.default.createElement("header", null,
        react_1.default.createElement(react_bootstrap_1.Navbar, { style: { backgroundColor: 'rgb(61,140,64)' }, variant: "dark", expand: "lg", collapseOnSelect: true, className: "" },
            react_1.default.createElement(react_bootstrap_1.Container, null,
                react_1.default.createElement(react_bootstrap_1.Nav.Link, { as: react_router_dom_1.Link, to: "/" },
                    react_1.default.createElement(react_bootstrap_1.Navbar.Brand, null, "NaturaHorti")),
                react_1.default.createElement(react_bootstrap_1.Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
                react_1.default.createElement(react_bootstrap_1.Navbar.Collapse, { id: "basic-navbar-nav" },
                    react_1.default.createElement(react_bootstrap_1.Nav, { className: "ms-auto" },
                        userInfo ? (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(react_bootstrap_1.Nav.Link, { as: react_router_dom_1.Link, to: "/profile" },
                                react_1.default.createElement("i", { className: "fas fa-user" }),
                                " ",
                                userInfo.name),
                            react_1.default.createElement(react_bootstrap_1.Nav.Link, { as: react_router_dom_1.Link, to: "/logout" },
                                react_1.default.createElement("i", { className: "fas fa-sign-out-alt" }),
                                " Deconectare"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(react_bootstrap_1.Nav.Link, { as: react_router_dom_1.Link, to: "/login" },
                                react_1.default.createElement("i", { className: "fas fa-user" }),
                                " Autentificare"),
                            react_1.default.createElement(react_bootstrap_1.Nav.Link, { as: react_router_dom_1.Link, to: "/register" },
                                react_1.default.createElement("i", { className: "fas fa-user-plus" }),
                                " Inregistrare"))),
                        react_1.default.createElement(react_bootstrap_1.Nav.Link, { as: react_router_dom_1.Link, to: "/cart" },
                            react_1.default.createElement("i", { className: "fas fa-shopping-cart" }),
                            "Cos",
                            cartItemsCount > 0 && (react_1.default.createElement(react_bootstrap_1.Badge, { pill: true, style: { marginLeft: '5px', backgroundColor: 'rgb(204,0,0)', fontSize: '0.7em' } }, cartItemsCount)))))))));
};
exports.Header = Header;

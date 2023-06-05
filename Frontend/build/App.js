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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
const header_1 = require("./components/header");
const footer_1 = require("./components/footer");
const HomeScreen_1 = require("./screens/HomeScreen");
const ProductScreen_1 = require("./screens/ProductScreen");
const NotFoundScreen_1 = require("./screens/NotFoundScreen");
const LoginScreen_1 = require("./screens/LoginScreen");
const RegisterScreen_1 = require("./screens/RegisterScreen");
const CartScreen_1 = require("./screens/CartScreen");
const ProfileScreen_1 = require("./screens/ProfileScreen");
const ShippingScreen_1 = require("./screens/ShippingScreen");
const PaymentScreen_1 = require("./screens/PaymentScreen");
const PersonalDetailsScreen_1 = require("./screens/PersonalDetailsScreen");
const OrderScreen_1 = require("./screens/OrderScreen");
const OrderSuccessScreen_1 = require("./screens/OrderSuccessScreen");
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const App = () => {
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(header_1.Header, null),
        React.createElement("main", { className: "py-5 px-5", id: "bootstrap-overrides", style: { backgroundColor: "#f8f9fa" } },
            React.createElement(react_router_dom_1.Routes, null,
                React.createElement(react_router_dom_1.Route, { path: '/', element: React.createElement(HomeScreen_1.HomeScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/product/:name/:_id', element: React.createElement(ProductScreen_1.ProductScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '*', element: React.createElement(NotFoundScreen_1.NotFoundScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/login', element: React.createElement(LoginScreen_1.LoginScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/register', element: React.createElement(RegisterScreen_1.RegisterScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/profile', element: React.createElement(ProfileScreen_1.ProfileScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/cart/:_id?', element: React.createElement(CartScreen_1.CartScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/logout', element: React.createElement(HomeScreen_1.HomeScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/cart/shipping', element: React.createElement(ShippingScreen_1.ShippingScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/cart/personalDetails', element: React.createElement(PersonalDetailsScreen_1.PersonalDetailsScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/cart/payment', element: React.createElement(PaymentScreen_1.PaymentScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/cart/placeOrder', element: React.createElement(OrderScreen_1.OrderSummaryScreen, null) }),
                React.createElement(react_router_dom_1.Route, { path: '/cart/order/:orderId', element: React.createElement(OrderSuccessScreen_1.OrderSuccessScreen, null) }))),
        React.createElement(footer_1.Footer, null)));
};
const root = client_1.default.createRoot(document.getElementById('app'));
root.render(React.createElement(react_redux_1.Provider, { store: store_1.store },
    React.createElement(App, null)));

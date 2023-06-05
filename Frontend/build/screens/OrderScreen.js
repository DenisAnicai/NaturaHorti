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
exports.OrderSummaryScreen = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const styled_components_1 = __importDefault(require("styled-components"));
const price_1 = require("../components/price");
const step_1 = require("../components/step");
const orderActions_1 = require("../actions/orderActions");
const react_redux_2 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const cartActions_1 = require("../actions/cartActions");
const orderActions_2 = require("../actions/orderActions");
const StyledContainer = (0, styled_components_1.default)(react_bootstrap_1.Container) `
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f4f4f4;
  padding: 2rem;
`;
const StyledCard = (0, styled_components_1.default)(react_bootstrap_1.Card) `
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  h2, h3, h4 {
    color: #444;
  }

  p {
    color: #777;
  }
`;
const StyledButton = (0, styled_components_1.default)(react_bootstrap_1.Button) `
  background-color: #48ca3b;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #36a029;
  }
`;
const OrderSummaryScreen = () => {
    const dispatch = (0, react_redux_2.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { cartItems, shippingAddress, paymentMethod, personalDetails } = cart;
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const VAT_RATE = 0.19;
    const vatPrice = itemsPrice * VAT_RATE;
    const shippingPrice = itemsPrice > 300 ? 0 : 25.00;
    const totalPrice = itemsPrice + shippingPrice + vatPrice;
    const orderCreate = (0, react_redux_1.useSelector)((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    (0, react_1.useEffect)(() => {
        if (success && order) {
            dispatch((0, cartActions_1.clearCart)());
            dispatch((0, orderActions_2.resetOrder)());
            navigate(`/cart/order/${order._id}`);
        }
    }, [navigate, success, order, dispatch]);
    const placeOrderHandler = () => {
        dispatch((0, orderActions_1.saveOrder)({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            personalDetails: personalDetails,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            vatPrice: vatPrice,
            totalPrice: totalPrice
        }));
    };
    return (react_1.default.createElement(StyledContainer, null,
        react_1.default.createElement(step_1.Steps, { step: 4 }),
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center my-5 text-center" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement("h2", { className: "text-center mb-4" },
                    react_1.default.createElement("i", { className: "fa-solid fa-receipt" }),
                    " Rezumat Comanda"),
                react_1.default.createElement(StyledCard, null,
                    react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: 'flush' },
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { style: { borderBottom: '1px solid #dee2e6' } },
                            react_1.default.createElement("h3", null,
                                react_1.default.createElement("i", { className: "fa-solid fa-user" }),
                                " ",
                                personalDetails.name),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("i", { className: "fa-solid fa-envelope" }),
                                " ",
                                personalDetails.email),
                            react_1.default.createElement("p", null,
                                react_1.default.createElement("i", { className: "fa-solid fa-phone" }),
                                " ",
                                personalDetails.phone)),
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { style: { borderBottom: '1px solid #dee2e6' } },
                            react_1.default.createElement("h3", null,
                                react_1.default.createElement("i", { className: "fa-solid fa-box" }),
                                " Produse"),
                            cartItems.map((item, index) => (react_1.default.createElement("div", { key: index },
                                item.name,
                                " - ",
                                item.qty,
                                " bucati ",
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement(price_1.Price, { price: item.price * item.qty, textSize: 0.6 }))))),
                            react_1.default.createElement("hr", null),
                            react_1.default.createElement("h4", null,
                                "Total Produse: ",
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement(price_1.Price, { price: itemsPrice, textSize: 0.8 }))),
                            react_1.default.createElement("h4", null,
                                "Cost Transport: ",
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement(price_1.Price, { price: shippingPrice, textSize: 0.8 }))),
                            react_1.default.createElement("h4", null,
                                "TVA: ",
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement(price_1.Price, { price: vatPrice, textSize: 0.8 }))),
                            react_1.default.createElement("hr", null),
                            react_1.default.createElement("h4", null,
                                "Total General: ",
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement(price_1.Price, { price: totalPrice, textSize: 1.2 })))),
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { style: { borderBottom: '1px solid #dee2e6' } },
                            react_1.default.createElement("h3", null,
                                react_1.default.createElement("i", { className: "fa-solid fa-map-marker-alt" }),
                                " Adresa de livrare"),
                            react_1.default.createElement("p", null,
                                shippingAddress.address,
                                ", ",
                                shippingAddress.city,
                                ", ",
                                shippingAddress.postalCode,
                                ", ",
                                shippingAddress.country)),
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                            react_1.default.createElement("h3", null,
                                react_1.default.createElement("i", { className: "fa-solid fa-credit-card" }),
                                " Metoda de Plata"),
                            react_1.default.createElement("p", null, paymentMethod))),
                    react_1.default.createElement(StyledButton, { type: 'button', variant: 'success', className: "mt-3 text-center", onClick: placeOrderHandler },
                        react_1.default.createElement("i", { className: 'fas fa-check' }),
                        " Confirmare Comanda"),
                    error ? (react_1.default.createElement("div", { className: 'alert alert-danger mt-3' }, error)) : (react_1.default.createElement(react_1.default.Fragment, null)))))));
};
exports.OrderSummaryScreen = OrderSummaryScreen;

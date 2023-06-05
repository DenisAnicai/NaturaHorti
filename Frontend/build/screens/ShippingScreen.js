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
exports.ShippingScreen = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const react_router_dom_2 = require("react-router-dom");
const cartActions_1 = require("../actions/cartActions");
const step_1 = require("../components/step");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledCard = (0, styled_components_1.default)(react_bootstrap_1.Card) `
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 15px;
`;
const StyledButton = (0, styled_components_1.default)(react_bootstrap_1.Button) `
    display: block;
    margin: 0 auto;
    &:hover {
        cursor: pointer;
    }
`;
const StyledLink = (0, styled_components_1.default)(react_router_dom_1.Link) `
    color: #333;
    &:hover {
        color: #007BFF;
    }
  text-decoration: none;
`;
const StyledContainer = (0, styled_components_1.default)(react_bootstrap_1.Container) `
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f4f4f4;
  padding: 2rem;
`;
const ShippingScreen = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_2.useNavigate)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = (0, react_1.useState)(shippingAddress.address);
    const [city, setCity] = (0, react_1.useState)(shippingAddress.city);
    const [postalCode, setPostalCode] = (0, react_1.useState)(shippingAddress.postalCode);
    const [country, setCountry] = (0, react_1.useState)(shippingAddress.country);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch((0, cartActions_1.updateShipping)({ address, city, postalCode, country }));
        navigate("/cart/personalDetails");
    };
    return (react_1.default.createElement(StyledContainer, null,
        react_1.default.createElement(step_1.Steps, { step: 1 }),
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement("h2", { className: "text-center mb-4" },
                    react_1.default.createElement("i", { className: "fa-solid fa-truck-loading" }),
                    "Livrare"),
                react_1.default.createElement(StyledCard, null,
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'address' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Adresa"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduceti adresa', value: address, onChange: (e) => setAddress(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'city' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Oras"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introducti orasul', value: city, onChange: (e) => setCity(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'postalCode' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Cod postal"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduceti codul postal', value: postalCode, onChange: (e) => setPostalCode(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'country' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Tara"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduceti tara', value: country, onChange: (e) => setCountry(e.target.value) })),
                        react_1.default.createElement(StyledButton, { type: 'submit', variant: 'success', className: "mt-3" },
                            react_1.default.createElement("i", { className: 'fas fa-arrow-right' }),
                            " Pasul urmator"))))),
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement(StyledLink, { to: "/cart" },
                    react_1.default.createElement("i", { className: "fa-solid fa-cart-arrow-down" }),
                    " Inapoi la cos")))));
};
exports.ShippingScreen = ShippingScreen;

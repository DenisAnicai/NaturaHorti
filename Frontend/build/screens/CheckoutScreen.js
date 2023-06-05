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
exports.CheckoutScreen = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const StyledCard = (0, styled_components_1.default)(react_bootstrap_1.Card) `
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 15px;
`;
const StyledButton = (0, styled_components_1.default)(react_bootstrap_1.Button) `
    display: block;
    margin: 20px auto 0;
    &:hover {
        cursor: pointer;
    }
`;
const CheckoutScreen = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [name, setName] = (0, react_1.useState)("");
    const [creditCard, setCreditCard] = (0, react_1.useState)("");
    const [expiryDate, setExpiryDate] = (0, react_1.useState)("");
    const [cvv, setCvv] = (0, react_1.useState)("");
    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch an action to submit the checkout form
    };
    return (react_1.default.createElement(react_bootstrap_1.Container, null,
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement("h2", { className: "text-center mb-4" },
                    react_1.default.createElement("i", { className: "fa-solid fa-credit-card" }),
                    "Finalizare Comand\u0103"),
                react_1.default.createElement(StyledCard, null,
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'name' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Numele pe Card"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduce\u021Bi numele', value: name, onChange: (e) => setName(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'creditCard' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Num\u0103rul Cardului de Credit"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduce\u021Bi num\u0103rul cardului', value: creditCard, onChange: (e) => setCreditCard(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'expiryDate' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Data de Expirare"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'MM/YY', value: expiryDate, onChange: (e) => setExpiryDate(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'cvv' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "CVV"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduce\u021Bi CVV', value: cvv, onChange: (e) => setCvv(e.target.value) })),
                        react_1.default.createElement(StyledButton, { type: 'submit', variant: 'success' },
                            react_1.default.createElement("i", { className: 'fas fa-check-circle' }),
                            " Finalizare Comand\u0103")))))));
};
exports.CheckoutScreen = CheckoutScreen;

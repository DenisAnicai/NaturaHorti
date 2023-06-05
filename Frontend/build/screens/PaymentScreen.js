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
exports.PaymentScreen = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const styled_components_1 = __importDefault(require("styled-components"));
const step_1 = require("../components/step");
const cartActions_1 = require("../actions/cartActions");
const react_router_dom_1 = require("react-router-dom");
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
`;
const StyledButton = (0, styled_components_1.default)(react_bootstrap_1.Button) `
    display: block;
    margin: 0 auto;
    &:hover {
        cursor: pointer;
    }
`;
const PaymentMethodIcon = styled_components_1.default.i `
    font-size: 3rem;
    margin-bottom: 1rem;
`;
const PaymentScreen = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { paymentMethod } = cart;
    const [method, setMethod] = (0, react_1.useState)(paymentMethod);
    (0, react_1.useEffect)(() => {
        if (paymentMethod) {
            setMethod(paymentMethod);
        }
    }, [paymentMethod]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch((0, cartActions_1.updatePaymentMethod)(method));
        navigate("/cart/placeOrder");
    };
    return (react_1.default.createElement(StyledContainer, null,
        react_1.default.createElement(step_1.Steps, { step: 3 }),
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement("h2", { className: "text-center mb-4" },
                    react_1.default.createElement(PaymentMethodIcon, { className: "fas fa-credit-card" }),
                    " Metoda de Plata"),
                react_1.default.createElement(StyledCard, null,
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                            react_1.default.createElement(react_bootstrap_1.Form.Check, { type: 'radio', label: react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement("i", { className: "fa-solid fa-money-bill-wave" }),
                                    " Cash"), id: 'Cash', name: 'paymentMethod', value: 'Cash', checked: method === 'Cash', onChange: (e) => setMethod(e.currentTarget.value) }),
                            react_1.default.createElement(react_bootstrap_1.Form.Check, { type: 'radio', label: react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement("i", { className: "fab fa-paypal" }),
                                    " PayPal"), id: 'PayPal', name: 'paymentMethod', value: 'PayPal', checked: method === 'PayPal', onChange: (e) => setMethod(e.currentTarget.value) })),
                        react_1.default.createElement(StyledButton, { type: 'submit', variant: 'success', className: "mt-3 text-center" },
                            react_1.default.createElement("i", { className: 'fas fa-arrow-right' }),
                            " Continua\u021Bi")))))));
};
exports.PaymentScreen = PaymentScreen;

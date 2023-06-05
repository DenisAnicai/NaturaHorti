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
exports.PersonalDetailsScreen = void 0;
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
const PersonalDetailsScreen = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { personalDetails } = cart;
    const [name, setName] = (0, react_1.useState)(personalDetails.name ? personalDetails.name : userInfo ? userInfo.name : '');
    const [email, setEmail] = (0, react_1.useState)(personalDetails.email ? personalDetails.email : userInfo ? userInfo.email : '');
    const [phone, setPhone] = (0, react_1.useState)(personalDetails.phone ? personalDetails.phone : '');
    const submitHandler = (e) => {
        e.preventDefault();
        // Dispatch updatePersonalDetails with the new state
        dispatch((0, cartActions_1.updatePersonalDetails)({ name, email, phone }));
        navigate("/cart/payment");
    };
    const handlePhoneChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setPhone(onlyNums);
    };
    return (react_1.default.createElement(StyledContainer, null,
        react_1.default.createElement(step_1.Steps, { step: 2 }),
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement("h2", { className: "text-center mb-4" },
                    react_1.default.createElement("i", { className: "fa-solid fa-user" }),
                    "Detalii persoana"),
                react_1.default.createElement(StyledCard, null,
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: submitHandler },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'name' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Nume"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'text', placeholder: 'Introduce\u021Bi numele', value: name, onChange: (e) => setName(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'email' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Email"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'email', placeholder: 'Introduce\u021Bi emailul', value: email, onChange: (e) => setEmail(e.target.value) })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { controlId: 'phone' },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Telefon"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { required: true, type: 'tel', placeholder: 'Introduce\u021Bi num\u0103rul de telefon', value: phone, onChange: handlePhoneChange })),
                        react_1.default.createElement(StyledButton, { type: 'submit', variant: 'success', className: "mt-3 text-center" },
                            react_1.default.createElement("i", { className: 'fas fa-arrow-right' }),
                            " Pasul urmator")))))));
};
exports.PersonalDetailsScreen = PersonalDetailsScreen;

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
exports.Steps = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importStar(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const StepContainer = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    background-color: #f8f9fa;
    border-radius: 15px;
    margin-left: -15px;
    margin-right: -15px;
`;
const Step = styled_components_1.default.div `
    flex: 1 1 auto;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    margin: 0 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: ${props => props.clickable ? 'pointer' : 'default'};
    box-shadow: ${props => props.current ? '0px 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
    background-color: ${props => props.current ? '#fff' : 'transparent'};

    ${props => props.completed && (0, styled_components_1.css) `
        color: #007BFF;
    `}

    &:hover {
        box-shadow: ${props => props.clickable ? '0px 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
        transform: ${props => props.clickable && !props.current ? 'scale(1.05)' : 'none'};
    }

    i {
        display: block;
        margin-bottom: 5px;
    }
`;
const CompletedIcon = styled_components_1.default.div `
    display: inline-block;
    color: green;
    margin-left: 5px;
`;
const Steps = ({ step }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const navigateToStep = (stepToNavigate) => {
        if (stepToNavigate < 1 || stepToNavigate >= 5 || stepToNavigate > step) {
            return;
        }
        const paths = ['shipping', 'personalDetails', 'payment', 'placeOrder'];
        navigate(`/cart/${paths[stepToNavigate - 1]}`);
    };
    return (react_1.default.createElement(StepContainer, null,
        react_1.default.createElement(Step, { clickable: step >= 1, completed: step >= 1, current: step === 1, onClick: () => navigateToStep(1) },
            react_1.default.createElement("i", { className: "fa-solid fa-box" }),
            "1. Detalii livrare",
            step > 1 && react_1.default.createElement(CompletedIcon, null,
                react_1.default.createElement("i", { className: "fa-solid fa-check" }))),
        react_1.default.createElement(Step, { clickable: step >= 2, completed: step >= 2, current: step === 2, onClick: () => navigateToStep(2) },
            react_1.default.createElement("i", { className: "fa-solid fa-user" }),
            "2. Detalii persoana",
            step > 2 && react_1.default.createElement(CompletedIcon, null,
                react_1.default.createElement("i", { className: "fa-solid fa-check" }))),
        react_1.default.createElement(Step, { clickable: step >= 3, completed: step >= 3, current: step === 3, onClick: () => navigateToStep(3) },
            react_1.default.createElement("i", { className: "fa-solid fa-credit-card" }),
            "3. Plata",
            step > 3 && react_1.default.createElement(CompletedIcon, null,
                react_1.default.createElement("i", { className: "fa-solid fa-check" }))),
        react_1.default.createElement(Step, { clickable: step >= 4, completed: step >= 4, current: step === 4, onClick: () => navigateToStep(4) },
            react_1.default.createElement("i", { className: "fa-solid fa-file-alt" }),
            "4. Plasare comanda",
            step > 4 && react_1.default.createElement(CompletedIcon, null,
                react_1.default.createElement("i", { className: "fa-solid fa-check" })))));
};
exports.Steps = Steps;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginScreen = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const LoginScreen = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // TODO: Implement your login logic here. Use the setEmail and setPassword states.
        setLoading(false);
    });
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "my-5" },
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-md-center" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement(react_bootstrap_1.Card, { className: "p-4" },
                    react_1.default.createElement("h3", { className: "text-center mb-4" }, "Login"),
                    loading ? (react_1.default.createElement("div", { className: "text-center" },
                        react_1.default.createElement("i", { className: "fa-solid fa-spinner fa-spin", style: { fontSize: "2rem", color: "#6cb95c" } }))) : error ? (react_1.default.createElement("div", { className: "alert alert-danger", role: "alert" }, error)) : null,
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleLogin },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Email"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "email", placeholder: "Enter email", value: email, onChange: (e) => setEmail(e.target.value), required: true })),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Password"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true })),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", className: "w-100" }, "Login")))))));
};
exports.LoginScreen = LoginScreen;

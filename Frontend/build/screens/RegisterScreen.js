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
exports.RegisterScreen = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const userActions_1 = require("../actions/userActions");
const RegisterScreen = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [confirmPassword, setConfirmPassword] = (0, react_1.useState)('');
    const [successMsg, setSuccessMsg] = (0, react_1.useState)('');
    const [errorMsg, setErrorMsg] = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const userRegister = (0, react_redux_1.useSelector)((state) => state.userRegister);
    const { loading, error, success } = userRegister;
    const userInfo = (0, react_redux_1.useSelector)((state) => state.userLogin.userInfo);
    const initialErrors = { name: '', email: '', password: '', confirmPassword: '' };
    (0, react_1.useEffect)(() => {
        if (userInfo) {
            navigate('/');
        }
        if (error) {
            setErrorMsg(error);
        }
        if (success) {
            setErrorMsg(initialErrors);
            setSuccessMsg('Registration was successful!');
        }
    }, [navigate, userInfo, success, error]);
    const handleRegister = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        let errors = Object.assign({}, initialErrors);
        if (name.length < 3) {
            errors.name = 'Name must be at least 3 characters long!';
        }
        if (email.length < 3) {
            errors.email = 'Email must be at least 3 characters long!';
        }
        if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long!';
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match!';
        }
        if (!Object.values(errors).some((error) => error !== '')) {
            try {
                console.log('register');
                console.log(name, email, password);
                dispatch((0, userActions_1.register)(name, email, password));
            }
            catch (err) {
            }
        }
        else {
            setErrorMsg(errors);
        }
    });
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "my-5" },
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-md-center" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement(react_bootstrap_1.Card, { className: "p-4" },
                    react_1.default.createElement("h3", { className: "text-center mb-4" }, "Register"),
                    successMsg && react_1.default.createElement("div", { className: "alert alert-success", role: "alert" }, successMsg),
                    Object.values(errorMsg).map((error, index) => (error && (react_1.default.createElement(react_bootstrap_1.Alert, { key: index, variant: "primary" }, error)))),
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleRegister },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Name"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Enter Name", value: name, onChange: (e) => setName(e.target.value), required: true }),
                            errorMsg.name && react_1.default.createElement("small", { className: "text-danger" }, errorMsg.name)),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Email"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "email", placeholder: "Enter email", value: email, onChange: (e) => {
                                    setEmail(e.target.value);
                                    setErrorMsg(Object.assign(Object.assign({}, errorMsg), { email: '' }));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.email && react_1.default.createElement("small", { className: "text-danger" }, errorMsg.email)),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Password"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "Password", value: password, onChange: (e) => {
                                    setPassword(e.target.value);
                                    setErrorMsg(Object.assign(Object.assign({}, errorMsg), { password: '' }));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.password && react_1.default.createElement("small", { className: "text-danger" }, errorMsg.password)),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Confirm Password"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "Confirm Password", value: confirmPassword, onChange: (e) => {
                                    setConfirmPassword(e.target.value);
                                    setErrorMsg(Object.assign(Object.assign({}, errorMsg), { confirmPassword: '' }));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.confirmPassword &&
                                react_1.default.createElement("small", { className: "text-danger" }, errorMsg.confirmPassword)),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", className: "w-100", disabled: loading }, loading ? 'Loading...' : 'Register')))))));
};
exports.RegisterScreen = RegisterScreen;

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
exports.ProfileScreen = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const userActions_1 = require("../actions/userActions");
const orderActions_1 = require("../actions/orderActions");
const ProfileScreen = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [newPassword, setNewPassword] = (0, react_1.useState)('');
    const [confirmNewPassword, setConfirmNewPassword] = (0, react_1.useState)('');
    const [successMsg, setSuccessMsg] = (0, react_1.useState)('');
    const [errorMsg, setErrorMsg] = (0, react_1.useState)({
        name: '',
        email: '',
        newPassword: '',
        confirmNewPassword: '',
        phone: ''
    });
    const dispatch = (0, react_redux_1.useDispatch)();
    const userUpdate = (0, react_redux_1.useSelector)((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;
    const userLogin = (0, react_redux_1.useSelector)((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderList = (0, react_redux_1.useSelector)((state) => state.orderList);
    const { loading: orderLoading, error: orderError, orders, hasMoreOrders } = orderList;
    const [page, setPage] = (0, react_1.useState)(1);
    const [limit, setLimit] = (0, react_1.useState)(3);
    const [expandedOrders, setExpandedOrders] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            dispatch((0, orderActions_1.listOrders)(page, limit));
        }
        if (error) {
            setErrorMsg(error);
        }
        if (success) {
            setErrorMsg(initialErrors);
            setSuccessMsg('Profilul a fost actualizat cu succes!');
        }
    }, [userInfo, success, error, dispatch, page, limit] // add dispatch, page, limit to dependency array
    );
    const initialErrors = { name: '', email: '', newPassword: '', confirmNewPassword: '', phone: '' };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        let errors = Object.assign({}, initialErrors);
        if (name.length < 3) {
            errors.name = 'Numele trebuie sa aiba cel putin 3 caractere.';
        }
        if (email.length < 3) {
            errors.email = 'Email-ul trebuie sa aiba cel putin 3 caractere.';
        }
        if (newPassword.length < 8) {
            errors.newPassword = 'Parola noua trebuie sa aiba cel putin 8 caractere.';
        }
        if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'Parolele nu coincid.';
        }
        if (!Object.values(errors).some((error) => error !== '')) {
            try {
                dispatch((0, userActions_1.update)({ name, email, password: newPassword }));
            }
            catch (err) {
            }
        }
        else {
            setErrorMsg(errors);
        }
    });
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    // Function to toggle an order's expanded state
    const toggleOrder = (orderId) => {
        setExpandedOrders(prev => (Object.assign(Object.assign({}, prev), { [orderId]: !prev[orderId] })));
    };
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "my-5" },
        react_1.default.createElement("h3", { className: "text-center mb-4" },
            userInfo && userInfo.name,
            react_1.default.createElement("i", { className: "fas fa-user mx-2" })),
        react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-md-center" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement(react_bootstrap_1.Card, { className: "p-4" },
                    react_1.default.createElement("h3", { className: "text-center mb-4" }, "Profil"),
                    successMsg && react_1.default.createElement("div", { className: "alert alert-success", role: "alert" }, successMsg),
                    errorMsg && Array.isArray(errorMsg.password) && errorMsg.password && errorMsg.password.map((error, index) => (react_1.default.createElement(react_bootstrap_1.Alert, { key: index, variant: "primary" }, error))),
                    react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleSubmit },
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Nume"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Introde numele", value: name, onChange: (e) => {
                                    setName(e.target.value);
                                    setErrorMsg(prev => (Object.assign(Object.assign({}, prev), { name: '' })));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.name && react_1.default.createElement("small", { className: "text-danger" }, errorMsg.name)),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Email"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "email", placeholder: "Enter email", value: email, onChange: (e) => {
                                    setEmail(e.target.value);
                                    setErrorMsg(prev => (Object.assign(Object.assign({}, prev), { email: '' })));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.email && react_1.default.createElement("small", { className: "text-danger" }, errorMsg.email)),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Parola noua"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "Parola noua", value: newPassword, onChange: (e) => {
                                    setNewPassword(e.target.value);
                                    setErrorMsg(prev => (Object.assign(Object.assign({}, prev), { newPassword: '' })));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.newPassword &&
                                react_1.default.createElement("small", { className: "text-danger" }, errorMsg.newPassword)),
                        react_1.default.createElement(react_bootstrap_1.Form.Group, { className: "mb-3" },
                            react_1.default.createElement(react_bootstrap_1.Form.Label, null, "Confirma parola noua"),
                            react_1.default.createElement(react_bootstrap_1.Form.Control, { type: "password", placeholder: "Confirma parola noua", value: confirmNewPassword, onChange: (e) => {
                                    setConfirmNewPassword(e.target.value);
                                    setErrorMsg(prev => (Object.assign(Object.assign({}, prev), { confirmNewPassword: '' })));
                                    setSuccessMsg('');
                                }, required: true }),
                            errorMsg.confirmNewPassword &&
                                react_1.default.createElement("small", { className: "text-danger" }, errorMsg.confirmNewPassword)),
                        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", type: "submit", className: "w-100", disabled: loading }, loading ? 'Loading...' : 'Update')))),
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 6 },
                react_1.default.createElement(react_bootstrap_1.Card, { className: "p-4" },
                    react_1.default.createElement("h3", { className: "text-center mb-4" }, "Comenzi plasate"),
                    orderLoading ? (react_1.default.createElement("h2", null, "Loading...")) : orderError ? (react_1.default.createElement("h3", null, orderError)) : (react_1.default.createElement(react_1.default.Fragment, null,
                        orders.map((order) => (react_1.default.createElement(react_bootstrap_1.Card, { key: order._id, className: "mb-4 shadow", style: { border: "none" } },
                            react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                                react_1.default.createElement(react_bootstrap_1.Card.Title, null,
                                    "ID Comanda: ",
                                    order._id),
                                react_1.default.createElement(react_bootstrap_1.Button, { onClick: () => toggleOrder(order._id) }, expandedOrders[order._id] ? 'Hide Details' : 'Show Details'),
                                expandedOrders[order._id] && (react_1.default.createElement(react_bootstrap_1.Card.Text, null,
                                    react_1.default.createElement("strong", null, "Nume: "),
                                    order.user.name,
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Address: "),
                                    order.shippingAddress.address,
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Pret total: "),
                                    order.totalPrice,
                                    " Lei",
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Metoda de plata: "),
                                    order.paymentMethod,
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Comanda platita: "),
                                    order.isPaid ? 'Da' : 'Nu',
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Comanda livrata: "),
                                    order.isDelivered ? 'Da' : 'Nu',
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Plasata la: "),
                                    new Date(order.createdAt).toLocaleString(),
                                    react_1.default.createElement("br", null)))),
                            expandedOrders[order._id] && (react_1.default.createElement(react_bootstrap_1.Card.Footer, null,
                                react_1.default.createElement("h6", null, "Produse"),
                                order.items.map((item) => (react_1.default.createElement("div", { key: item._id },
                                    react_1.default.createElement("strong", null, "Nume: "),
                                    item.name,
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Cantitate: "),
                                    item.qty,
                                    react_1.default.createElement("br", null),
                                    react_1.default.createElement("strong", null, "Pret: "),
                                    item.price,
                                    react_1.default.createElement("br", null))))))))),
                        react_1.default.createElement(react_bootstrap_1.Pagination, null,
                            react_1.default.createElement(react_bootstrap_1.Pagination.Prev, { onClick: () => handlePageChange(Math.max(1, page - 1)) }),
                            react_1.default.createElement(react_bootstrap_1.Pagination.Item, null, page),
                            react_1.default.createElement(react_bootstrap_1.Pagination.Next, { onClick: () => handlePageChange(page + 1), disabled: !hasMoreOrders })))))))));
};
exports.ProfileScreen = ProfileScreen;

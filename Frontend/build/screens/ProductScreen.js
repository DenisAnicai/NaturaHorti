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
exports.ProductScreen = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const rating_1 = require("../components/rating");
const price_1 = require("../components/price");
const react_bootstrap_2 = require("react-bootstrap");
const recommendedPercentage_1 = require("../components/recommendedPercentage");
const react_redux_1 = require("react-redux");
const productActions_1 = require("../actions/productActions");
const cartActions_1 = require("../actions/cartActions");
const notificationModal_1 = __importDefault(require("../components/notificationModal"));
const stockExceededModal_1 = require("../components/stockExceededModal");
const react_router_dom_2 = require("react-router-dom");
const ProductScreen = () => {
    var _a, _b;
    const { _id } = (0, react_router_dom_1.useParams)();
    const [quantity, setQuantity] = (0, react_1.useState)("1");
    const navigate = (0, react_router_dom_2.useNavigate)();
    if (_id === undefined) {
        return react_1.default.createElement("div", null, "Produsul nu a fost gasit");
    }
    const dispatch = (0, react_redux_1.useDispatch)();
    const productDetails = (0, react_redux_1.useSelector)((state) => state.productDetails);
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    const { cartItems } = cart;
    const { loading, error, product } = productDetails;
    (0, react_1.useEffect)(() => {
        dispatch((0, productActions_1.listProductDetails)(_id));
    }, [dispatch, _id]);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleNavigate = () => {
        handleClose();
        navigate(`/cart`);
    };
    const [showStockExceededModal, setShowStockExceededModal] = (0, react_1.useState)(false);
    const closeStockExceededModal = () => setShowStockExceededModal(false);
    const addToCartHandler = () => {
        console.log(cartItems);
        const currentCartItem = cartItems.find((item) => item.product == _id);
        console.log(currentCartItem);
        const currentProductQuantity = currentCartItem ? currentCartItem.qty : 0;
        console.log(currentProductQuantity);
        console.log(parseInt(quantity));
        if (currentProductQuantity + parseInt(quantity) > (product === null || product === void 0 ? void 0 : product.countInStock)) {
            setShowStockExceededModal(true);
        }
        else {
            dispatch((0, cartActions_1.addToCart)(_id, parseInt(quantity)));
            handleShow();
        }
    };
    const handleChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value === "" ? "" : parseInt(value);
        if (value < 1 && value !== "") {
            setQuantity("1");
            return;
        }
        else if (value > (product === null || product === void 0 ? void 0 : product.countInStock)) {
            setQuantity(product === null || product === void 0 ? void 0 : product.countInStock.toString());
            return;
        }
        setQuantity(value);
    };
    return (react_1.default.createElement(react_bootstrap_1.Container, null, loading || loading === undefined ? (react_1.default.createElement("div", { className: "text-center my-5" },
        react_1.default.createElement("i", { className: "fa-solid fa-spinner fa-spin", style: { fontSize: "5rem", color: "#6cb95c" } }))) : error ? (react_1.default.createElement("div", { className: "text-center my-5" },
        react_1.default.createElement("i", { className: "fa-solid fa-exclamation-circle", style: { fontSize: "5rem", color: "red" } }),
        react_1.default.createElement("h2", null, "Eroare la incarcarea produsului"),
        react_1.default.createElement("p", { className: "my-3" }, error))) : (react_1.default.createElement("div", null,
        react_1.default.createElement(stockExceededModal_1.StockExceededModal, { show: showStockExceededModal, handleClose: closeStockExceededModal, availableItems: (product === null || product === void 0 ? void 0 : product.countInStock) - ((_a = cartItems.find((item) => item.product == _id)) === null || _a === void 0 ? void 0 : _a.qty) > 0 ?
                (product === null || product === void 0 ? void 0 : product.countInStock) - ((_b = cartItems.find((item) => item.product == _id)) === null || _b === void 0 ? void 0 : _b.qty) : 0 }),
        react_1.default.createElement(notificationModal_1.default, { show: showModal, handleClose: handleClose, handleNavigate: handleNavigate }),
        react_1.default.createElement(react_bootstrap_2.Breadcrumb, { style: { fontSize: '0.9em' }, className: "my-3" },
            react_1.default.createElement(react_bootstrap_2.Breadcrumb.Item, { href: "/", className: "text-decoration-none text-secondary" }, "Acasa"),
            react_1.default.createElement(react_bootstrap_2.Breadcrumb.Item, { active: true, className: "text-dark" },
                react_1.default.createElement("strong", null, product === null || product === void 0 ? void 0 : product.name))),
        react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement(react_bootstrap_1.Row, null,
                react_1.default.createElement(react_bootstrap_1.Col, { md: 9, className: "my-3", fluid: +true },
                    react_1.default.createElement("h4", null, product === null || product === void 0 ? void 0 : product.name))),
            react_1.default.createElement(react_bootstrap_1.Col, { md: 4 },
                react_1.default.createElement(react_bootstrap_1.Image, { src: product === null || product === void 0 ? void 0 : product.image, alt: product === null || product === void 0 ? void 0 : product.name, fluid: true })),
            react_1.default.createElement(react_bootstrap_1.Col, { md: 5 },
                react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: "flush" },
                    react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                        react_1.default.createElement(rating_1.Rating, { rating: product === null || product === void 0 ? void 0 : product.rating, numReviews: product.numReviews }),
                        react_1.default.createElement(recommendedPercentage_1.RecommendedPercentage, { rating: product === null || product === void 0 ? void 0 : product.rating })),
                    react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("i", { className: "fas fa-truck", style: { color: "#c4c4c4" } }),
                            " Livrare rapida prin curier in intreaga tara"),
                        react_1.default.createElement("div", { className: "ms-4 my-3" },
                            react_1.default.createElement("i", { className: "fas fa-check", style: { color: "green" } }),
                            " Comanda de minim 300 de lei si ai transport ",
                            react_1.default.createElement("strong", null, "GRATUIT")),
                        react_1.default.createElement("div", { className: "ms-4 my-3" },
                            react_1.default.createElement("i", { className: "fas fa-percent", style: { color: 'green' } }),
                            " Comanda de minim 1000 de lei si ai de asemenea ",
                            react_1.default.createElement("strong", null, "10%"),
                            " reducere")),
                    react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("i", { className: "fa-solid fa-box-archive", style: { color: "#c4c4c4" } }),
                            " Ridicare personala din depozit"),
                        react_1.default.createElement("div", { className: "ms-4 my-3" },
                            react_1.default.createElement("i", { className: "fas fa-check", style: { color: "green" } }),
                            " Botosani, Vorona, Str. Principala, Nr. 1")))),
            react_1.default.createElement(react_bootstrap_1.Col, { md: 3 },
                react_1.default.createElement(react_bootstrap_1.Card, { style: {
                        borderWidth: "0.1px",
                        borderColor: "#e8e8e8",
                        boxShadow: "0px 0px 4px 0px #e8e8e8",
                    } },
                    react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: "flush" },
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                            react_1.default.createElement("div", { className: "text-center" },
                                react_1.default.createElement("span", null,
                                    react_1.default.createElement(price_1.Price, { price: Number(product === null || product === void 0 ? void 0 : product.price), textSize: 1.0 })))),
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                            react_1.default.createElement("div", { className: "text-center" }, (product === null || product === void 0 ? void 0 : product.countInStock) > 0 ? (react_1.default.createElement("span", { style: { color: "#6cb95c" } },
                                react_1.default.createElement("i", { className: "fa-solid fa-boxes-stacked" }),
                                " IN STOC")) : (react_1.default.createElement("span", { style: { color: "red" } },
                                react_1.default.createElement("i", { className: "fa-solid fa-boxes-stacked" }),
                                " INDISPONIBIL")))),
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { className: "text-center" },
                            react_1.default.createElement("div", { className: "d-flex justify-content-center align-items-stretch" },
                                react_1.default.createElement("input", { type: "text", className: "form-control my-auto me-2 text-center", name: "quantity", value: quantity, onChange: handleChange, id: "quantity", style: {
                                        width: "60px",
                                        height: '38px'
                                    } }),
                                react_1.default.createElement(react_bootstrap_1.Button, { className: "btn-success flex-fill m-auto", type: "button", disabled: (product === null || product === void 0 ? void 0 : product.countInStock) === 0, onClick: () => addToCartHandler() },
                                    react_1.default.createElement("i", { className: "fas fa-cart-plus" })))))))),
        react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement(react_bootstrap_1.Col, { md: 9, className: "my-5" },
                react_1.default.createElement("h4", null, "Descriere"),
                react_1.default.createElement("p", null, product === null || product === void 0 ? void 0 : product.description)))))));
};
exports.ProductScreen = ProductScreen;

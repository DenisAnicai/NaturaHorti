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
exports.HomeScreen = void 0;
const react_1 = __importStar(require("react"));
const product_1 = require("../components/product");
const react_bootstrap_1 = require("react-bootstrap");
const productActions_1 = require("../actions/productActions");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const userActions_1 = require("../actions/userActions");
const StyledCol = (0, styled_components_1.default)(react_bootstrap_1.Col) `
  margin-bottom: 2rem;
`;
const StyledImage = styled_components_1.default.img `
  width: 100%;
  height: auto;
  object-fit: cover;
`;
const ErrorContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 0;
`;
const HomeScreen = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const productList = (0, react_redux_1.useSelector)((state) => state.productList);
    const { loading, error, products } = productList;
    const location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(() => {
        if (location.pathname.endsWith('logout')) {
            dispatch((0, userActions_1.logout)());
            alert('Deconectare cu succes!');
            navigate('/');
        }
        dispatch((0, productActions_1.listProducts)());
    }, [dispatch, location]);
    return (react_1.default.createElement(react_bootstrap_1.Container, null,
        react_1.default.createElement("h1", null, "Produse noi"),
        loading ? (react_1.default.createElement("div", { className: "text-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Spinner, { animation: "border", variant: "success", size: "sm" }))) : error ? (react_1.default.createElement(ErrorContainer, null,
            react_1.default.createElement("i", { className: "fa-solid fa-exclamation-circle", style: { fontSize: "5rem", color: "red" } }),
            react_1.default.createElement("h2", null, "Error while loading products"),
            react_1.default.createElement(react_bootstrap_1.Alert, { variant: 'danger', className: "my-3" }, error))) : (react_1.default.createElement(react_bootstrap_1.Row, null, products.map((product) => (react_1.default.createElement(StyledCol, { key: product._id, sm: 12, md: 6, lg: 4, xl: 3, xxl: 3 },
            react_1.default.createElement(product_1.Product, { _id: product._id, name: product.name, image: product.image, price: product.price, rating: product.rating, numReviews: product.numReviews, countInStock: product.countInStock, description: product.description }))))))));
};
exports.HomeScreen = HomeScreen;

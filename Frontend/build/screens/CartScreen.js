"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartScreen = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const cartActions_1 = require("../actions/cartActions");
const price_1 = require("../components/price");
const styled_components_1 = __importDefault(require("styled-components"));
const CartScreen = () => {
    //Define your styled components here
    const ImageContainer = styled_components_1.default.div `
      height: 100px;
      width: 100px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    `;
    const StyledImage = styled_components_1.default.img `
      width: 100%;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
    `;
    const LineDiv = styled_components_1.default.div `
      border-bottom: 1px solid #ccc;
      margin: 10px 0;
    `;
    const dispatch = (0, react_redux_1.useDispatch)();
    const cart = (0, react_redux_1.useSelector)((state) => state.cart);
    let { cartItems } = cart;
    const removeFromCartHandler = (id) => {
        dispatch((0, cartActions_1.removeFromCart)(id));
    };
    const updateCartHandler = (id, qty) => {
        dispatch((0, cartActions_1.updateCartItem)(id, qty));
    };
    const checkoutHandler = () => {
        // Implement checkout functionality here
    };
    return (react_1.default.createElement(react_bootstrap_1.Container, null,
        react_1.default.createElement(react_bootstrap_1.Row, { className: "my-3" },
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12 },
                react_1.default.createElement("h2", null,
                    react_1.default.createElement("i", { className: "fa-solid fa-shopping-cart" }),
                    "Cos de cumparaturi"))),
        react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 8 }, cartItems.length === 0 ? (react_1.default.createElement(react_bootstrap_1.Alert, { variant: 'info' },
                "Cosul dumneavoastra este gol. ",
                react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                    react_1.default.createElement("i", { className: "fa-solid fa-chevron-left" }),
                    " Mergeti inapoi "),
                " pentru a adauga produse!")) : (react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: 'flush' }, cartItems.map((item, index) => (react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { key: index },
                react_1.default.createElement(react_bootstrap_1.Row, null,
                    react_1.default.createElement(react_bootstrap_1.Col, { xs: 4, md: 3 },
                        react_1.default.createElement(ImageContainer, null,
                            react_1.default.createElement(StyledImage, { src: item.image, alt: item.name }))),
                    react_1.default.createElement(react_bootstrap_1.Col, { xs: 8, md: 4, className: "d-flex align-items-center" },
                        react_1.default.createElement(react_router_dom_1.Link, { to: `/product/${item.name}/${item.product}`, style: { fontSize: "1.2em" }, className: "text-decoration-none  text-center hover-effect m-auto" },
                            react_1.default.createElement("strong", null, item.name))),
                    react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 5, className: "d-flex flex-column justify-content-center m-auto" },
                        react_1.default.createElement(price_1.Price, { price: item.price, textSize: 0.9 }),
                        react_1.default.createElement(react_bootstrap_1.Row, { className: "mt-2" },
                            react_1.default.createElement(react_bootstrap_1.Col, { xs: 6, md: 6, style: { maxWidth: "100px" } },
                                react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "text-center m-auto", style: { maxWidth: "100%" }, as: "select", value: item.qty, onChange: (e) => updateCartHandler(item.product, Number(e.target.value)) }, [...Array(item.countInStock).keys()].map(x => (react_1.default.createElement("option", { key: x + 1, value: x + 1 }, x + 1))))),
                            react_1.default.createElement(react_bootstrap_1.Col, { xs: 6, md: 6 },
                                react_1.default.createElement(react_bootstrap_1.Button, { type: 'button', variant: 'light', onClick: () => removeFromCartHandler(item.product) },
                                    react_1.default.createElement("i", { className: 'fas fa-trash m-auto' })))))),
                react_1.default.createElement(LineDiv, null))))))),
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 12, md: 4 },
                react_1.default.createElement(react_bootstrap_1.Card, null,
                    react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: 'flush', className: "text-center" },
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                            react_1.default.createElement("h2", null, "Subtotal produse"),
                            react_1.default.createElement(price_1.Price, { price: parseFloat((cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)).toFixed(2)) })),
                        react_1.default.createElement(react_bootstrap_1.ListGroup.Item, null,
                            react_1.default.createElement(react_bootstrap_1.Button, { type: 'button', className: 'btn-block', disabled: cartItems.length === 0, onClick: checkoutHandler },
                                react_1.default.createElement("i", { className: 'fas fa-shopping-cart' }),
                                " Proceed To Checkout"))))))));
};
exports.CartScreen = CartScreen;

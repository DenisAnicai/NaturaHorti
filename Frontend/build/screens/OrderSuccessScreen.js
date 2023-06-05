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
exports.OrderSuccessScreen = void 0;
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const framer_motion_1 = require("framer-motion");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_1 = require("react-redux");
const react_redux_2 = require("react-redux");
const orderActions_1 = require("../actions/orderActions");
const StyledCard = (0, styled_components_1.default)(react_bootstrap_1.Card) `
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  max-width: 600px;
`;
const StyledButton = (0, styled_components_1.default)(react_bootstrap_1.Button) `
  background-color: #3498db;
  border: none;
  padding: 10px 20px;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    color: #ffffff;
  }
`;
const SummarySection = styled_components_1.default.section `
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  background-color: #f9f9f9;
`;
const SummaryItem = styled_components_1.default.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const ImageContainer = styled_components_1.default.div `
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ItemInfoContainer = styled_components_1.default.div `
  flex: 2;
  padding-left: 20px;
`;
const ItemContainer = styled_components_1.default.div `
  display: flex;
  margin-bottom: 10px;
`;
const OrderSuccessScreen = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, react_redux_2.useDispatch)();
    const { orderId } = (0, react_router_dom_1.useParams)();
    const orderDetails = (0, react_redux_1.useSelector)((state) => state.orderCreate.order);
    (0, react_1.useEffect)(() => {
        if (orderDetails === undefined) {
            navigate('/');
        }
        const timer = setTimeout(() => {
            dispatch((0, orderActions_1.resetOrderAll)());
            navigate('/');
        }, 30000);
        return () => clearTimeout(timer);
    }, [navigate, orderDetails]);
    const animationVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 },
    };
    const handleHomeClick = () => {
        dispatch((0, orderActions_1.resetOrderAll)());
        navigate('/');
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(framer_motion_1.motion.div, { initial: "hidden", animate: "visible", variants: animationVariants, transition: { type: "spring", stiffness: 260, damping: 20 } },
            react_1.default.createElement(StyledCard, { className: "text-center" },
                react_1.default.createElement(react_bootstrap_1.Card.Body, null,
                    react_1.default.createElement(react_bootstrap_1.Card.Title, null, "Comanda reu\u0219it\u0103"),
                    react_1.default.createElement(react_bootstrap_1.Card.Text, null,
                        "Comanda ta cu ID-ul: ",
                        orderId,
                        " a fost plasat\u0103 cu succes."),
                    react_1.default.createElement(react_bootstrap_1.Card.Text, null, "Vei fi redirec\u021Bionat c\u0103tre pagina principal\u0103 \u00EEn 30 de secunde..."),
                    react_1.default.createElement(SummarySection, null,
                        react_1.default.createElement("h4", null, "Rezumatul comenzii:"),
                        react_1.default.createElement(react_bootstrap_1.ListGroup, { variant: "flush" }, orderDetails && orderDetails.items && orderDetails.items.map((item) => (react_1.default.createElement(react_bootstrap_1.ListGroup.Item, { key: item.product },
                            react_1.default.createElement(ItemContainer, null,
                                react_1.default.createElement(ImageContainer, null,
                                    react_1.default.createElement(react_bootstrap_1.Image, { src: item.image, alt: item.name, fluid: true, rounded: true, style: { width: '100px', height: '100px' } })),
                                react_1.default.createElement(ItemInfoContainer, null,
                                    item.qty,
                                    " x ",
                                    item.name)))))),
                        react_1.default.createElement(SummaryItem, null,
                            react_1.default.createElement("span", null, "Adresa:"),
                            react_1.default.createElement("span", null,
                                orderDetails && orderDetails.shippingAddress.address,
                                ", ",
                                orderDetails && orderDetails.shippingAddress.city,
                                ", ",
                                orderDetails && orderDetails.shippingAddress.postalCode,
                                ", ",
                                orderDetails && orderDetails.shippingAddress.country)),
                        react_1.default.createElement(SummaryItem, null,
                            react_1.default.createElement("span", null, "Metoda de plat\u0103:"),
                            react_1.default.createElement("span", null, orderDetails && orderDetails.paymentMethod)),
                        react_1.default.createElement(SummaryItem, null,
                            react_1.default.createElement("span", null, "Pre\u021B total:"),
                            react_1.default.createElement("span", null,
                                orderDetails && orderDetails.totalPrice,
                                " Lei"))),
                    react_1.default.createElement(StyledButton, { className: "mt-3 mb-1", variant: "primary", onClick: handleHomeClick }, "Mergi Acum Acas\u0103"))))));
};
exports.OrderSuccessScreen = OrderSuccessScreen;

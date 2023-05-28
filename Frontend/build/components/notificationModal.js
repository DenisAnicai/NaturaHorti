"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const NotificationModal = ({ show, handleClose, handleNavigate }) => {
    return (react_1.default.createElement(react_bootstrap_1.Modal, { show: show, onHide: handleClose },
        react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
            react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Produs adaugat!")),
        react_1.default.createElement(react_bootstrap_1.Modal.Body, null, "Produsul a fost adaugat in cosul dumneavoastra."),
        react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: handleClose }, "Continua cumparaturile"),
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: handleNavigate }, "Mergi la cos"))));
};
exports.default = NotificationModal;

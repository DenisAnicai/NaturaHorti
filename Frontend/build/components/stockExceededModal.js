"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockExceededModal = void 0;
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const StockExceededModal = ({ show, handleClose, availableItems }) => (react_1.default.createElement(react_bootstrap_1.Modal, { show: show, onHide: handleClose, centered: true },
    react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
        react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Limita stocului a fost atinsa")),
    react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
        react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
            "Numarul de produse pe care ati incercat sa le adaugati in cos depaseste numarul de produse disponibile in stoc.",
            react_1.default.createElement("br", null),
            react_1.default.createElement("br", null),
            "Numarul de produse disponibile pe care le mai pute\u021Bi adauga in cos este de ",
            availableItems,
            "."),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_bootstrap_1.Button, { variant: "primary", onClick: handleClose }, "OK"))));
exports.StockExceededModal = StockExceededModal;

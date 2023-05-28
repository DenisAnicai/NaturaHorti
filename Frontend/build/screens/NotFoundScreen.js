"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundScreen = void 0;
const react_1 = __importDefault(require("react"));
const NotFoundScreen = () => {
    return (react_1.default.createElement("div", { id: "notfound" },
        react_1.default.createElement("div", { className: "notfound" },
            react_1.default.createElement("div", { className: "notfound-404" },
                react_1.default.createElement("div", null),
                react_1.default.createElement("h1", null, "404")),
            react_1.default.createElement("h2", null, "Pagina nu a fost gasita"),
            react_1.default.createElement("p", { className: "my-5" }, "Pagina pe care ati incercat sa o accesati nu a fost gasita sau este temporar indisponibila."))));
};
exports.NotFoundScreen = NotFoundScreen;

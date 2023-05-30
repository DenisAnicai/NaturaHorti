"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ide_toolbox_1 = require("@react-buddy/ide-toolbox");
const palette_1 = require("./palette");
const ComponentPreviews = () => {
    return (react_1.default.createElement(ide_toolbox_1.Previews, { palette: react_1.default.createElement(palette_1.PaletteTree, null) }));
};
exports.default = ComponentPreviews;
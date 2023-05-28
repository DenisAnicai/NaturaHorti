"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleLoaderComponent = exports.PaletteTree = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const ide_toolbox_1 = require("@react-buddy/ide-toolbox");
const PaletteTree = () => (react_1.default.createElement(ide_toolbox_1.Palette, null,
    react_1.default.createElement(ide_toolbox_1.Category, { name: "App" },
        react_1.default.createElement(ide_toolbox_1.Component, { name: "Loader" },
            react_1.default.createElement(ide_toolbox_1.Variant, null,
                react_1.default.createElement(ExampleLoaderComponent, null))))));
exports.PaletteTree = PaletteTree;
function ExampleLoaderComponent() {
    return (react_1.default.createElement(react_2.Fragment, null, "Loading..."));
}
exports.ExampleLoaderComponent = ExampleLoaderComponent;

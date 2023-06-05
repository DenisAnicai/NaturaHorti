import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {LoginScreen} from "../screens/LoginScreen";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/LoginScreen">
                <LoginScreen/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
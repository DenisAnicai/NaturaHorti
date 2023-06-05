import React from "react";
import {Card} from "react-bootstrap";

export const Price: React.FC<{ price: number, textSize?: number }> = ({price, textSize}) => {
    const integerPart = Math.floor(price);
    const decimalPart = (price % 1 !== 0) ? Number(price.toFixed(2)).toString().split('.')[1] : "00";

    textSize = textSize || 0.8;
    const decimalTextSize = 0.35 * textSize;
    return (
        <Card.Text as="h3" style={{color: "#CC0000FF", marginBottom: '0.5rem'}}>
            <span style={{fontSize: `${textSize}em`}}>
                {integerPart}
            </span>
            <span style={{fontSize: `${decimalTextSize}em`, verticalAlign: 'super'}}>
                {decimalPart}
            </span>
            <span style={{fontSize: `${textSize}em`}}> Lei</span>
        </Card.Text>
    );
};
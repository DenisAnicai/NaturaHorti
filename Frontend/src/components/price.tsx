import React from "react";
import {Card} from "react-bootstrap";

export const Price: React.FC<{ price: number, textSize?: number }> = ({price, textSize}) => {
    const integerPart = Math.floor(price);
    const decimalPart = price % 1 !== 0 ? price.toString().split('.')[1] : null;

    textSize = textSize || 0.8;
    const decimalTextSize = 0.35 * textSize;
    return (
        <Card.Text as="h3" className="my-2 mb-0" style={{color: "#CC0000FF"}}>
      <span style={{fontSize: `${textSize}em`}}>
        {integerPart}
      </span>
            {decimalPart && (
                <span style={{fontSize: `${decimalTextSize}em`, verticalAlign: 'super'}}>
            {decimalPart}
        </span>
            )} Lei
        </Card.Text>
    );
};
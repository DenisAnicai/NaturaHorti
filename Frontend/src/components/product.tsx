import React from "react";
import {Card} from "react-bootstrap";

import {Rating} from './rating';
import {Price} from './price';

import {Link} from 'react-router-dom';

import {ProductProp} from "../utils/props";

export const Product: React.FC<ProductProp> = ({
                                                    _id,
                                                    name,
                                                    image,
                                                    price,
                                                    rating,
                                                    numReviews,
                                                    countInStock,
                                                }) => {

    if (name.length > 50) {
        name = name.substring(0, 50) + "...";
    }
    return (
        <Card className="my-3 p-3 rounded border-0 text-center shadow-sm">
            <Link to={`/product/${name.replace(/\s/g, '-')}/${_id}`} className="text-decoration-none text-dark">
                <Card.Img src={image} variant="top" className="" style={{height: "200px", objectFit: "cover", objectPosition: "center", borderRadius: "0.5rem"}}/>
                <Card.Body>
                    <Card.Title as="div" className="text-center hover-effect mb-3 " style={{height: "6rem"}}>
                        <strong>{name}</strong>
                    </Card.Title>

                    <Card.Text as="div">
                        <div className="my-3">
                            <Rating rating={rating} numReviews={numReviews} showNumReviews={true}/>
                        </div>
                    </Card.Text>
                    <Price price={Number(price)} textSize={0.9}/>
                    <div className="text-center mt-2" style={{fontSize: "0.8em"}}>
                        {countInStock > 0 ? (
                            <span style={{color: "#6cb95c"}}>
                                <i className="fa-solid fa-boxes-stacked"/> IN STOC
                              </span>
                        ) : (
                            <span style={{color: "red"}}>
                                <i className="fa-solid fa-boxes-stacked"/> INDISPONIBIL
                              </span>
                        )}
                    </div>
                </Card.Body>
            </Link>
        </Card>
    );
};
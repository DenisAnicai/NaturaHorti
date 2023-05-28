import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Container, Form, Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart, updateCartItem} from "../actions/cartActions";

import {Price} from "../components/price";
import {Rating} from "../components/rating";

import styled from 'styled-components';

export const CartScreen = () => {

//Define your styled components here
    const ImageContainer = styled.div`
      height: 100px;
      width: 100px;
      border: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    `;

    const StyledImage = styled.img`
      width: 100%;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
      box-shadow: 0 0 5px #ccc;
    `;

    const LineDiv = styled.div`
      border-bottom: 1px solid #ccc;
      margin: 10px 0;
    `;

    const dispatch = useDispatch();

    const cart = useSelector((state: any) => state.cart);
    let {cartItems} = cart;

    const removeFromCartHandler = (id: string) => {
        dispatch<any>(removeFromCart(id));
    };

    const updateCartHandler = (id: string, qty: number) => {
        dispatch<any>(updateCartItem(id, qty));
    };

    const checkoutHandler = () => {
        // Implement checkout functionality here
    };

    return (
        <Container>
            <Row className="my-3">
                <Col xs={12}>
                    <h2><i className="fa-solid fa-shopping-cart"/>Cos de cumparaturi</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={8}>
                    {cartItems.length === 0 ? (
                        <Alert variant='info'>
                            Cosul dumneavoastra este gol. <Link to="/"><i className="fa-solid fa-chevron-left"/> Mergeti inapoi </Link> pentru
                            a adauga produse!
                        </Alert>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item: any, index: number) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col xs={4} md={3}>
                                            <ImageContainer>
                                                <StyledImage src={item.image} alt={item.name}/>
                                            </ImageContainer>
                                        </Col>
                                        <Col xs={8} md={4} className="d-flex align-items-center">
                                            <Link to={`/product/${item.name}/${item.product}`} style={{fontSize: "1.2em"}}
                                                  className="text-decoration-none  text-center hover-effect m-auto">
                                                <strong>{item.name}</strong>
                                            </Link>
                                        </Col>
                                        <Col xs={12} md={5} className="d-flex flex-column justify-content-center m-auto">
                                            <Price price={item.price} textSize={0.9}/>
                                            <Row className="mt-2">
                                                <Col xs={6} md={6} style={{maxWidth: "100px"}}>
                                                    <Form.Control className="text-center m-auto" style={{maxWidth: "100%"}}
                                                                  as="select" value={item.qty}
                                                                  onChange={(e) => updateCartHandler(item.product, Number(e.target.value))}>
                                                        {[...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                                <Col xs={6} md={6}>
                                                    <Button
                                                        type='button'
                                                        variant='light'
                                                        onClick={() => removeFromCartHandler(item.product)}
                                                    >
                                                        <i className='fas fa-trash m-auto'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <LineDiv/>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col xs={12} md={4}>
                    <Card>
                        <ListGroup variant='flush' className="text-center">
                            <ListGroup.Item>
                                <h2>Subtotal produse</h2>
                                <Price price={parseFloat((cartItems.reduce((acc: number, item: any) =>
                                    acc + item.qty * item.price, 0)).toFixed(2))} />

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    <i className='fas fa-shopping-cart'></i> Proceed To Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

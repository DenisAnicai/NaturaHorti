import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card, Button, Container, Form, Alert} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {updateShipping} from '../actions/cartActions';
import {Steps} from "../components/step";
import styled from 'styled-components';
import {useEffect} from "react";
import {clearCart} from "../actions/cartActions";
import {resetOrder} from "../actions/orderActions";

const StyledCard = styled(Card)`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 15px;
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  color: #333;

  &:hover {
    color: #007BFF;
  }

  text-decoration: none;
`;

const StyledContainer = styled(Container)`
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f4f4f4;
  padding: 2rem;
`;
export const ShippingScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state: any) => state.cart);
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const orderCreate = useSelector((state: any) => state.orderCreate);
    const {order, success, error} = orderCreate;

    useEffect(() => {
        if (order) {
            dispatch<any>(clearCart());
            dispatch<any>(resetOrder());
            navigate(`/cart/order/${order._id}`);
        }
    }, [navigate, order, dispatch]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch<any>(updateShipping({address, city, postalCode, country}));
        navigate("/cart/personalDetails");
    };

    return (
        <StyledContainer>
            <Steps step={1}/>
            <Row className="justify-content-center my-5">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4"><i className="fa-solid fa-truck-loading"/>Livrare</h2>
                    <StyledCard>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='address'>
                                <Form.Label>Adresa</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Introduceti adresa'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='city'>
                                <Form.Label>Oras</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Introducti orasul'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='postalCode'>
                                <Form.Label>Cod postal</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Introduceti codul postal'
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='country'>
                                <Form.Label>Tara</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Introduceti tara'
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <StyledButton type='submit' variant='success' className="mt-3">
                                <i className='fas fa-arrow-right'></i> Pasul urmator
                            </StyledButton>
                        </Form>
                    </StyledCard>
                </Col>
            </Row>
            <Row className="justify-content-center my-5">
                <Col xs={12} md={6}>
                    <StyledLink to="/cart"><i className="fa-solid fa-cart-arrow-down"/> Inapoi la cos</StyledLink>
                </Col>
            </Row>
        </StyledContainer>
    );
};

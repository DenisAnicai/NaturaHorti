import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Row, Col, Card, Container, Button, ListGroup, Alert, Spinner} from 'react-bootstrap';
import styled from 'styled-components';
import {Price} from '../components/price';
import {Steps} from "../components/step";
import {resetOrderAll, saveOrder} from "../actions/orderActions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {clearCart} from "../actions/cartActions";
import {resetOrder} from "../actions/orderActions";

const StyledContainer = styled(Container)`
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #f4f4f4;
  padding: 2rem;
`;

const StyledCard = styled(Card)`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  h2, h3, h4 {
    color: #444;
  }

  p {
    color: #777;
  }
`;

const StyledButton = styled(Button)`
  background-color: #48ca3b;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background-color: #36a029;
  }
`;
export const OrderSummaryScreen: React.FC = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const cart = useSelector((state: any) => state.cart);
        const {cartItems, shippingAddress, paymentMethod, personalDetails} = cart;

        const itemsPrice = cartItems.reduce((acc: number, item: any) => acc + item.price * item.qty, 0);
        const VAT_RATE = 0.19;
        const vatPrice = itemsPrice * VAT_RATE;
        const shippingPrice = itemsPrice > 300 ? 0 : 25.00;

        const totalPrice = itemsPrice + shippingPrice + vatPrice;

        const orderCreate = useSelector((state: any) => state.orderCreate);
        const {order, success, error, loading} = orderCreate;

        useEffect(() => {
            if (order) {
                dispatch<any>(clearCart());
                dispatch<any>(resetOrderAll());
                navigate(`/cart/order/${order._id}`);
            }
        }, [navigate, order, dispatch]);

        const placeOrderHandler = () => {
            dispatch<any>(saveOrder({
                orderItems: cartItems,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                personalDetails: personalDetails,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                vatPrice: vatPrice,
                totalPrice: totalPrice
            }));
        }

        return (
            <StyledContainer>
                <Steps step={4}/>
                <Row className="justify-content-center my-5 text-center">
                    <Col xs={12} md={6}>
                        <h2 className="text-center mb-4">
                            <i className="fa-solid fa-receipt"></i> Rezumat Comanda
                        </h2>
                        <StyledCard>
                            <ListGroup variant='flush'>
                                <ListGroup.Item style={{borderBottom: '1px solid #dee2e6'}}>
                                    <h3><i className="fa-solid fa-user"></i> {personalDetails.name}</h3>
                                    <p><i className="fa-solid fa-envelope"></i> {personalDetails.email}</p>
                                    <p><i className="fa-solid fa-phone"></i> {personalDetails.phone}</p>
                                </ListGroup.Item>
                                <ListGroup.Item style={{borderBottom: '1px solid #dee2e6'}}>
                                    <h3><i className="fa-solid fa-box"></i> Produse</h3>
                                    {cartItems.map((item: any, index: number) => (
                                        <div key={index}>
                                            {item.name} - {item.qty} bucati <span><Price price={item.price * item.qty}
                                                                                         textSize={0.6}/></span>
                                        </div>
                                    ))}
                                    <hr/>
                                    <h4>Total Produse: <span><Price price={itemsPrice} textSize={0.8}/></span></h4>
                                    <h4>Cost Transport: <span><Price price={shippingPrice} textSize={0.8}/></span></h4>
                                    <h4>TVA: <span><Price price={vatPrice} textSize={0.8}/></span></h4>
                                    <hr/>
                                    <h4>Total General: <span><Price price={totalPrice} textSize={1.2}/></span></h4>
                                </ListGroup.Item>
                                <ListGroup.Item style={{borderBottom: '1px solid #dee2e6'}}>
                                    <h3><i className="fa-solid fa-map-marker-alt"></i> Adresa de livrare</h3>
                                    <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3><i className="fa-solid fa-credit-card"></i> Metoda de Plata</h3>
                                    <p>{paymentMethod}</p>
                                </ListGroup.Item>
                            </ListGroup>
                            <StyledButton type='button' variant='success' className="mt-3 text-center"
                                          onClick={placeOrderHandler}>
                                <i className='fas fa-check'></i> Confirmare Comanda
                            </StyledButton>
                            {loading ? (
                                <Alert variant="info" className="mt-3">
                                    <Spinner animation="border" size="sm"/> Procesam comanda...
                                </Alert>
                            ) : error ? (
                                <Alert variant='danger' className="mt-3">{error}</Alert>
                            ) : (
                                <></>
                            )}
                        </StyledCard>
                    </Col>
                </Row>
            </StyledContainer>
        );
    }
;

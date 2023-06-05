import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Container, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Steps } from "../components/step";
import { updatePaymentMethod } from '../actions/cartActions';
import {useNavigate} from "react-router-dom";

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
`;

const StyledButton = styled(Button)`
    display: block;
    margin: 0 auto;
    &:hover {
        cursor: pointer;
    }
`;

const PaymentMethodIcon = styled.i`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

export const PaymentScreen: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state: any) => state.cart);
    const { paymentMethod } = cart;

    const [method, setMethod] = useState(paymentMethod);

    useEffect(() => {
        if (paymentMethod) {
            setMethod(paymentMethod);
        }
    }, [paymentMethod]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch<any>(updatePaymentMethod(method));
        navigate("/cart/placeOrder");
    };

    return (
        <StyledContainer>
            <Steps step={3} />
            <Row className="justify-content-center my-5">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4"><PaymentMethodIcon className="fas fa-credit-card" /> Metoda de Plata</h2>
                    <StyledCard>
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Check
                                    type='radio'
                                    label={<><i className="fa-solid fa-money-bill-wave"></i> Cash</>}
                                    id='Cash'
                                    name='paymentMethod'
                                    value='Cash'
                                    checked={method === 'Cash'}
                                    onChange={(e) => setMethod(e.currentTarget.value)}
                                />
                                <Form.Check
                                    type='radio'
                                    label={<><i className="fab fa-paypal"></i> PayPal</>}
                                    id='PayPal'
                                    name='paymentMethod'
                                    value='PayPal'
                                    checked={method === 'PayPal'}
                                    onChange={(e) => setMethod(e.currentTarget.value)}
                                />
                            </Form.Group>

                            <StyledButton type='submit' variant='success' className="mt-3 text-center">
                                <i className='fas fa-arrow-right'></i> Continuați
                            </StyledButton>
                        </Form>
                    </StyledCard>
                </Col>
            </Row>
        </StyledContainer>
    );
};

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Row, Col, Card, Button, Container, Form} from 'react-bootstrap';
import styled from 'styled-components';
import {Steps} from "../components/step";
import {clearCart, updatePersonalDetails} from "../actions/cartActions";
import {useNavigate} from "react-router-dom";
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
`;

const StyledButton = styled(Button)`
  display: block;
  margin: 0 auto;

  &:hover {
    cursor: pointer;
  }
`;

export const PersonalDetailsScreen: React.FC = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const userLogin = useSelector((state: any) => state.userLogin);
        const {userInfo} = userLogin;

        const cart = useSelector((state: any) => state.cart);
        const {personalDetails} = cart;


        const [name, setName] = useState(personalDetails.name ? personalDetails.name : userInfo ? userInfo.name : '');
        const [email, setEmail] = useState(personalDetails.email ? personalDetails.email : userInfo ? userInfo.email : '');
        const [phone, setPhone] = useState(personalDetails.phone ? personalDetails.phone : '');


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
            // Dispatch updatePersonalDetails with the new state
            dispatch<any>(updatePersonalDetails({name, email, phone}));
            navigate("/cart/payment");
        };

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, '');
            setPhone(onlyNums);
        }

        return (
            <StyledContainer>
                <Steps step={2}/>
                <Row className="justify-content-center my-5">
                    <Col xs={12} md={6}>
                        <h2 className="text-center mb-4"><i className="fa-solid fa-user"/>Detalii persoana</h2>
                        <StyledCard>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Nume</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        placeholder='Introduceți numele'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type='email'
                                        placeholder='Introduceți emailul'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='phone'>
                                    <Form.Label>Telefon</Form.Label>
                                    <Form.Control
                                        required
                                        type='tel'
                                        placeholder='Introduceți numărul de telefon'
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    ></Form.Control>
                                </Form.Group>

                                <StyledButton type='submit' variant='success' className="mt-3 text-center">
                                    <i className='fas fa-arrow-right'></i> Pasul urmator
                                </StyledButton>
                            </Form>
                        </StyledCard>
                    </Col>
                </Row>
            </StyledContainer>
        );
    }
;

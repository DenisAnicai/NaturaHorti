import React, {useState, useEffect} from 'react';
import {Button, Card, Container, Form, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import {login} from "../actions/userActions";
import {useNavigate} from 'react-router-dom';

export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state: any) => state.userLogin)
    const {loading, error, userInfo} = userLogin;

    useEffect(() => {
        if (userInfo) {
            // wait 2 seconds then redirect to home page
            setTimeout(() => {
                    navigate('/');
                }
                , 2000);
        }
    }, [navigate, userInfo]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch<any>(login(email, password));
        } catch (err: any) {
            // Error handling here...
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="p-4">
                        <h3 className="text-center mb-4">Login</h3>
                        {loading ? (
                            <div className="text-center">
                                <i className="fa-solid fa-spinner fa-spin"
                                   style={{fontSize: "2rem", color: "#6cb95c"}}/>
                            </div>
                        ) : error ? (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) : userInfo ? (
                            <div className="alert alert-success" role="alert">
                                Autentificare cu succes! Bun venit, {userInfo.name}!
                            </div>
                        ) : null}
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

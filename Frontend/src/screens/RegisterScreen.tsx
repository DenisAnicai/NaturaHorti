import React, {useState, useEffect} from 'react';
import {Button, Card, Container, Form, Row, Col, Alert} from 'react-bootstrap';

import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {register} from '../actions/userActions';

export const RegisterScreen: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<{ [key: string]: string | [string] }>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegister = useSelector((state: any) => state.userRegister);
    const {loading, error, success} = userRegister;

    const userInfo = useSelector((state: any) => state.userLogin.userInfo);
    const initialErrors = {name: '', email: '', password: '', confirmPassword: ''};

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
        if (error) {
            setErrorMsg(error);
        }
        if (success) {
            setErrorMsg(initialErrors);
            setSuccessMsg('Inregistrare cu succes!');
        }
    }, [navigate, userInfo, success, error]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        let errors = {...initialErrors};

        if (name.length < 3) {
            errors.name = 'Numele trebuie sa aiba cel putin 3 caractere!';
        }

        if (email.length < 3) {
            errors.email = 'Email-ul trebuie sa aiba cel putin 3 caractere!';
        }

        if (password.length < 8) {
            errors.password = 'Parola trebuie sa aiba cel putin 8 caractere!';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Parolele nu se potrivesc!';
        }

        if (!Object.values(errors).some((error) => error !== '')) {
            try {
                dispatch<any>(register(name, email, password));
            } catch (err: any) {

            }

        } else {
            setErrorMsg(errors);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="p-4">
                        <h3 className="text-center mb-4">Register</h3>
                        {successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}
                        {Object.values(errorMsg).map((error, index) => (
                            error && (
                                <Alert key={index} variant="primary">
                                    {error}
                                </Alert>
                            )
                        ))}
                        <Form onSubmit={handleRegister}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nume</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                {errorMsg.name && <small className="text-danger">{errorMsg.name}</small>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorMsg({...errorMsg, email: ''});
                                        setSuccessMsg('');
                                    }}
                                    required
                                />
                                {errorMsg.email && <small className="text-danger">{errorMsg.email}</small>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Parola</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMsg({...errorMsg, password: ''});
                                        setSuccessMsg('');
                                    }}
                                    required
                                />
                                {errorMsg.password && <small className="text-danger">{errorMsg.password}</small>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Confirma parola</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrorMsg({...errorMsg, confirmPassword: ''});
                                        setSuccessMsg('');
                                    }}
                                    required
                                />
                                {errorMsg.confirmPassword &&
                                  <small className="text-danger">{errorMsg.confirmPassword}</small>}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? 'Se incarca' : 'Inregistrare'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
        ;
};

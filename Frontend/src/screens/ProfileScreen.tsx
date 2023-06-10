import React, {useState, useEffect} from 'react';
import {Button, Card, Container, Form, Row, Col, Alert, Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {update} from '../actions/userActions';
import {listOrders} from '../actions/orderActions';
import {useNavigate} from "react-router-dom";


export const ProfileScreen: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<{ [key: string]: string | [string] }>({
        name: '',
        email: '',
        newPassword: '',
        confirmNewPassword: '',
        phone: ''
    });
    const dispatch = useDispatch();
    const userUpdate = useSelector((state: any) => state.userUpdate)
    const {loading, error, success} = userUpdate;

    const userLogin = useSelector((state: any) => state.userLogin)
    const {userInfo} = userLogin;

    const orderList = useSelector((state: any) => state.orderList);
    const {loading: orderLoading, error: orderError, orders, hasMoreOrders} = orderList;
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(3);
    const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({});

    const navigate = useNavigate();

    useEffect(() => {
            if (userInfo) {
                setName(userInfo.name);
                setEmail(userInfo.email);
                dispatch<any>(listOrders(page, limit));

            }
            if (error) {
                setErrorMsg(error);
            }
            if (success) {
                setErrorMsg(initialErrors);
                setSuccessMsg('Profilul a fost actualizat cu succes!');
            }
        },
        [userInfo, success, error, dispatch, page, limit] // add dispatch, page, limit to dependency array
    );


    const initialErrors = {name: '', email: '', newPassword: '', confirmNewPassword: '', phone: ''};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let errors = {...initialErrors};

        if (name.length < 3) {
            errors.name = 'Numele trebuie sa aiba cel putin 3 caractere.';
        }

        if (email.length < 3) {
            errors.email = 'Email-ul trebuie sa aiba cel putin 3 caractere.';
        }

        if (newPassword.length < 8) {
            errors.newPassword = 'Parola noua trebuie sa aiba cel putin 8 caractere.';
        }

        if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'Parolele nu coincid.';
        }

        if (!Object.values(errors).some((error) => error !== '')) {
            try {
                dispatch<any>(update({name, email, password: newPassword}));
            } catch (err: any) {

            }

        } else {
            setErrorMsg(errors);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    // Function to toggle an order's expanded state
    const toggleOrder = (orderId: string) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };


    const handlePayNow = (order: any) => {
        navigate(`/cart/order/${order._id}`)
    }

    return (
        <Container className="my-5">
            <h3 className="text-center mb-4">{userInfo && userInfo.name}<i className="fas fa-user mx-2"/></h3>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="p-4">
                        <h3 className="text-center mb-4">Profil</h3>
                        {successMsg && <div className="alert alert-success" role="alert">{successMsg}</div>}
                        {errorMsg && Array.isArray(errorMsg.password) && errorMsg.password && errorMsg.password.map((error: string, index: number) => (
                            <Alert key={index} variant="primary">
                                {error}
                            </Alert>
                        ))}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nume</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Introde numele"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setErrorMsg(prev => ({...prev, name: ''}));
                                        setSuccessMsg('');
                                    }}
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
                                        setErrorMsg(prev => ({...prev, email: ''}));
                                        setSuccessMsg('');
                                    }}
                                    required
                                />
                                {errorMsg.email && <small className="text-danger">{errorMsg.email}</small>}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Parola noua</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Parola noua"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setErrorMsg(prev => ({...prev, newPassword: ''}));
                                        setSuccessMsg('');
                                    }}
                                    required
                                />
                                {errorMsg.newPassword &&
                                  <small className="text-danger">{errorMsg.newPassword}</small>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Confirma parola noua</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirma parola noua"
                                    value={confirmNewPassword}
                                    onChange={(e) => {
                                        setConfirmNewPassword(e.target.value);
                                        setErrorMsg(prev => ({...prev, confirmNewPassword: ''}));
                                        setSuccessMsg('');
                                    }}
                                    required
                                />
                                {errorMsg.confirmNewPassword &&
                                  <small className="text-danger">{errorMsg.confirmNewPassword}</small>}
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                                {loading ? 'Loading...' : 'Update'}
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className="p-4">
                        <h3 className="text-center mb-4">Comenzi plasate</h3>
                        {orderLoading ? (
                            <h2>Loading...</h2>
                        ) : orderError ? (
                            <h3>{orderError}</h3>
                        ) : (
                            <>
                                {orders.map((order: any) => (
                                    <Card key={order._id} className="mb-4 shadow" style={{border: "none"}}>
                                        <Card.Body>
                                            <Card.Title>ID Comanda: {order._id}</Card.Title>
                                            <Button onClick={() => toggleOrder(order._id)}>
                                                {expandedOrders[order._id] ? 'Hide Details' : 'Show Details'}
                                            </Button>
                                            {!order.isPaid && order.paymentMethod === 'PayPal' && (
                                                <span>
                                                    <Button
                                                        className="mx-2"
                                                        onClick={() => handlePayNow(order)}
                                                    >
                                                        Plateste acum
                                                    </Button>
                                                    <i className="fa-solid fa-triangle-exclamation" style={{color: "red"}}/>
                                                </span>
                                            )}
                                            {expandedOrders[order._id] && (
                                                <Card.Text>
                                                    <strong>Nume: </strong>{order.user.name}<br/>
                                                    <strong>Address: </strong>{order.shippingAddress.address}<br/>
                                                    <strong>Pret total: </strong>{order.totalPrice} Lei<br/>
                                                    <strong>Metoda de plata: </strong>{order.paymentMethod}<br/>
                                                    <strong>Comanda platita: </strong>{order.isPaid ? 'Da' : 'Nu'}<br/>
                                                    <strong>Comanda
                                                        livrata: </strong>{order.isDelivered ? 'Da' : 'Nu'}<br/>
                                                    <strong>Plasata
                                                        la: </strong>{new Date(order.createdAt).toLocaleString()}<br/>
                                                </Card.Text>)}
                                        </Card.Body>
                                        {expandedOrders[order._id] && (
                                            <Card.Footer>
                                                <h6>Produse</h6>
                                                {order.items.map((item: any) => (
                                                    <div key={item._id}>
                                                        <strong>Nume: </strong>{item.name}<br/>
                                                        <strong>Cantitate: </strong>{item.qty}<br/>
                                                        <strong>Pret: </strong>{item.price}<br/>
                                                    </div>
                                                ))}


                                            </Card.Footer>)}
                                    </Card>
                                ))}

                                <Pagination>
                                    <Pagination.Prev onClick={() => handlePageChange(Math.max(1, page - 1))}/>
                                    <Pagination.Item>{page}</Pagination.Item>
                                    <Pagination.Next
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={!hasMoreOrders} // Disable the button if there are no more orders
                                    />
                                </Pagination>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

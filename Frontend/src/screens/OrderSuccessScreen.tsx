import React, {useEffect} from 'react';
import {Card, Button, ListGroup, Image, Alert, Spinner} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {useNavigate, useParams} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {payOrder, resetOrderAll, resetPayOrder, getOrder} from "../actions/orderActions";
import {PayPalButton} from "react-paypal-button-v2";


const StyledCard = styled(Card)`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  width: 80%;
  max-width: 600px;
`;

const StyledButton = styled(Button)`
  background-color: #3498db;
  border: none;
  padding: 10px 20px;
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    color: #ffffff;
  }
`;

const SummarySection = styled.section`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemInfoContainer = styled.div`
  flex: 2;
  padding-left: 20px;
`;

const ItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

interface Item {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
}

export const OrderSuccessScreen: React.FC<any> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = React.useState(false);
    const {orderId} = useParams<{ orderId: string }>();


    const orderPay = useSelector((state: any) => state.orderPay);
    const {loading: loadingPay, success: successPay} = orderPay;


    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AZ0WtPQoBPJFuf3AF8-d5OsyAZ9Th83HzypjNqXHeC4SifJW0K19xLi-zPKktlIs_IsBheDLzAt9p20R&currency=EUR';
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
        document.body.appendChild(script);
    }
    const [paypalSuccess, setPaypalSuccess] = React.useState(false);
    const {order, loading, error} = useSelector((state: any) => state.orderGet);


    useEffect(() => {
        if (order && order.paymentMethod === 'PayPal' && !order.isPaid) {
            if (successPay) {
                setPaypalSuccess(true)
                dispatch<any>(resetPayOrder());

            } else if (!paypalSuccess) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }

            if (paypalSuccess) {
                console.log('paypalSuccess')
                const timer = setTimeout(() => {
                    handleHomeClick();
                }, 2000);
                return () => clearTimeout(timer);
            }

            fetch("https://v6.exchangerate-api.com/v6/6646ad963c8e8df852d68a44/latest/RON")
                .then((response) => response.json())
                .then((data) => setConversionRate(data.conversion_rates['EUR']));

            setConvertedAmount(order.totalPrice * (conversionRate || 0.2));
        }

    }, [navigate, order, successPay, dispatch, paypalSuccess]);

    useEffect(() => {
        dispatch<any>(getOrder(orderId!));
    }, [dispatch, orderId]);

    const [conversionRate, setConversionRate] = React.useState(null);
    const [convertedAmount, setConvertedAmount] = React.useState(0);


    const successPaymentHandler = (paymentResult: any) => {
        dispatch<any>(payOrder(order._id, paymentResult));
    }

    const animationVariants = {
        hidden: {scale: 0},
        visible: {scale: 1},
    };

    const handleHomeClick = () => {
        dispatch<any>(resetOrderAll());
        navigate('/');
    };


    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                    <Spinner animation="border" role="status" className="spinner-lg">
                        <span className="sr-only">Se incarca...</span>
                    </Spinner>
                </div>
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={animationVariants}
                    transition={{type: "spring", stiffness: 260, damping: 20}}
                >
                    <StyledCard className="text-center">
                        <Card.Body>
                            <Card.Title>Comanda reușită</Card.Title>
                            <Card.Text>Comanda ta cu ID-ul: {orderId} a fost plasată cu succes.</Card.Text>
                            {order && order.paymentMethod === 'PayPal' && !order.isPaid && (
                                <span>
                                <Card.Text>Comanda ta va fi procesată și livrată odată ce plata a fost confirmată.</Card.Text>
                                <Card.Text>Aceasta va fi procesata si livrata odata ce plata a fost confirmata.</Card.Text>
                                <Card.Text>Apasa pe butonul de mai jos pentru a efectua plata pe platforma PayPal.</Card.Text>
                                </span>
                            )}

                            <SummarySection>
                                <h4>Rezumatul comenzii:</h4>
                                <ListGroup variant="flush">
                                    {order && order.items && order.items.map((item: Item) => (
                                        <ListGroup.Item key={item.product}>
                                            <ItemContainer>
                                                <ImageContainer>
                                                    <Image src={item.image} alt={item.name} fluid rounded
                                                           style={{width: '100px', height: '100px'}}/>
                                                </ImageContainer>
                                                <ItemInfoContainer>
                                                    {item.qty} x {item.name}
                                                </ItemInfoContainer>
                                            </ItemContainer>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <SummaryItem>
                                    <span>Adresa:</span>
                                    <span>{order && order.shippingAddress && order.shippingAddress.address}, {order && order.shippingAddress && order.shippingAddress.city}, {order && order.shippingAddress && order.shippingAddress.postalCode}, {order && order.shippingAddress && order.shippingAddress.country}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span>Metoda de plată:</span>
                                    <span>{order && order.paymentMethod}</span>
                                </SummaryItem>
                                <SummaryItem>
                                    <span>Preț total:</span>
                                    <span>{order && order.totalPrice} Lei</span>
                                </SummaryItem>
                            </SummarySection>
                            <hr/>
                            {order && order.paymentMethod === 'PayPal' && !order.isPaid &&
                              <Card.Text className="text-info">Suma totala de achitat va fi convertita in EURO la
                                cursul zilei.</Card.Text>}
                            {order && order.paymentMethod === 'PayPal' && order.isPaid && (
                                <Alert variant="success">Comanda a fost platită cu succes!</Alert>
                            )}
                            {!paypalSuccess && order && order.paymentMethod === 'PayPal' && !order.isPaid && (
                                <div>
                                    {!sdkReady ? (
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">PayPal se încarcă...</span>
                                        </Spinner>
                                    ) : (
                                        <PayPalButton
                                            amount={convertedAmount.toFixed(2)}
                                            currency="EUR"
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </div>
                            )}
                            {order && order.paymentMethod === 'PayPal' && loadingPay &&
                              <Alert variant="info">Se efectuează plata...</Alert>}
                            {order && order.paymentMethod === 'PayPal' && paypalSuccess &&
                              <Alert variant="success">Plata a fost efectuată cu succes!</Alert>}

                            <StyledButton className="mt-3 mb-1" variant="primary" onClick={handleHomeClick}>Mergi Acum
                                Acasă</StyledButton>
                        </Card.Body>
                    </StyledCard>
                </motion.div>
            )}
        </>
    );
}

import React, {useEffect} from 'react';
import {Card, Button, ListGroup, Image} from 'react-bootstrap';
import {motion} from 'framer-motion';
import {useNavigate, useParams} from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {resetOrderAll} from "../actions/orderActions";
import {clearCart} from "../actions/cartActions";

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
    const {orderId} = useParams<{ orderId: string }>();
    const orderDetails = useSelector((state: any) => state.orderCreate.order);


    useEffect(() => {
        if (orderDetails === undefined) {
            navigate('/');
        }
        const timer = setTimeout(() => {
            dispatch<any>(resetOrderAll());
            navigate('/');
        }, 30000);
        return () => clearTimeout(timer);
    }, [navigate, orderDetails]);

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
                        <Card.Text>Vei fi redirecționat către pagina principală în 30 de secunde...</Card.Text>

                        <SummarySection>
                            <h4>Rezumatul comenzii:</h4>
                            <ListGroup variant="flush">
                                {orderDetails && orderDetails.items && orderDetails.items.map((item: Item) => (
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
                                <span>{orderDetails && orderDetails.shippingAddress.address}, {orderDetails && orderDetails.shippingAddress.city}, {orderDetails && orderDetails.shippingAddress.postalCode}, {orderDetails && orderDetails.shippingAddress.country}</span>
                            </SummaryItem>
                            <SummaryItem>
                                <span>Metoda de plată:</span>
                                <span>{orderDetails && orderDetails.paymentMethod}</span>
                            </SummaryItem>
                            <SummaryItem>
                                <span>Preț total:</span>
                                <span>{orderDetails && orderDetails.totalPrice} Lei</span>
                            </SummaryItem>
                        </SummarySection>

                        <StyledButton className="mt-3 mb-1" variant="primary" onClick={handleHomeClick}>Mergi Acum Acasă</StyledButton>
                    </Card.Body>
                </StyledCard>
            </motion.div>
        </>
    );
}

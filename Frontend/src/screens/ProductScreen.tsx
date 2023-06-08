import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card, Container} from "react-bootstrap";
import {Rating} from '../components/rating';
import {Price} from '../components/price';
import {Breadcrumb} from "react-bootstrap"
import {RecommendedPercentage} from "../components/recommendedPercentage";

import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";
import {addToCart} from "../actions/cartActions";

import NotificationModal from "../components/notificationModal";
import {StockExceededModal} from "../components/stockExceededModal";

import {useNavigate} from 'react-router-dom';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

export const ProductScreen = () => {
    const {_id} = useParams<{ _id: string }>();
    const [quantity, setQuantity] = useState<string>("1");
    const navigate = useNavigate();

    if (_id === undefined) {
        return <div>Produsul nu a fost gasit</div>
    }

    const dispatch = useDispatch();

    const productDetails = useSelector((state: any) => state.productDetails);
    const reviewList = useSelector((state: any) => state.productReviewsList);
    const {reviews} = reviewList;

    const cart = useSelector((state: any) => state.cart);
    const {cartItems} = cart;

    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch<any>(listProductDetails(_id))
    }, [dispatch, _id]);

    const [showModal, setShowModal] = useState(false);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleNavigate = () => {
        handleClose();
        navigate(`/cart`);
    };

    const [showStockExceededModal, setShowStockExceededModal] = useState(false);

    const closeStockExceededModal = () => setShowStockExceededModal(false);

    const addToCartHandler = () => {
        console.log(cartItems)
        const currentCartItem = cartItems.find((item: any) => item.product == _id);
        console.log(currentCartItem)
        const currentProductQuantity = currentCartItem ? currentCartItem.qty : 0;
        console.log(currentProductQuantity)
        console.log(parseInt(quantity))
        if (currentProductQuantity + parseInt(quantity) > product?.countInStock) {
            setShowStockExceededModal(true);
        } else {
            dispatch<any>(addToCart(_id, parseInt(quantity)));
            handleShow();
        }
    };

    const handleChange = (e: any) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value === "" ? "" : parseInt(value);
        if (value < 1 && value !== "") {
            setQuantity("1");
            return;
        } else if (value > product?.countInStock) {
            setQuantity(product?.countInStock.toString());
            return;
        }
        setQuantity(value);
    };

    return (
        <Container>
            {loading || loading === undefined ? (
                <div className="text-center my-5">
                    <i className="fa-solid fa-spinner fa-spin" style={{fontSize: "5rem", color: "#6cb95c"}}/>
                </div>
            ) : error ? (
                <div className="text-center my-5">
                    <i className="fa-solid fa-exclamation-circle" style={{fontSize: "5rem", color: "red"}}/>
                    <h2>Eroare la incarcarea produsului</h2>
                    <p className="my-3">{error}</p>
                </div>
            ) : (
                <div>
                    <StockExceededModal show={showStockExceededModal} handleClose={closeStockExceededModal}
                                        availableItems={product?.countInStock - cartItems.find((item: any) => item.product == _id)?.qty > 0 ?
                                            product?.countInStock - cartItems.find((item: any) => item.product == _id)?.qty : 0}/>
                    <NotificationModal show={showModal} handleClose={handleClose} handleNavigate={handleNavigate}/>
                    <Breadcrumb style={{fontSize: '0.9em'}} className="my-3">
                        <Breadcrumb.Item href="/" className="text-decoration-none text-secondary">
                            Acasa
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active className="text-dark">
                            <strong>{product?.name}</strong>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Row>
                            <Col md={9} className="my-3" fluid={+true}>
                                <h4>{product?.name}</h4>
                            </Col>
                        </Row>
                        <Col md={4}>
                            <Image src={product?.image} alt={product?.name} fluid/>
                        </Col>
                        <Col md={5}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Rating rating={product?.rating} numReviews={product.numReviews}
                                            showNumReviews={true}/>
                                    <RecommendedPercentage rating={product?.rating}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div>
                                        <i className="fas fa-truck" style={{color: "#c4c4c4"}}/> Livrare rapida prin
                                        curier in
                                        intreaga tara
                                    </div>
                                    <div className="ms-4 my-3">
                                        <i className="fas fa-check" style={{color: "green"}}/> Comanda de minim 300 de
                                        lei si ai
                                        transport <strong>GRATUIT</strong>
                                    </div>
                                    <div className="ms-4 my-3">
                                        <i className="fas fa-percent" style={{color: 'green'}}/> Comanda de minim 1000
                                        de lei si
                                        ai de asemenea <strong>10%</strong> reducere
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div>
                                        <i className="fa-solid fa-box-archive" style={{color: "#c4c4c4"}}/> Ridicare
                                        personala
                                        din depozit
                                    </div>
                                    <div className="ms-4 my-3">
                                        <i className="fas fa-check" style={{color: "green"}}/> Botosani, Vorona, Str.
                                        Principala, Nr. 1
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card style={{
                                borderWidth: "0.1px",
                                borderColor: "#e8e8e8",
                                boxShadow: "0px 0px 4px 0px #e8e8e8",
                            }}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <div className="text-center">
                                        <span>
                                            <Price price={Number(product?.price)} textSize={1.0}/>
                                        </span>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="text-center">
                                            {product?.countInStock > 0 ? (
                                                <span style={{color: "#6cb95c"}}>
                                        <i className="fa-solid fa-boxes-stacked"/> IN STOC
                                      </span>
                                            ) : (
                                                <span style={{color: "red"}}>
                                        <i className="fa-solid fa-boxes-stacked"/> INDISPONIBIL
                                      </span>
                                            )}
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-center">
                                        <div className="d-flex justify-content-center align-items-stretch">
                                            <input
                                                type="text"
                                                className="form-control my-auto me-2 text-center"
                                                name="quantity"
                                                value={quantity}
                                                onChange={handleChange}
                                                id="quantity"
                                                style={{
                                                    width: "60px",
                                                    height: '38px'
                                                }}  // Adjust this height to match your button's height
                                            />
                                            <Button
                                                className="btn-success flex-fill m-auto"
                                                type="button"
                                                disabled={product?.countInStock === 0}
                                                onClick={() => addToCartHandler()}
                                            >
                                                <i className="fas fa-cart-plus"/>

                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9} className="my-5">
                            <h4>Descriere</h4>
                            <p>{product?.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9} className="my-5">
                            <h4 className="my-3">Recenzii</h4>
                            <ReviewList productId={_id}/>
                            <hr/>
                            <h4>Adauga o recenzie</h4>
                            <ReviewForm productId={_id}/>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
}
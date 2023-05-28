import React, {useState, useEffect} from 'react';
import {Product} from "../components/product";
import {Row, Col, Alert, Container, Spinner} from "react-bootstrap";
import {listProducts} from '../actions/productActions'
import {ProductProp} from "../utils/props";
import {useDispatch, useSelector} from 'react-redux'
import styled from "styled-components";

const StyledCol = styled(Col)`
    margin-bottom: 2rem;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem 0;
`;

export const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector((state: any) => state.productList)

    const {loading, error, products} = productList

    useEffect(() => {
            dispatch<any>(listProducts())
        }, [dispatch]
    )

    return (
        <Container>
            <h1>Produse noi</h1>
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="success" size="sm"/>
                </div>
            ) : error ? (
                <ErrorContainer>
                    <i className="fa-solid fa-exclamation-circle" style={{fontSize: "5rem", color: "red"}}/>
                    <h2>Error while loading products</h2>
                    <Alert variant='danger' className="my-3">
                        {error}
                    </Alert>
                </ErrorContainer>
            ) : (
                <Row>
                    {products.map((product: ProductProp) => (
                        <StyledCol key={product._id} sm={12} md={6} lg={4} xl={3} xxl={3}>
                            <Product _id={product._id} name={product.name} image={product.image} price={product.price}
                                     rating={product.rating} numReviews={product.numReviews}
                                     countInStock={product.countInStock} description={product.description}/>
                        </StyledCol>
                    ))}
                </Row>
            )}
        </Container>
    )
}

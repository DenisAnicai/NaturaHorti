// ReviewList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Card, Spinner } from 'react-bootstrap';
import {Rating} from "./rating";
import { listProductReviews } from '../actions/productActions';

const ReviewList = ({ productId }: { productId: string }) => {
    const dispatch = useDispatch();

    const productReviews = useSelector((state: any) => state.productReviewsList);
    const { loading, error, reviews } = productReviews;

    useEffect(() => {
        dispatch<any>(listProductReviews(productId));
    }, [dispatch, productId]);

    if (loading || !reviews || loading === undefined) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Se incarca...</span>
            </Spinner>
        )
    } else if (error) {
        return <div className="alert alert-danger">{error}</div>
    } else {
        return (
            <ListGroup variant="flush">
                {reviews.map((review: any) => (
                    <ListGroup.Item key={review._id}>
                        <Card>
                            <Card.Header as="h5" className="d-flex justify-content-between">
                                <div>
                                    <strong>{review.name}</strong>
                                    <Rating rating={review.rating} />
                                </div>
                                <p className="text-secondary">{review.createdAt.substring(0, 10)}</p>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{review.comment}</Card.Text>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        );
    }
};

export default ReviewList;

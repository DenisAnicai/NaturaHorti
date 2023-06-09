import React, { useState } from 'react';
import { Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProductReview, listProductReviews, resetCreateReview } from '../actions/productActions';
import { useEffect } from 'react';

const ReviewForm = ({ productId }: { productId: string }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productReviewCreate = useSelector((state: any) => state.productReviewCreate);
    const { error, loading } = productReviewCreate;


    useEffect(() => {
        dispatch<any>(resetCreateReview());
    }, [dispatch]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Selectati o evaluare');
            return;
        }
        try {
            await dispatch<any>(createProductReview(productId, { 'rating': rating, 'comment': comment }));
            dispatch<any>(listProductReviews(productId));
        } catch (error) {

        }
    };

    return (
        <Card className='my-4'>
            <Card.Header as="h5">Ce părere aveți despre acest produs?</Card.Header>
            <Card.Body>
                {loading &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Se incarca...</span>
                    </Spinner>
                }
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                        <Form.Label>Evaluare</Form.Label>
                        <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            <option value=''>Selectați...</option>
                            <option value='1'>1 - Slab</option>
                            <option value='2'>2 - Acceptabil</option>
                            <option value='3'>3 - Bun</option>
                            <option value='4'>4 - Foarte bun</option>
                            <option value='5'>5 - Excelent</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comment'>
                        <Form.Label>Comentariu</Form.Label>
                        <Form.Control className="mb-3"
                            as='textarea'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Trimite
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ReviewForm;

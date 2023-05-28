import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

// functional component for the footer of the app

export const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; NaturaHorti</Col>
                </Row>
            </Container>
        </footer>
    );
};
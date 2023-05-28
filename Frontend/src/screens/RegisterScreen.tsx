import React, { useState } from 'react';
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";

export const RegisterScreen: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    // TODO: Implement your register logic here. Use the setEmail and setPassword states.

    setLoading(false);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="p-4">
            <h3 className="text-center mb-4">Register</h3>
            {loading ? (
              <div className="text-center">
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "2rem", color: "#6cb95c" }} />
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <Form onSubmit={handleRegister}>
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

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

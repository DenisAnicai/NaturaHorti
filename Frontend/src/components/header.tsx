import React, {useEffect} from 'react';
import {Badge, Container, Nav, Navbar,} from "react-bootstrap";

// @ts-ignore
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

export const Header = () => {
  const cart = useSelector((state: any) => state.cart);
  const {cartItems} = cart;
  const cartItemsCount = cartItems.length;

  const userLogin = useSelector((state: any) => state.userLogin);
  const {userInfo} = userLogin;

  return (
    <header>
        <Navbar style={{backgroundColor: 'rgb(61,140,64)'}} variant="dark" expand="lg" collapseOnSelect className="">
            <Container>
                <Nav.Link as={Link} to="/">
                    <Navbar.Brand>NaturaHorti</Navbar.Brand>
                </Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {userInfo ? (
                            <>
                                <Nav.Link as={Link} to="/profile">
                                    <i className="fas fa-user"></i> {userInfo.name}
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">
                                    <i className="fas fa-sign-out-alt"></i> Deconectare
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <i className="fas fa-user"></i> Autentificare
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <i className="fas fa-user-plus"></i> Inregistrare
                                </Nav.Link>
                            </>
                        )}
                        <Nav.Link as={Link} to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                            Cos
                            {cartItemsCount > 0 && (
                                <Badge pill style={{marginLeft: '5px', backgroundColor: 'rgb(204,0,0)', fontSize: '0.7em'}}>
                                    {cartItemsCount}
                                </Badge>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}


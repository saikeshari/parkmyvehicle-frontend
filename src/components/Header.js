import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

function Header() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Book</Nav.Link>
                <Nav.Link href="#pricing">Features</Nav.Link>
                <Nav.Link href="#pricing">Profile</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default Header

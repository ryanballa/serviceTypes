import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="App-header">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Service Requests</Navbar.Brand>
                <Nav>
                    <Nav.Item>
                        <Link to="/service-requests/add">Add Service Request</Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </header>
    );
};

export default Header;
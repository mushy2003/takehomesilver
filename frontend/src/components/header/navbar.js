import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function NavigationBar() {

    const pages = ['Landing Page', 'Prices Page']
    const links = ['/', '/prices']

    const location = useLocation();


    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <Navbar bg="light" data-bs-theme="light" expand="lg" sticky='top' collapseOnSelect style={{ paddingTop: 20, paddingBottom: 20 }}>
            <Container fluid>
                <Navbar.Toggle aria-controls='navbar-nav' />
                <Navbar.Collapse id='navbar-nav'>
                    <Nav>
                        {pages.map((page, index) => {
                            return (
                                <Nav.Link active={isActive(links[index])} href={links[index]} style={{ marginLeft: 20 }}>
                                    {page}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
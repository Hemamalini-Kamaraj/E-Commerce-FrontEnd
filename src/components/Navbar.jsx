import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col'
import {  PersonCircle } from "react-bootstrap-icons";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';



function BasicExample({ selectedCategory, setSelectedCategory }) {

    const [data, setData] = useState([]); 

    const cart = useSelector((state) => state.cart);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((json) => {
                setData(json);
            });
    }, []);

    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));

    const handleLogout = (e) => {
    e.preventDefault();
    window.sessionStorage.clear();
    navigate("/");
    };

    const handleSelectCategory =  (category) => {

        setSelectedCategory(category);
        navigate(`/product-list/${category}`)
    }

    let cartKeys = Object.entries(cart)
    let totalItems = cartKeys.reduce((accumulator, object) => {
        return accumulator + object[1].quantity;
    }, 0);


    let isLoading = false;
    let loadError = null;

    if (isLoading) {
        return <div>Data is Loading ...</div>;
    } else if (loadError) {
        return (
            <div>Oops there seems to be an error. Please try again later ...</div>
        );
    } else {
        return (
            <Navbar expand="lg" className="navbar" style={{backgroundColor:"#f5b48e"}}>
                <Container fluid>
                    <Col xs={4} className='ml-5'>
                        <img src='https://e7.pngegg.com/pngimages/297/598/png-clipart-logo-brand-poster-font-hema-text-service.png' style={{ width: "50px" }}></img>
                        <p className='fs-6 fw-bold'>Shop smarter.Not harder</p>
                    </Col>
    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" className='fw-bold'>Home</Nav.Link>
                        </Nav>
                        <Nav className='me-auto fw-bold'>
                            <NavDropdown title='Products' id="basic-nav-dropdown">
                                    {
                                        data.map((category,index) => (
                                            <NavDropdown.Item key={category} onClick={() => handleSelectCategory(category)}>
                                                <Nav.Link >
                                                    {category}
                                                </Nav.Link>
                                            </NavDropdown.Item>
                                        ))
                                    }
                            </NavDropdown>
                        </Nav>
                        <Nav className='fw-bold'>
                            <div className='pt-2'>
                                <Link to='/cart'><FontAwesomeIcon className='fw-bold text-dark' icon={faShoppingCart} /></Link>
                                <span style={{ marginLeft: 5 }} className="cart-length">
                                    {totalItems}
                                </span> 
                            </div>
                        </Nav>
                        <Nav className='fw-bold mx-5'>
                            <NavDropdown title={<PersonCircle size={20} className='fw-bold' id="basic-nav-dropdown"/>} style={{marginBottom:"-5px"}}>
                                        {
                                            jsonData === null ? 
                                            <>
                                                <NavDropdown.Item>
                                                    <Link to="/signup" className='text-decoration-none text-dark'>Sign Up</Link>
                                                </NavDropdown.Item>
                                            </> 
                                            :
                                            <>
                                                <NavDropdown.Item>
                                                    <Link to="/user-profile" className='text-decoration-none text-dark'>UserProfile</Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <Link to="/logout" className='text-decoration-none text-dark' onClick={handleLogout}>Logout</Link>
                                                </NavDropdown.Item>
                                            </>
                                        }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
};
export default BasicExample;
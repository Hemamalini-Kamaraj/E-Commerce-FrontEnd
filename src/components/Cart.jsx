import React, {  useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCartRedux, removeFromCartRedux } from "../redux/reducers/cartReducer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import userUrl from '../api/api';


const Cart = ({ selectedCategory, setSelectedCategory }) => {

    const [mobileNo, setMobileNo] = useState("");
    const [altNo, setAltNo] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("")

    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    
    if (jsonData) {
        var token = jsonData["token"];
        var userName = jsonData["name"];
    }

    const config = {
        headers : { authorization : `bearer ${token}`}
    }

    const fetchUserData = async () => {

        const response = await userUrl.get('/users/profile', config)
        setMobileNo(response.data.mobileNo);
        setAltNo(response.data.altNo);
        setRecipientName(response.data.recipientName);
        setAddressLine1(response.data.addressLine1);
        setCity(response.data.city);
        setState(response.data.state);
        setCountry(response.data.country);
        setZipCode(response.data.zipCode);
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);

    let productAmount = [];

    Object.entries(cartItems).map(entry => (
        productAmount.push(entry[1].quantity * entry[1].price)
    ))

    let sumTotalItems = productAmount.reduce((accumulator, currentValue) => {
         return accumulator + currentValue
    }, 0) 

    const totalItemLength = Object.entries(cartItems).length;
    
    const shipping = (sumTotalItems <= 250) ? 0 : 20;
    
    const handleCheckout = () => {
        let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (jsonData) {
            alert("Order confirmed.We will deliver your order within 5 days");
            window.location.reload();
            // navigate("/");
        } else {
            alert("Kindly login to confirm your order")
            navigate("/signin")
        }
    }

    return (
    <>
        <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <div className="Cart">
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-5">
                    <div className="col-md-8">
                    <div className="card">
                        <h5 className="card-header text-center" style={{backgroundColor:"#f5b48e"}}>Cart Details</h5>
                        <div className="card-body">
                        <ul
                            className="list-group list-group-flush bg-light"
                            style={{ minHeight: "140px" }}
                        >
                            {Object.entries(cartItems).map((cartItem) => {
                            return (
                                <CartItem
                                key={cartItem[1].id}
                                cartItem={cartItem[1]}
                                />
                            );
                            })}
                        </ul>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 fw-bold">
                        <div className="row justify-content-center">
                            <div className="card" style={{backgroundColor:"#f5b48e"}}>
                            <h5 className="card-header text-center">Cart Info</h5>
                                <div className="card-body">
                                    <p className="d-flex justify-content-between">
                                        <span>Total Items</span>
                                        <span>{totalItemLength}</span>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <span>Subtotal</span>
                                        <span>${sumTotalItems}</span>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <span>Shipping</span>
                                        <span>${shipping}</span>
                                    </p>
                                    <p className="d-flex justify-content-between">
                                        <span>Total(Incl. taxes)</span>
                                        <span>
                                            ${totalItemLength === 0 ? "0" : sumTotalItems + shipping }
                                        </span>
                                    </p>
                                </div>
                                {
                                totalItemLength === 0 ? "" : 
                                <div className="card-footer text-center">
                                    <button className="btn fs-5 btn-dark fw-bold" onClick={handleCheckout}>Proceed to Checkout</button>
                                </div>     
                                }
                                </div>
                            </div>
                        </div>
                        </div>
                            <div className="row gx-5 mt-5">
                                <div className="col-md-8">
                                    <div className="card">
                                        <h5 className="card-header text-center" style={{ backgroundColor: "#f5b48e" }}>Shipping Address</h5>
                                        <div className="card-body row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="Name">Name*</label>
                                                    <input type="text" className="form-control" id="Name" placeholder="Enter Name" value={recipientName} onChange={(e)=> setRecipientName(e.target.value)}/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label htmlFor="Contact">Mobile Number*</label>
                                                    <input type="text" className="form-control" id="Name" placeholder="Enter Mobile Number" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label htmlFor="AltNum">Alternate Number</label>
                                                    <input type="text" className="form-control" id="AltNum" placeholder="Enter Alternate Number" value={altNo} onChange={(e)=>setAltNo(e.target.value)}/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label htmlFor="DNo">Address Line 1*</label>
                                                    <input type="text" className="form-control" id="DNo" placeholder="Enter Door Number" value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group mt-2">
                                                    <label htmlFor="city">City*</label>
                                                    <input type="text" className="form-control" id="city" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label htmlFor="state">State*</label>
                                                    <input type="text" className="form-control" id="state" placeholder="Enter State" value={state} onChange={(e)=>setState(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="Country">Country*</label>
                                                    <input type="text" className="form-control" id="Country" placeholder="Enter Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label htmlFor="zip">Zip Code*</label>
                                                    <input type="text" className="form-control" id="zip" placeholder="Zip Code" value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </section>
        </div>
        <Footer />
    </>
  );
};

function CartItem({ cartItem }) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCartRedux(cartItem));
    };
    
    const handleAddToCart = () => {
      dispatch(addToCartRedux(cartItem));
    };

  return (
    <li className="list-group-item gy-5">
        <div className="row d-flex">
            <div className="col-sm-3">
                <img src={cartItem.image} style={{ width: "100px", height:"150px" }} alt="" />
            </div>
            <div className="col-sm-9">
                <h5 className="card-text">{cartItem.title}</h5>
                <h6 className="fw-bold">$ {cartItem.price}</h6>
                <div className="add-to-cart-container">
                    <div className="addCart" onClick={handleRemoveFromCart}>
                    -
                    </div>
                    <div className="addCart">{cartItem.quantity}</div>
                    <div className="addCart" onClick={handleAddToCart}>
                    +
                    </div>
                    <div>
                        <p>{cartItem.totalPrice}</p>  
                    </div>
                </div>
                <div>
                      
                </div>
            </div>
        </div>
    </li>
  );
}

export default Cart;
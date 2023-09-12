import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Navbar from "./Navbar"
import { Pencil } from "react-bootstrap-icons"
import userUrl from '../api/api'

function UserProfile({ selectedCategory, setSelectedCategory }) {
    
    const [toggle, setToggle] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [altNo, setAltNo] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("")

    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const token = jsonData["token"];

    const config = {
        headers : { authorization : `bearer ${token}`}
    }
    
    const fetchUserData = async () => {

        const response = await userUrl.get('/users/profile', config)
        setName(response.data.name);
        setEmail(response.data.email);
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
    
    const handleUpdateProfile = async () => {
        // e.preventDefault();

        const profileData = {
            name: name,
            mobileNo: mobileNo,
            altNo: altNo,
            recipientName: recipientName,
            addressLine1: addressLine1,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode
        }

        await userUrl.put('/users/profile', profileData, config);
        alert("User details updated");
        setToggle(false);

    }

    return (

        <div className='d-flex flex-column justify-content-between min-vh-100'>
            <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div className="container">
            <h1 className='text-center text-primary mt-3'>User Profile</h1>
            <div className="row gutters mt-3 justify-content-center">
                
            {
                toggle === true ? <div className="card rounded-5" style={{width:"50rem"}}>
                <div className="card-body">
                    <div className="account-settings">
                        <div className="user-profile">
                            <div className="user-avatar">
                                <img src="https://www.zenclass.in/static/media/user.8d49e377.png" alt="Maxwell Admin"/>
                            </div>
                            <h5 className="user-name">{name} <button className='border-0 bg-white' onClick={() => setToggle(!toggle)}><Pencil className='fs-6'/> </button></h5>
                            <h6 className="user-email">{email}</h6>
                        </div>
                        <div className="about">
                            <h5>Billing Address</h5>
                            <span className='fw-bold fs-5'>{recipientName}</span><br/>
                            <span>{addressLine1}, {city}</span><br/>
                            <span className='fs-6'>{state}, {country}-{zipCode}</span>   
                        </div>
                    </div>
                </div>
                        </div> : 
                            <>
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mb-5">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src="https://www.zenclass.in/static/media/user.8d49e377.png" alt="Maxwell Admin"/>
                                        </div>
                                        <h5 className="user-name"> {name} <button className='border-0 bg-white' onClick={() => setToggle(!toggle)}>{" "} <Pencil className='fs-6'/> </button></h5>
                                        <h6 className="user-email">{email}</h6>
                                    </div>
                                    <div className="about">
                                        <h5>Billing Address</h5>
                                        <span className='fw-bold fs-5'>{recipientName}</span><br/>
                                        <span>{addressLine1}, {city}</span><br/>
                                        <span className='fs-6'>{state}, {country}-{zipCode}</span>   
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
            
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mb-5">
                <div className="card">
                    <div className="card-body">
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="mb-2 text-primary">Personal Details</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" className="form-control" id="fullName" placeholder="Enter full name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="phone">Mobile Number</label>
                                    <input type="text" className="form-control" id="phone" placeholder="Enter mobile number" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="AltNum">Alternate Number</label>
                                    <input type="text" className="form-control" id="AltNum" placeholder="Alternate Number" value={altNo} onChange={(e)=>setAltNo(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters mt-4">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="mt-3 mb-2 text-primary">Billing Address</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="AddName">Recipient Name</label>
                                    <input type="name" className="form-control" id="AddName" placeholder="Enter Name" value={recipientName} onChange={(e)=>setRecipientName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label htmlFor="Street">Address Line 1</label>
                                    <input type="name" className="form-control" id="Street" placeholder="Enter Street" value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="ciTy">City</label>
                                    <input type="name" className="form-control" id="ciTy" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="sTate">State</label>
                                    <input type="text" className="form-control" id="sTate" placeholder="Enter State" value={state} onChange={(e)=>setState(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="cOuntry">Country</label>
                                    <input type="text" className="form-control" id="cOuntry" placeholder="Enter Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2">
                                <div className="form-group">
                                    <label htmlFor="zIp">Zip Code</label>
                                    <input type="text" className="form-control" id="zIp" placeholder="Zip Code" value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters mt-3">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-right">
                                    {/* <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button>&nbsp; */}
                                    <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={handleUpdateProfile}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                            </>
            }
                    
                    
            
            </div>
            </div>
         <Footer />
        </div>
  )
}

export default UserProfile
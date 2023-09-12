import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userUrl from "../api/api";

function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [altNo, setAltNo] = useState("");

  const [recipientName, setRecipientName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("")
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userDetails = {
      name,
      email,
      password,
      mobileNo,
      altNo,
      recipientName,
      addressLine1,
      city,
      state,
      country,
      zipCode
    };

    let users = await userUrl.get("/users");
    users = users.data;
    users = users.find((user) => user.email === userDetails.email);
    if (!users) {
      try {
        await userUrl.post("/users/signup", userDetails);
        alert("Account registered successfully.Kindly Verify your account");
      } catch (error) {
        console.error("Error Signing Up", error);
      }
      setName("");
      setEmail("");
      setPassword("");
      setMobileNo("");
      setAltNo("");
      setRecipientName("");
      setAddressLine1(""),
      setCity("");
      setState("");
      setCountry("");
      setZipCode("");
      navigate("/signin");
    } else {
      alert("User Email already exists");
    }
  };

  return (
    <form onSubmit={handleSignUp} className="">
      <div className="heading">
          <h1 className="text-center fw-bold">
            <i className="fas fa-link fa-spin" aria-hidden="true"></i>&nbsp; E-Commerce App
          </h1>
        </div>
      <div className="d-flex justify-content-center min-vh-100 register mb-5">
        <div className="card signup">
          <div className="card-header">
            <h3 className="text-center">Sign Up</h3>
          </div>
          <div className="card-body">
            <label className="labels">Email</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <label className="labels">Name</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <label className="labels">Password</label>
            <div className="input-group form-group">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <label className="labels">Mobile No</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
              />
            </div>
            <label className="labels">Alternate Number</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={altNo}
                onChange={(e) => setAltNo(e.target.value)}
              />
            </div>
            <label className="labels">Recipient Name</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </div>
            <label className="labels">AddressLine1</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <label className="labels">City</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <label className="labels">State</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <label className="labels">Country</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <label className="labels">ZipCode</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <br />
            <br />
            <div className="form-group text-center">
              <input type="submit" value="Sign Up" className="btn" />
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Already Registered?<Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
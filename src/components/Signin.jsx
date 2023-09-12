import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userUrl from "../api/api";

function Sigin() {
    
    // const [loggedInUser, setLoggedInUser] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
    e.preventDefault();

    const userDetails = {
      email,
      password,
    };

    try {
      const response = await userUrl.post("/users/signin", userDetails);

      const user = response.data;
      window.sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      setEmail("");
      setPassword("");
      navigate("/cart");
    } catch (error) {
      alert(`Check your email and password ${error} `);
    }
    };
    
  return (
    <>
      <form onSubmit={handleSignIn}>
        <div className="heading mt-2">
          <h1 className="text-center fw-bold">
            <i className="fas fa-link fa-spin" aria-hidden="true"></i>&nbsp; E-Commerce App
          </h1>
        </div>
        <div className="d-flex justify-content-center h-100 register">
          <div className="card signin">
            <div className="card-header">
              <h3 className="text-center">Sign In</h3>
            </div>
            <div className="card-body">
              <label className="labels">Email</label>
              <div className="input-group form-group">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <label className="labels">Password</label>
              <div className="input-group form-group">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group text-center">
                <input
                  type="submit"
                  value="Login"
                  className="btn login_btn btn-block"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/signup">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center links">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <br />
      <div className="container justify-content-center text-white d-flex">
        <div className="card">
          <div className="card-body text-center">
            <p className="fw-bold">Sample Credentials</p>
            <p>You can create your own account too by registering here!</p>
            <p>Credentials : hemamalini.ahkm@gmail.com - hema</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sigin;
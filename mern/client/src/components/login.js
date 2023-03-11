import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false) //true = error, false = no error.
  const error = "Email or Password not matched"
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  // const handleValidation = (event) => {
  //   let formIsValid = true;

  //   if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
  //     formIsValid = false;
  //     setemailError("Email Not Valid");
  //     return false;
  //   } else {
  //     setemailError("");
  //     formIsValid = true;
  //   }

  //   if (!password.match(/^[a-zA-Z]{8,22}$/)) {
  //     formIsValid = false;
  //     setpasswordError(
  //       "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
  //     );
  //     return false;
  //   } else {
  //     setpasswordError("");
  //     formIsValid = true;
  //   }

  //   return formIsValid;
  // };

  const loginSubmit = (e) => {
    e.preventDefault();
    // handleValidation();
    logMe();
    
  };

  const logMe = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/login", requestOptions)
      .then(response => response.text())
      .then(result => {
        // isConnected(result)
          localStorage.setItem("isLoggedIn", result);
        if(result === "true"){
          navigate("/");
        } else {
          setIsError(true)
        }

        
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>
              {isError ? (
                <p style={{color: "red"}}>{error}</p>
              ) : (
                <>
                
                </>
              )}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          {/* Source: <a href="https://askavy.com/react-form/">React Form</a> */}
        </div>
      </div>
    </div>
  );
}
export default Login;
// login page test
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// new import
import Alert from "react-bootstrap/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false); //true = error, false = no error.
  const error = "Email or Password not matched";
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);

  const loginSubmit = (e) => {
    e.preventDefault();
    // handleValidation();
    logMe();
  };

  const logMe = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5000/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // isConnected(result)
        localStorage.setItem("isLoggedIn", result);
        if (result === "true") {
          toast.success("Connected", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => (window.location = "/dashboard"), 2000);
        } else {
          setIsError(true);
          setTimeout(() => setIsError(false), 5000);
          navigate("/dashboard");
        }
      })
      .catch((error) => console.log("error", error));
  };

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

              {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)}>
                  <Alert.Heading>{error}</Alert.Heading>
                </Alert>
              )}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>              
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                /> 
              </form>
            </div>
            {/* Source: <a href="https://askavy.com/react-form/">React Form</a> */}
          </div>
          </div>
          </div>
);
}

export default Login;
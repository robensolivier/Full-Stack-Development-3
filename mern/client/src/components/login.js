import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

// new import
import Alert  from "react-bootstrap/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false) //true = error, false = no error.
  const error = "Email or Password not matched"
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);

  // useEffect(() => {
  //   if (error) {
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //       setIsError('');
  //     }, 5000);
  //   }
  // }, [error]);


  // const logMe = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var raw = JSON.stringify({
  //     "email": email,
  //     "password": password
  //   });
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   }
  // };


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
          navigate("/dashboard")};
        //   toast.success('Connected', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        // setTimeout(() => window.location = "/", 3000);
        

        // } else {
        //   setIsError(true)
        //   setTimeout(() => setIsError(false), 5000);
        // }

        
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

              {showAlert &&
                  <Alert variant="danger" onClose={() => setShowAlert(false)}>
                  <Alert.Heading>{error}</Alert.Heading>
                  </Alert>
              }
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
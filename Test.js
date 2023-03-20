import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Alert  from "react-bootstrap/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [showAlert, setShowAlert] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const isLoggedIn = localStorage.isLoggedIn;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false) //true = error, false = no error.
  const [isLogin, setIsLogin] = useState(false) //true = error, false = no error.
  const error = "Connexion Fail"
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setIsError('');
      }, 5000);
    }
  }, [error]);
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
    toast.success(':unicorn_face: Connected', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    setTimeout(() => window.location = "/", 7000);
} else {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
}
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={logMe}>
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



// liste deroulante

<select>
value={selectedOption}
    onChange={(e) => setSelectedOption(e.target.value)}
  
    <option value="all">All Transactions</option>
    <option value="recent">Recent Transactions (last 7 days)</option>
</select>

// error login screen with css bootstraps


// //               {isError ? (
//   <p style={{color: "red"}}>{error}</p>
//   ) : (
//     <>
    
//     </>
//   )}


// .aggregate([
//     {
//       $lookup: {
//           from: "record",
//           localfild
//       }
//     }
//   ])

//   const ObjectId = require("mongodb").ObjectId;
// transactionRoutes.route("/transactions").get(function (req, res) {
//     let db_connect = dbo.getDb("employees");
//     db_connect
//       .collection("transactions")
//       .aggregate([
//         {
//           $lookup: {
//               from: "record",
//               localField: "_id",
//               foreignField:"_id",
//               as: "agent_data",
//           },
//         },
//         {
//             $project: {
//               _id: 0,
//               fullName: {
//                   $concat: [
//                     { $arryElement: ["agent_data.first_name", 0] },
//                     " ",
//                     { $arrayElmAt: ["$agent_data.last_name", 0] },
//                   ],
//               },
//               totalAmount: 1,
//             },
//           },
//         ])
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
//   });

// comprer avec transaction

const Record = (props) => (
  <tr>
    <td>{props.record.Agent_full_name}</td>
    <td>{props.record.Date}</td>
    <td>{props.record.Amount}</td>
  </tr>
);
export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/transactions`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
  }, []);
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/transactions/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el.Transaction !== id);
    setRecords(newRecords);
  }
  function recordList() {
    if (selectedOption === "all") {
      return records.map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record.Transaction)}
            key={record.Transaction}
          />
        );
      });
    } else if (selectedOption === "recent") {
      // filter records to show only recent ones
      const recentRecords = records.filter((record) => {
        const currentDate = new Date();
        const recordDate = new Date(record.Date);
        const daysDiff = (currentDate - recordDate) / (1000 * 60 * 60 * 24);
        return daysDiff <= 7; // show only records from the last 7 days
      });
      return recentRecords.map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record.Transaction)}
            key={record.Transaction}
          />
        );
      });
    }
  }
  return (
    <div>
      <h3>Transaction List</h3>
      <div>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="recent">Recent Transactions (last 7 days)</option>
        </select>
      </div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Agent</th>
            <th>Amount</th>
<th>Action</th>
</tr>
</thead>
<tbody>{recordList()}</tbody>
</table>
</div>
);
}



<select
onChange={(e) => {
    const c = agents.find((x) => x.id === e.target.value);
}}
>
{agents
  ? agents.map((crypto) => {
      return(
         <option key={agents.id} value={agents.id}>
          {agents.name}
         </option>
      );
  })
    :null}

</select>


// const ObjectId = require("mongodb").ObjectId;
// transactionRoutes.route("/transactions").get(function (req, res) {
//     let db_connect = dbo.getDb("employees");
//     db_connect
//       .collection("transactions")
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
//   });


    // const  token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h"});

      // res.cookie("token", token, {
      //     httpOnly: true,
      //     //secure: true,
      //     //  maxAge: 1000000,
      //     //  signer:
      // }
// Login Page example

function Login() {
  const [showAlert, setShowAlert] = useState(true);
  const [showToast, setShowToast] = useState(true);
  const isLoggedIn = localStorage.isLoggedIn;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false) //true = error, false = no error.
  const [isLogin, setIsLogin] = useState(false) //true = error, false = no error.
  const error = "Connexion Fail"
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setIsError('');
      }, 5000);
    }
  }, [error]);
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
    toast.success(':unicorn_face: Connected', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    setTimeout(() => window.location = "/", 7000);
} else {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
}
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={logMe}>
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


{/* <div className='form-group'>
<select
className='form-control'
aria-label='Agent select'
onChange={e => updateForm({ agentId: e.target.value })}
>
<option value=''>--Choose an agent--</option>
{agents.map(agent => (
<option key={agent._id} value={agent._id}>
{agent.firstName} {agent.lastName}
</option>
))}
</select>
</div> */}






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
          navigate("/dashboard");
          toast.success("Connected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => (window.location = "/"), 3000);
        } else {
          setIsError(true);
          setTimeout(() => setIsError(false), 5000);
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
                /> // close the ToastContainer tag
              </form>
            </div>
            {/* Source: <a href="https://askavy.com/react-form/">React Form</a> */}
          </div>
          </div>
          </div>
);
}

export default Login;
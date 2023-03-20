const express = require("express");


// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    region: req.body.region,
    rating: req.body.rating,
    fee: req.body.fee,
    sale: req.body.sale,
    role: req.body.role,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    region: req.body.region,
    rating: req.body.rating,
    fee: req.body.fee,
    sale: req.body.sale,
    role: req.body.role,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// Login
recordRoutes.route("/login").post(async function (req, res) {
  let db_connect = dbo.getDb();
  const { email, password } = req.body;
  const user = await db_connect.collection("users").findOne({ "email": email });
  
  if (!user) {
  return res.status(400).json({ message: "Invalid email or password" });
  }
  
  if (password !== user.password) {
  return res.status(400).json({ message: "Invalid email or password" });
  }
  
  res.json(true);
  });

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});


// transaction 
recordRoutes.route("/transactions").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  const employeesCollection = db_connect.collection('transactions');
  console.log("========employeesCollection")
  console.log(employeesCollection)
  employeesCollection.aggregate([
    {
      $lookup: {
        from: 'records',
        localField: 'agent_id',
        foreignField: '_id',
        as: 'agent'
      }
    },
    {
      $unwind: '$agent'
    },
    {
      $project: {
        _id: 0,
        date: 1,
        amount: 1,
        agent_full_name: { $concat: ['$agent.first_name', ' ', '$agent.last_name'] },
      },
    },
    {
      $sort: {
          data: -1,
      }
    },
      {
        $limit: 10,
      }
  ]).toArray(function (err, result) {
    console.log("====result")
    console.log(result)
    if (err) throw err;
    res.json(result);
  });
});


recordRoutes.route("/transaction").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  const transaction = req.body 
  const employeesCollection = db_connect.collection('transactions');
  employeesCollection.insertOne(transaction)
});

module.exports = recordRoutes;

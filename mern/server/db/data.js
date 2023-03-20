const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:5000'
const client = new MongoClient(uri, {useNewUrlParser: true});

client.connect(err => {
    const db = client.db("transactions_database");
    const transactionsCollection = db.collection("transactions");
    const transactions = [
      {"agent_id":"64137226b74d1f4105125aa6","date": "05/01/2022", "amount": 500},
      {"agent_id":"64137226b74d1f4105125aa6","date": "05/01/2022", "amount": 200},
      {"agent_id":"64137226b74d1f4105125aa6","date": "15/03/2022", "amount": 1000},
      {"agent_id":"64137226b74d1f4105125aa6","date": "22/04/2022", "amount": 750},
      {"agent_id":"64137226b74d1f4105125aa6","date": "03/05/2022", "amount": 300},
      {"agent_id":"64137226b74d1f4105125aa6","date": "17/06/2022", "amount": 1500},
      {"agent_id":"64137226b74d1f4105125aa6","date": "08/07/2022", "amount": 900},
      {"agent_id":"64137226b74d1f4105125aa6","date": "19/08/2022", "amount": 600},
      {"agent_id":"64137226b74d1f4105125aa6","date": "25/09/2022", "amount": 1200},
      {"agent_id":"64137226b74d1f4105125aa6","date": "14/10/2022", "amount": 400}
    ];
    transactionsCollection.insertMany(transactions, (err, result) => {
      if(err) {
        console.log(err);
      } else {
        console.log(result.insertedIds);
      }
      client.close();
    });
  });
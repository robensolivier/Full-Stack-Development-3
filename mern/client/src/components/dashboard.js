import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";



function CardAgent() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Agent List</Card.Title>
        <Card.Text>
          You can see the agent list here.
        </Card.Text>
        <Link to="/recordlist">
          <Button variant="primary">See agent list</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}


function Transaction() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Transactions</Card.Title>
        <Card.Text>
          Vous pouvez effectuer des transactions ici.
        </Card.Text>
        <Link to="/transaction">
          <Button variant="primary">List of Transaction RocketElevator</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}


function Dashboard() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <CardAgent />
        </div>
        <div className="col-md-6">
          <Transaction />
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
 
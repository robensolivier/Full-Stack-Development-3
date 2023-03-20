import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function RecordList() {
  const [show, setShow] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const handleClose = () => {
    setShow(false);
    setRecordToDelete(null);
  };
  const handleShow = (recordId) => {
    setShow(true);
    setRecordToDelete(recordId);
  };
  const Record = (props) => (
    <tr>
      <td>{props.record.first_name}</td>
      <td>{props.record.last_name}</td>
      <td>{props.record.email}</td>
      <td>{props.record.region}</td>
      <td>{props.record.rating}</td>
      <td>{props.record.fee}</td>
      <td>{props.record.sale}</td>
      <td>{props.record.role}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => handleShow(props.record._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );



  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {


    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  
  // This following section will display the table with the records of individuals.
  return (
    <div>
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You're about to dealing an Agent!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to continue?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteRecord(recordToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>

      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Rating</th>
            <th>Fee</th>
            <th>Sale</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
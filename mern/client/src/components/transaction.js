import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.agent_full_name}</td>  
    <td>{props.record.date}</td>
    <td>{props.record.amount}</td>
    </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");


  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/transactions`);
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      console.log(records)
      setRecords(records);
    }

    getRecords();
    return;

  }, [records.length]);


  // This method will delete a record

  // async function deleteRecord(id) {
  //   await fetch(`http://localhost:5000/transactions/${id}`, {
  //     method: "DELETE",
  //   });
  //   const newRecords = records.filter((el) => el._id !== id);
  //   setRecords(newRecords);
  // }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          // deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Transaction List</h3>
      <NavLink to="/createtransaction"> Create New Transaction </NavLink>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Agent Name</th>     
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
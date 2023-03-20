
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

export default function Create() {
  const [form, setForm] = useState({
    amount: "",
    agent_full_name: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTransaction = { ...form };

    await fetch("http://localhost:5000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ amount: "", agent_full_name: ""});
    navigate("/");
  }

  const [records, setRecords] = useState([]);

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

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
          />
        </div>
        <div className="form-group">
            <select 
            onChange={e => updateForm({ agent_full_name: e.target.value })}>    
                <option value=''>--Choose an agent--</option>
                {records.map(agent => (
                    <option key={agent.agent_full_name} value={agent.agent_full_name}>
                    {agent.agent_full_name}
                    </option>
                ))}
            </select>
          </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

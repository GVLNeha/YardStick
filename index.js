// src/pages/index.js
import { useState } from "react";
import { addTransaction } from "../services/api"; // Assuming you created an API for adding transactions

export default function Home() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { amount, date, description };
    await addTransaction(newTransaction);
    // You might want to update the list of transactions after adding
  };

  return (
    <div className="container">
      <h1>Personal Finance Tracker</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      
      {/* You can add a list of transactions here */}
    </div>
  );
}

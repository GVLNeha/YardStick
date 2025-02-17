// src/components/TransactionForm.js
import { useState } from 'react';

export default function TransactionForm({ addTransaction }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTransaction = { amount, date, description };

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });

      const data = await res.json();

      if (data.success) {
        addTransaction(data.transaction); // Update the parent component with the new transaction
      } else {
        alert('Failed to add transaction');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while adding transaction');
    }

    setAmount('');
    setDate('');
    setDescription('');
  };

  return (
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
          required
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

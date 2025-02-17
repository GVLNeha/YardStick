// src/components/TransactionList.js
import React from 'react';

export default function TransactionList({ transactions, deleteTransaction }) {
  const handleDelete = async (id) => {
    const res = await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });

    const data = await res.json();

    if (data.success) {
      deleteTransaction(id); // Update the parent component to remove the deleted transaction
    } else {
      alert('Failed to delete transaction');
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <span>{transaction.amount}</span> - {transaction.description} (
            {new Date(transaction.date).toLocaleDateString()})
            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

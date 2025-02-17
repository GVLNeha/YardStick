'use client'

import { useState, useEffect } from "react";
import { addTransaction, getTransactions } from "../services/api";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch existing transactions when the component mounts
    getTransactions().then((data) => setTransactions(data.transactions));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { amount, date, description };
    await addTransaction(newTransaction); // Send the new transaction to the server
    setAmount("");
    setDate("");
    setDescription("");
    // Update the transaction list after adding a new one
    setTransactions(await getTransactions());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      {/* Add Transaction Form */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800"
              rows="3"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>

      {/* Transactions List */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg mt-10 p-6 space-y-6">
        <h3 className="text-xl font-semibold text-center text-gray-800">Transactions</h3>
        <ul className="space-y-4">
          {transactions.length === 0 ? (
            <li className="text-center text-gray-500">No transactions added yet.</li>
          ) : (
            transactions.map((transaction, index) => (
              <li key={index} className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <p className="font-semibold text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
                <span className="text-lg font-bold text-gray-900">{transaction.amount} USD</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

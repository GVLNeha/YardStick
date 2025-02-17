// src/components/ExpenseChart.js
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpenseChart({ transactions }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    const calculateMonthlyExpenses = () => {
      const expenses = transactions.reduce((acc, transaction) => {
        const month = new Date(transaction.date).getMonth();
        if (!acc[month]) acc[month] = 0;
        acc[month] += transaction.amount;
        return acc;
      }, {});

      const chartData = Object.keys(expenses).map((month) => ({
        name: `Month ${parseInt(month) + 1}`,
        expense: expenses[month],
      }));

      setMonthlyExpenses(chartData);
    };

    calculateMonthlyExpenses();
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={monthlyExpenses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

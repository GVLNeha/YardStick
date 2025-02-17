import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function MonthlyExpensesChart({ transactions }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Process transactions to calculate monthly expenses
  const expensesByMonth = months.map((month, index) => {
    const total = transactions
      .filter((transaction) => new Date(transaction.date).getMonth() === index)
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
    return { month, expense: total };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={expensesByMonth}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MonthlyExpensesChart;

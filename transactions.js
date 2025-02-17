import connectDb from '../../lib/mongodb'; // MongoDB connection utility
import Transaction from '../../models/Transaction'; // Mongoose model for transactions

// Handler for the API route
export default async function handler(req, res) {
  try {
    // Establish a database connection
    await connectDb();

    if (req.method === 'POST') {
      // Handle POST request to add a new transaction
      const { amount, date, description } = req.body;

      if (!amount || !date || !description) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      try {
        // Create a new transaction object
        const newTransaction = new Transaction({ amount, date, description });
        
        // Save the transaction to the database
        await newTransaction.save();
        
        // Respond with success and the created transaction
        return res.status(201).json({ success: true, transaction: newTransaction });
      } catch (error) {
        console.error('Error saving transaction:', error);
        return res.status(500).json({ success: false, error: 'Failed to save transaction' });
      }
    } else if (req.method === 'GET') {
      // Handle GET request to fetch all transactions
      try {
        // Fetch all transactions from the database
        const transactions = await Transaction.find({});
        
        // Respond with the fetched transactions
        return res.status(200).json({ success: true, transactions });
      } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch transactions' });
      }
    } else {
      // Handle other HTTP methods (PUT, DELETE, etc.)
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
  } catch (error) {
    // Catch any error related to the database connection
    console.error('Database connection error:', error);
    return res.status(500).json({ success: false, error: 'Database connection error' });
  }
}

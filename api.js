const getTransactions = async () => {
  try {
    const response = await fetch('/api/transactions');

    // Log the response status for debugging
    console.log('API Response Status:', response.status);
    console.log('API Response:', response);

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
};

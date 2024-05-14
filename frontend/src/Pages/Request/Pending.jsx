import React, { useState, useEffect } from 'react';

function Pending() {
  const [AdminIDs, setAdminIDs] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulating fetching admin IDs
    const fetchAdminIDs = () => {
      const result = [{ ID: 1 }, { ID: 2 }, { ID: 3 }];
      setAdminIDs(result.map(res => res.ID));
    };

    fetchAdminIDs();
  }, []);

  useEffect(() => {
    // Simulating fetching transaction data
    const fetchTransactions = () => {
      const result = [
        { TransactionID: 1, Deadline: '2024-05-14', Reason: 'Payment' },
        { TransactionID: 2, Deadline: '2024-05-15', Reason: 'Refund' },
        { TransactionID: 3, Deadline: '2024-05-16', Reason: 'Chargeback' }
      ];
      setTransactions(result);
    };

    fetchTransactions();
  }, []);

  const handleAccept = (transactionId) => {
    // Update the transactions state to remove the accepted transaction
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.TransactionID !== transactionId));
  };

  const handleDecline = (transactionId) => {
    // Update the transactions state to remove the declined transaction
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.TransactionID !== transactionId));
  };

  return (
    <div>
      <h1>Transaction Management</h1>
      <div className="master-detail-container">
        <div className="master-section">
          <table className="dtuitem">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr key={i}>
                  <td className='itemid'>{transaction.TransactionID}</td>
                  <td className='itemid'>{transaction.Deadline}</td>
                  <td className='itemid'>{transaction.Reason}</td>
                  <td className='itemid'>
                    <button id='bgbtn' className='btnaccept' onClick={() => handleAccept(transaction.TransactionID)}>Accept</button>
                    <button id='bgbtn' className='btndecline' onClick={() => handleDecline(transaction.TransactionID)}>Decline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pending;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';

function Pending() {
  const [AdminIDs, setIDs] = useState([]);

  const fetchData2 = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/getAdmin");
      console.log(result.data.map(res => res.ID));
     setIDs(result.data.map(res => res.ID));
    } catch (err) {
      console.log("Error with axios")
    }
   }
  
  
  useEffect(() => {
    fetchData2();
  },[]);


  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/forRequest");
      setTransactions(result.data);
    } catch (err) {
      console.log("Error with axios", err);
    }
  };

  const handleAccept = async (transactionId) => {
    try {
      await axios.put(`http://localhost:3206/updateTransaction/${transactionId}`, { Action: "Accepted" });
      // After accepting, you might want to update the UI accordingly
      fetchData();
    } catch (err) {
      console.log("Error accepting transaction", err);
    }
  };

  const handleDecline = async (transactionId) => {
    try {
      await axios.put(`http://localhost:3206/updateTransaction/${transactionId}`, { Action: "Declined" });
      // After declining, you might want to update the UI accordingly
      fetchData();
    } catch (err) {
      console.log("Error declining transaction", err);
    }
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
            {
                    transactions.map((transaction, i) => {
                      return (
                        <tr key={i}>
                          <td className='itemid'>{transaction.TransactionID}</td>
                          <td className='itemid'>{transaction.Deadline}</td>
                          <td className='itemid'>{transaction.Reason}</td>
                          <td className='itemid'>
                    
                        <button id='bgbtn' className='btnaccept' onClick={() => handleAccept(transaction.TransactionID)}>Accept</button>
                        <button id='bgbtn' className='btndecline' onClick={() => handleDecline(transaction.TransactionID)}>Decline</button>
                    
                    
                  </td>
                        </tr>
                      )
                    })
                  }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Pending;

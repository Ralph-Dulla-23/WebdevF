import './App.css';
import axios from 'axios';
import TableItems from './JSON/TableItems.json';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
//import { DataTable } from 'primereact/datatable';
//import { Column } from 'primereact/column';
import { Items } from './JavaScript/Items.js';
import { table } from "./Pages/table.jsx";
import { InputText } from "primereact/inputtext";

function App() {
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

  


  const [products, setProducts] = useState([]);//for data backend 1
  const navigate = useNavigate();

  useEffect(() => {
    console.log("dapat kausa lang ni mogawas");
  }, []);
  
  useEffect(() => {
    fetchData();
 },[])//fetching backend 2

 const fetchData = async () => {
  try {
      const result = await axios("http://localhost:3206/forTable");
      console.log(result);
      setProducts(result.data);
  }catch (err) {
      console.log("Error with axios")
  }
}//backend 3



  useEffect(() => {
    // Check if the user has visited the Scan page before
    const hasVisitedScan = localStorage.getItem('has_visited_scan');
    if (!hasVisitedScan) {
      // If not visited before, navigate to the Scan page
      navigate('/Scan');
      // Set a flag in localStorage indicating that the user has visited the Scan page
      localStorage.setItem('has_visited_scan', 'true');
    }
  }, []);

  const handleLogout = () => {
    document.getElementById("logoutConfirmation").style.display = "block";
  };

  const handleConfirmLogout = () => {

    console.log('clicked');
    const input = document.getElementById('inputID');
    console.log(input.value);
    if(AdminIDs.includes(input.value)) {
      localStorage.removeItem('user_id');
      navigate('/Scan');
   }else{
    alert(`This ID does not belong to an Admin`)
   }
    
  };

  const handleCancelLogout = () => {
    document.getElementById("logoutConfirmation").style.display = "none";
  };

  // Other navigation handlers
  const handleHomeClick = () => navigate('/Dashboard');
  const handleBorrowClick = () => navigate('/Borrow');
  const handleReturnClick = () => navigate('/Return');
  const handleScanClick = () => navigate('/Scan');
  const handleScanRClick = () => navigate('/ScanR');
  const handleUpdateItemsClick = () => navigate('/Update-Items');
  const handleRequestUserClick = () => navigate('/Request-User');
  const handleRequestAdminClick = () => navigate('/Request-Admin');
  const handleRequestClick = () => navigate('/Request');
 

  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div data-testid="Dashboard-test" className="WholeContent">
        <aside>
          <div className="aside">
            <div className="sidebar">
              <div className="pfp">
                <div className="username">
                  <h1 >Hillbert Tan</h1>
                </div>
              </div>
              <div className="sidebuttons">
                <a onClick={handleHomeClick}>
                  <span className="material-symbols-outlined">home</span>
                  <h2>Dashboard</h2>
                </a>
                <a onClick={handleBorrowClick}>
                  <span className="material-symbols-outlined">book</span>
                  <h2>Borrow</h2>
                </a>
                <a onClick={handleScanRClick}>
                  <span className="material-symbols-outlined">keyboard_return</span>
                  <h2>Return</h2>
                </a>
                <a onClick={handleUpdateItemsClick}>
                  <span className="material-symbols-outlined">update</span>
                  <h2>Update Items</h2>
                </a>
                <a onClick={handleRequestClick}>
                  <span className="material-symbols-outlined">Request_page</span>
                  <h2>Request</h2>
                </a>
                <a onClick={handleLogout}>
                  <span className="material-symbols-outlined">logout</span>
                  <h2>Logout</h2>
                </a>
              </div>
            </div>
          </div>
        </aside>

        <div className="content">
          <div className="upper">
            <div className="logo" />
            <h1>Welcome to GearGuard!</h1>
          </div>
          <div className="lower">
            <div className="mastertable">
              <table data-testid="Table">
                <thead>
                  <tr>
                    <th className='yes'>Transaction ID</th>
                    <th className='yes'>ItemID</th>
                    <th className='yes'>ID</th>
                    <th className='yes'>Date Borrowed</th>
                    <th className='yes'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((transaction, i) => {
                      return (
                        <tr key={i}>
                          <td className='itemid'>{transaction.TransactionID}</td>
                          <td className='itemid'>{transaction.ItemID}</td>
                          <td className='itemid'>{transaction.ID}</td>
                          <td className='itemid'>{transaction.Borrowed_date}</td>
                          <td className='itemid'>{transaction.Status}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer>
          <div className="footer-content">
            <h3>GearGuard</h3>
            <p>Praise be Jesus and Mary! Now and Forever!</p>
          </div>
        </footer>
      </div>

      {/* Logout Confirmation Pop-up */}
      <div className="form-popup" id="logoutConfirmation">
        
    
          <p className='cfm'>Need Admin ID to logout</p>
          <InputText id="inputID" className='inputID'></InputText>
          <div className="btn-group">
            <button  type="button" className="btncancel" onClick={handleCancelLogout}>Cancel</button>
            <button  type="button" className="btnconfirm" onClick={handleConfirmLogout}>Confirm</button>
          </div>
        
      </div>
    </div>
  );
}

export default App;

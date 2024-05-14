import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Return from '../Return/Return'
import React, { useState, useEffect, useContext } from 'react';    
import { Button } from 'primereact/button';  
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext"; // Import InputText
import { AuthContext } from '../../auth/authContext';//needed auth
        

function ScanR() {
  const [IDs, setIDs] = useState([]);
  const [value, setValue] = useState();
  const [value1, setValue1] = useState(0);
  const {SelectedAvailableItem, setSelectedAvailableItem}=useContext(AuthContext);
  const {QuantitySelected, setSelectedQuantity}=useContext(AuthContext);

  useEffect(() => {
    fetchData();
 },[])
 
  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/getNonBorrower");
       console.log(result.data.map(res => res.ID));
       setIDs(result.data.map(res => res.ID));
   }catch (err) {
        console.log("Error with axios")
   }
  }//backend 3

    
  const [selectedItem, setSelectedItem] = useState(null);
  const items = Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i }));

  const navigate = useNavigate();
  const handleHomeClick = () => navigate('/Dashboard');
  const handleBorrowClick = () => navigate('/Borrow');
  
  const handleReturnClick = () =>{
    
    console.log('clicked');
    const input = document.getElementById('inputID');
    console.log(input.value);
    if(IDs.includes(input.value)) {
    // const response = await axios.put(`http://127.0.0.1:8000/CreateBorrowTransaction/02/3/1`);
    navigate('/Dashboard')
      
   }else{
    alert(`ID number may have not yet returned an Item or the ID number does not exist!`)
   }
    
  };

  const handleTransactionClick = async (e) => {
    e.preventDefault();
  try {
    console.log('clicked');
    const input = document.getElementById('inputID');
    console.log(input.value);
    
    if(IDs.includes(input.value)) {
     const response = await axios.post(`http://127.0.0.1:8000/CreateBorrowTransaction/${input.value}/${SelectedAvailableItem}/${QuantitySelected}`);
     navigate('/Dashboard')
   }else{
    alert(`ID number may have not yet returned an Item or the ID number does not exist!`)
   }
  } catch (err) {
    if (err.response) {
      console.log("Error with Borrowing", err.response.status, err.response.data); // Log detailed error information if available
    } else {
      console.log("Error with Borrowing", err); // Log general error message
    }}
};
  
  const handleScanClick = () => navigate('/Scan');
  const handleScanRClick = () => navigate('/ScanR');

 
  const handleUpdateItemsClick = () => navigate('/Update-Items');
  const hanldeRequestUserClick = () => navigate('/Request-User');
  const hanldeRequestAdminClick = () => navigate('/Request-Admin');
  const handleRequestClick = () => navigate('/Request');
  const handleLogout = () => {
    // Clear user ID from localStorage
    localStorage.removeItem('user_id');
    // Navigate back to the first scan page
    navigate('/Scan');
  };


  return (
    <>

<link rel="stylesheet" href="https://fonts.googleapis.com/cs
s2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48
,100..700,0..1,-50..200" />

    <div className="WholeContent">
{console.log(SelectedAvailableItem)}
{console.log(QuantitySelected)}
    <aside>
          <div className="aside">
            <div className="sidebar">
              <div className="pfp" >
             
              <div className="username">
              <h1>GearGuards</h1>    
              </div>
              </div>
             <div className="sidebuttons">
            <a onClick={handleHomeClick}>
              <span className="material-symbols-outlined" >
                home
              </span>
              <h2>Dashboard</h2>
            </a>
            <a onClick={handleBorrowClick}>
              <span className="material-symbols-outlined">
                book
              </span>
              <h2>Borrow</h2>
            </a>
            <a onClick={handleScanRClick} >
              <span className="material-symbols-outlined" >
                keyboard_return
              </span>
              <h2>Return</h2>
            </a>
            <a onClick={handleUpdateItemsClick}>
              <span className="material-symbols-outlined" >
                update
              </span>
              <h2>Update Items</h2>
            </a>
            <a onClick={handleRequestClick}>
              <span className="material-symbols-outlined" >
                Request_page
              </span>
              <h2>Request</h2>
            </a>
            <a onClick={handleLogout}> {/* Logout handler */}
              <span className="material-symbols-outlined">logout</span>
              <h2>Logout</h2>
            </a>
            </div>
            </div>
          </div>
        </aside>
        
        
        <div className="scan">
            <span id='logoscan' class="material-symbols-outlined">
                gpp_maybe
            </span>
            <h4>Hello Please Input ID First</h4>
            
                <InputText className='inputID' placeholder="Input ID" id="inputID" value={value} onValueChange={(e) => setValue(e.value)} />
                
                <Button className='tn' label="Confirm" onClick={handleTransactionClick}/>
                
        </div>
         
          <footer>
      <div className="footer-content">
      <h3>GearGuard</h3>
            <p>Praise be Jesus and Mary! Now and Forever!</p>
            
        </div>
    </footer>

    </div>
    </>
  )
}

export default ScanR

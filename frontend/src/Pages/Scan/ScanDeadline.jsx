import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';    
import { Button } from 'primereact/button';  
import { AuthContext } from '../../auth/authContext';//auth
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext"; // Import InputText
        

function ScanR() {
  const {ID, setID}=useContext(AuthContext);//auth
  const [AdminIDs, setAdminIDs] = useState([]);

  const fetchData2 = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/getAdmin");
      console.log(result.data.map(res => res.ID));
     setAdminIDs(result.data.map(res => res.ID));
    } catch (err) {
      console.log("Error with axios")
    }
   }
  
  
  useEffect(() => {
    fetchData2();
  },[]);
  const [IDs, setIDs] = useState([]);
  const [value, setValue] = useState();
  const [value1, setValue1] = useState(0);

  useEffect(() => {
    fetchData();
 },[])
 
  const fetchData = async () => {
    try {
      const result = await axios("http://localhost:3206/getBorrowing");
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
  const change = event =>{
    
  }
  const handleReturnClick = () =>{
    
    console.log('clicked');
    const input = document.getElementById('inputID');
    console.log(input.value);
    if(IDs.includes(input.value)) {
      console.log('dassad')
      setID(input.value)
      navigate('/Request-User')
      
   }else{
    alert(`Invalid ID!`)
   }
    
  };
  
  const handleScanClick = () => navigate('/Scan');
  const handleScanRClick = () => navigate('/ScanR');

 
  const handleUpdateItemsClick = () => navigate('/Update-Items');
  const hanldeRequestUserClick = () => navigate('/Request-User');
  const hanldeRequestAdminClick = () => navigate('/Request-Admin');
  const handleRequestClick = () => navigate('/Request');
  const handleLogout = () => {
    document.getElementById("logoutConfirmation").style.display = "block";
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/Scan');
  };

  const handleCancelLogout = () => {
    document.getElementById("logoutConfirmation").style.display = "none";
  };


  return (
    <>

<link rel="stylesheet" href="https://fonts.googleapis.com/cs
s2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48
,100..700,0..1,-50..200" />

    <div className="WholeContent">

    <aside>
          <div className="aside">
            <div className="sidebar">
              <div className="pfp" >
             
              <div className="username">
              <h1>Hillbert Tan</h1>    
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
                <Button className='tn' label="Confirm" onClick={handleReturnClick}/>
        </div>
         
          <footer>
      <div className="footer-content">
      <h3>GearGuard</h3>
            <p>Praise be Jesus and Mary! Now and Forever!</p>
            
        </div>
    </footer>
      {/* Logout Confirmation Pop-up */}
      <div className="form-popup" id="logoutConfirmation">
        
    
          <p className='cfm'>Need Admin ID to logout</p>
          <InputText className='inputID'></InputText>
          <div className="btn-group">
            <button  type="button" className="btncancel" onClick={handleCancelLogout}>Cancel</button>
            <button  type="button" className="btnconfirm" onClick={handleConfirmLogout}>Confirm</button>
          </div>
        
      </div>
    </div>
    </>
  )
}

export default ScanR

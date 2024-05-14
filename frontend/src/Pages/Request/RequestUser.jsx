
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { AuthContext } from '../../auth/authContext';//needed auth
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";


import { Button } from 'primereact/button';
                

function RequestUser({ onConfirm }) {
  const {ID, setID}=useContext(AuthContext);//auth
  const [valueReason, setValueReason] = useState('');
  const [borrowedItems, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ValuePend] = useState("Pending");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const bID = String(ID);
      console.log(bID)
      const result = await axios(`http://127.0.0.1:8000/GetItemBorrowing/${bID}`);
      console.log(result.data);
      setItems(result.data);
    } catch (err) {
      console.log("Error with axios")
    }
   }



  const [newTransaction, setNewTransaction] = useState({ TransactionID: "", Reason: "", Action: "", Date: null });
    const handleNewInputChange = (key, value) => {
      setNewTransaction(prevState => ({
        ...prevState,
        [key]: value
      }));
    };

    const itemTemplate = (option) => {
      // Customize the template here to display all properties of each object
      return (
          <div>
              <div>{`TransactionID:   ${option.TransactionID}`}</div>
              <div>{`Quantity:   ${option.Quantity}`}</div>
              <div>{`ItemName:   ${option.ItemName}`}</div>
              {/* Add more properties as needed */}
          </div>
      );
  };
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const handleHomeClick = () => navigate('/Dashboard');
  const handleBorrowClick = () => navigate('/Borrow');
  const handleReturnClick = () => navigate('/Return');
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

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/CreateRequestUser`, {
        TransactionID: selectedItem.TransactionID,
        Reason: valueReason,
        Deadline: date,
        Status: ValuePend,
      });
      alert("Request created successfully:", response.data);
    } catch (error) {
      alert('You have already send a Request');
      console.error('Error In Creating Request', error);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.value); // Convert to Date object
    const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000); // Convert to local time
    const formattedDate = localDate.toISOString().split('T')[0]; // Extract date portion
    setDate(formattedDate);
  };

  return (
    <>

<link rel="stylesheet" href="https://fonts.googleapis.com/cs
s2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48
,100..700,0..1,-50..200" />

    <div className="WholeContent">
    {console.log(ID)}
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
        

       
          <div className="content">

            <div className="upper">
              
               <div className="logo">
                </div>
                <h1>Welcome to GearGuard!</h1> 
              </div>
            
            <div className="lower">
              <div className="lower1">
              <div className="uppercal">
                <h3>
                  Transaction Id:
                </h3>
                <h3>
                  New Deadline:
                </h3>
                 </div> 
                 <div className="uppercal2">
             
                <Dropdown className="Itemid" value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={borrowedItems} optionLabel="TransactionID" 
                      placeholder="Select Item"  itemTemplate={itemTemplate} inputStyle={{fontSize: '20px'}} />
                  <Calendar className='calendar' inputStyle={{fontSize: '20px'}} value={date} onChange={handleDateChange}  dateFormat="yy-mm-dd"  />
             </div>
               
                <div className='lowercal'>
                  <h3>
                    Reason:
                  </h3>
                  <InputTextarea className='reason' inputStyle={{fontSize: '20px'}} autoResize value={valueReason}
                    onChange={(e) => setValueReason( e.target.value)} rows={5} cols={30} />
                  </div>
                  <Button  className='confirmc' label='Confirm' onClick={handleConfirm}  />
              </div>
            

           </div>
            
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

export default RequestUser;


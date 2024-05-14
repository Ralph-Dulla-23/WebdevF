import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import React, { useState, useEffect, useContext } from 'react'; //needed auth   
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { AuthContext } from '../../auth/authContext';//needed auth
import axios from 'axios';


function Borrow() {
  const [availbleItems, setItems] = useState([]);
  const [selectedDrop, setSelectedDrop] = useState(null);
  const [value, setValue] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [multiselectValue, setMultiselectValue] = useState(null);
  const {SelectedAvailableItem, setSelectedAvailableItem}=useContext(AuthContext);
  const {QuantitySelected, setSelectedQuantity}=useContext(AuthContext);

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



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const result = await axios(`http://127.0.0.1:8000/getAvailable`);
      console.log(result.data);
      setItems(result.data);
    } catch (err) {
      console.log("Error with axios")
    }
   }

  const toast = useRef(null);

  const showSuccess = () => {
      toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
  }

  const itemTemplate = (option) => {
    // Customize the template here to display all properties of each object
    return (
        <div>
            <div>{`ItemName:   ${option.ItemName}`}</div>
            <div>{`Quantity:   ${option.Quantity}`}</div>
            
            {/* Add more properties as needed */}
        </div>
    );
};

  const navigate = useNavigate();

  const handleHomeClick = async (e) => {
    e.preventDefault();
  try {

    navigate('/Dashboard');
  } catch (err) {
    if (err.response) {
      console.log("Error with Returning", err.response.status, err.response.data); // Log detailed error information if available
    } else {
      console.log("Error with Returning", err); // Log general error message
    }}
};

  const handleBorrowClick = () => navigate('/Borrow');

  const handleScanB = () =>{
    
    console.log(selectedItem.ItemID);
    console.log(selectedItem.Quantity);
    console.log(value);
    if(value <= selectedItem.Quantity && value >= 1 ) {
      console.log(`less or equal`);
      setSelectedAvailableItem(selectedItem.ItemID);
      setSelectedQuantity(value);
      navigate('/ScanB')
      
   }else{
    console.log(`invalid quantity`)
   }
    
  };
  

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
  
  const handleDash= () => navigate('/Dashboard');
  const handleScanRClick = () => navigate('/ScanR');
  const handleUpdateItemsClick = () => navigate('/Update-Items');
  const handleRequestClick = () => navigate('/Request');



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
              <h1>GearGuard</h1>    
              </div>
              </div>
             <div className="sidebuttons">
            <a onClick={handleDash}>
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
                <h1>Borrow Screen</h1> 
              </div>
            
            <div className="lower">
                 <div className="table">
                 <div className="return">
                  <div className="uppertable">
                  <div className="Items">
                        <h2>Available Items</h2>
                        <div className="card flex justify-content-center">
                  <Dropdown value={selectedItem} onChange={(e) => setSelectedItem(e.value)} options={availbleItems} optionLabel="ItemName" 
                      placeholder="Select Item" className="itemlist" itemTemplate={itemTemplate} />

                  

                  
             </div>
                        
                    </div>
                    <div className="quantity">
                      <h2>Quantity:</h2>
                    </div>
                    <div className="card flex justify-content-center">
                    <div className="flex-auto">
                    <InputNumber id="Quantity" className='quantityitems' inputId="integeronly" value={value} onValueChange={(e) => setValue(e.value)} />
                     </div>
                    </div>
                  </div>
                  <div className="lowertable">
                    <div className="borrowbtn">
                    <Button className='rbtn' label="Borrow" onClick={handleScanB} />
                      
                    </div>
                  </div>
                  </div>
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

export default Borrow

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';  
import { InputNumber } from 'primereact/inputnumber';
import { Message } from 'primereact/message';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller
import { Toast } from 'primereact/toast'; // Import Toast
import { InputText } from "primereact/inputtext"; // Import InputText
import { classNames } from 'primereact/utils'; // Import classNames

function Scan() {
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
  const [value, setValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    fetchData();
 },[]);

 const fetchData = async () => {
  try {
    const result = await axios("http://127.0.0.1:8000/getAdmin");
     console.log(result.data.map(res => res.ID));
     setIDs(result.data.map(res => res.ID));
 }catch (err) {
      console.log("Error with axios")
 }
}

  const defaultValues = {
    value: ''
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    data.value && show();

    reset();
  };

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
  };

  const handleDashboardClick = () => {
    
    console.log('clicked');
    const input = document.getElementById('inputID');
    console.log(input.value);
    if(IDs.includes(input.value)) {
      console.log('dassad')
      navigate('/Request-Admin')
      
   }else{
    alert(`This ID does not belong to an Admin`)
   }
    
  };

  const handleHomeClick = () => navigate('/');
  const handleBorrowClick = () => navigate('/Borrow');
  const handleReturnClick = () => navigate('/Return');
  const handleScanClick = () => navigate('/Scan');
  const handleScanRClick = () => navigate('/ScanR');
  const handleUpdateItemsClick = () => navigate('/Update-Items');
  const hanldeRequestUserClick = () => navigate('/Request-User');
  const hanldeRequestAdminClick = () => navigate('/Request-Admin');
  const handleRequestClick = () => navigate('/Request');

  return (
    <>

<link rel="stylesheet" href="https://fonts.googleapis.com/cs
s2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48
,100..700,0..1,-50..200" />

<div className="WholeContent">
<Controller
  name="value"
  control={control}
  rules={{ required: 'Please enter an ID' }} // Add rules for required field
  render={({ field, fieldState }) => (
    <div className="scan">
      <span id='logoscan' className="material-symbols-outlined">
        gpp_maybe
      </span>
      <h4>Hello Please Input ID First</h4>
      <InputText
       inputStyle={{ margin: '5px' }}
       id="inputID"
       className={classNames('inputID', { 'p-invalid': fieldState.error })}
       placeholder="Input ID"
       value={field.value}
       onChange={(e) => field.onChange(e.target.value)} // Update this line
/>
      {fieldState.error && (
        <small className="p-error">{fieldState.error.message}</small>
      )}
      <Button
        className='tn'
        label="Confirm"
        onClick={handleSubmit(handleDashboardClick)} // Use handleSubmit from react-hook-form
      />
    </div>
  )}
/>
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

export default Scan

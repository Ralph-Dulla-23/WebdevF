import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function Uitem() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [valueName, setValueName] = useState('');
  const [valueFromLAb, setFromLab] = useState('');
  const [valueDesc, setItemDesc] = useState('');
  const [valueQuan, setValueQuan] = useState('');
  const [editValueName, setEditValueName] = useState('');
  const [editValueFromLab, setEditValueFromLab] = useState('');
  const [editValueDesc, setEditValueDesc] = useState('');
  const [editValueQuan, setEditValueQuan] = useState('');

  useEffect(() => {
    fetchData();  
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:8000/foritems");
      setItems(result.data);
    } catch (err) {
      console.log("Error with axios", err);
    }
  };



  
  const handleRowClick = (item) => {
    setSelectedItem(item);
    setEditValueName(item.ItemName);
    setEditValueFromLab(item.FromLab);
    setEditValueDesc(item.ItemDescription);
    setEditValueQuan(item.Quantity);
  };

  const handleEdit = async () => {
    if (selectedItem) {
      try {

        console.log(selectedItem);

        if (selectedItem.Quantity == selectedItem.Total_Quantity){
            console.log('equal');
            const response = await axios.put(`http://127.0.0.1:8000/EditItem/${selectedItem.ItemID}`, {
            ItemName: editValueName,
            FromLab: editValueFromLab,
            ItemDescription: editValueDesc,
            Quantity: editValueQuan,
            Total_Quantity: editValueQuan,
            });
  
             if (response.status === 200) {
             alert('Item Updated Successfully!');
             fetchData();
             setSelectedItem(null);
             } else {
             console.error('Failed to update item');
            }
        } else {
          console.log('not equal');
        }

        // const response = await axios.put(`http://127.0.0.1:8000/EditItem/${selectedItem.ItemID}`, {
        //   ItemName: editValueName,
        //   FromLab: editValueFromLab,
        //   ItemDescription: editValueDesc,
        //   Quantity: editValueQuan,
        // });
  
        // if (response.status === 200) {
        //   alert('Item Updated Successfully!');
        //   fetchData();
        //   setSelectedItem(null);
        // } else {
        //   console.error('Failed to update item');
        // }
      } catch (err) {
      }
    }
  };


  const handleDelete = async () => {  
    if (selectedItem) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/DeleteItem/${selectedItem.ItemID}`);
        
        if (response.status === 200) {
          alert('Item Deleted Successfully!');
          setItems(items.filter(item => item.ItemID !== selectedItem.ItemID));
          setSelectedItem(null);
        } else {
          console.error('Failed to delete item');
        }
      } catch (err) {
        
      }
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/CreateItem", {
        ItemName: valueName,
        ItemFromLab: valueFromLAb,
        ItemDescription: valueDesc,
        Quantity: valueQuan,
        Total_Quantity: valueQuan,
      });

      
      if(response.status == 200){
        alert('Item Created Successfully!')
      }
    } catch (error){
      console.error('Error In Creating Item');
    }
  };
  return (
    <div>
      <h1>Item Management</h1>
      <div className="master-detail-container">
        <div className="master-section">
          <table data-testid="UItem-test" className="dtuitem">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>ID</th>
                <th>From Lab</th>
                <th>Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.ItemID} onClick={() => handleRowClick(item)} className="clickable-row">
                  <td className='citem'>{item.ItemName}</td>
                  <td className='citem'>{item.ItemID}</td>
                  <td className='citem'>{item.FromLab}</td>
                  <td className='citem'>{item.ItemDescription}</td>
                  <td className='citem'>{item.Quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="detail-section">
          {selectedItem && (
            <div>
              <h2>Edit Item</h2>
              <InputText className="inputadd" value={editValueName} onChange={(e) => setEditValueName(e.target.value)} />
              <InputText className="inputadd" value={editValueFromLab} onChange={(e) => setEditValueFromLab(e.target.value)} />
              <InputText className="inputadd" value={editValueDesc} onChange={(e) => setEditValueDesc(e.target.value)} />
              <InputText className="inputadd" value={editValueQuan} onChange={(e) => setEditValueQuan(e.target.value)} />
              <Button className="btnadd" label="Save" onClick={handleEdit} />
              <Button className="btnadd" label="Delete" onClick={handleDelete} />
            </div>
          )}
          <div>
            <h2>Add Item</h2>
            <InputText className="inputadd" value={valueName} onChange={(e) => setValueName(e.target.value)} placeholder="Name" />
            <InputText className="inputadd" value={valueFromLAb} onChange={(e) => setFromLab( e.target.value)} placeholder="From Lab" />
            <InputText className="inputadd" value={valueDesc} onChange={(e) => setItemDesc( e.target.value)} placeholder="Description" />
            <InputText className="inputadd" value={valueQuan} onChange={(e) => setValueQuan( e.target.value)} placeholder="Quantity" />
            <Button className="btnadd" label="Add" onClick={handleAdd} />
          </div>
        </div>
      </div>
    </div> 
  );
}

export default Uitem;
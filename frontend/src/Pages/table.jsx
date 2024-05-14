import React, { useState } from "react";
import data from "../JSON/TableItems.json";
import "../CSS/table.css";



 export const table= () => {

    const [Items, setItems] = useState(data);

    useEffect(() => {
      fetchData();
   },[])
  
   const fetchData = async () => {
    try {
        const result = await axios("http://localhost:3206/getItems");
        console.log(result);
        setItems(result.data);
    }catch (err) {
        console.log("Error with axios")
    }
  }

 return <div className="Table-Container"> 
 <table>
    <thead>
     <tr>
       <th>Item ID</th>
       <th>Item Name</th>
       <th>From</th>
       <th>Description</th>
       <th>Return Date</th>
     </tr>
    </thead>
    <tbody>
        {Items.map(() => (
        <tr>
         <td> {Item.ItemID} </td>
         <td> {Item.ItemName}</td>
         <td> {Item.Status}</td>
         <td> {Item.DateBorrowed}</td>
         <td> {Item.ReturnDate}</td>
       </tr>
        ))}
    </tbody>
 </table>

 </div>
};

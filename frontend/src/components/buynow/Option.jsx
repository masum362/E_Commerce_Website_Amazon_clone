import React, { useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../context/AccountContext';

const Option = ({ itemid }) => {

 

  const { account, setAccount } = useContext(LoginContext)


  const deleteItem = async(itemid) => {

    await axios(`http://localhost:3002/remove/${itemid}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      withCredentials: true
    }).then(res => {
      setAccount(res.data)
    }).catch(err => console.log(err))
  }
  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>

      </select>
      <p style={{ cursor: "pointer" }} onClick={() => deleteItem(itemid)}>Delete</p><span>|</span>
      <p className="forremovemedia">Save Or Later</p><span>|</span>
      <p className="forremovemedia">See More like this</p>
    </div>
  )
}

export default Option
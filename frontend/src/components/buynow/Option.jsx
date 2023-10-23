import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from '../context/AccountContext';
import { base_url } from '../../../base.js';

const Option = ({ deleteItem,itemid }) => {



  const { account, setAccount } = useContext(LoginContext)

  return (
    <div className=" flex items-start justify-between ">
      <p className=' text-start' style={{ cursor: "pointer" }} onClick={() => deleteItem(itemid)}>Delete</p><span>|</span>
      <p className="forremovemedia">See More like this</p>
    </div>
  )
}

export default Option
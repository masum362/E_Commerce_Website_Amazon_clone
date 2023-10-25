import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { base_url } from "../../../base";


export const LoginContext = createContext(null);

const AccountContexxt = ({children}) => {
    const [account , setAccount] = useState(null);

    useEffect(()=> {
        getAccountDetails();
    }, [])
    

    
  const getAccountDetails = async () => {
    await axios.get(`${base_url}/getaccountdetails`,
      { withCredentials: true , headers:{
        Authorization: 'Bearer ' +localStorage.getItem('token')
      }})
      .then(response => {
        setAccount(response.data)
        console.log({ account });
      }).catch(err => { console.log({ err }) });
  }


    return <LoginContext.Provider value={{account , setAccount}}>
        {children}
    </LoginContext.Provider>
}

export default AccountContexxt;
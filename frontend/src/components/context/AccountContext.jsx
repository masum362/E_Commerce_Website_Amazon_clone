import { createContext, useState } from "react";


export const LoginContext = createContext(null);

const AccountContexxt = ({children}) => {
    const [account , setAccount] = useState(null);

    return <LoginContext.Provider value={{account , setAccount}}>
        {children}
    </LoginContext.Provider>
}

export default AccountContexxt;
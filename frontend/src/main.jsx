import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './Store.jsx'
import { Provider } from 'react-redux'
import AccountContexxt from './components/context/AccountContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AccountContexxt>
    <Provider store={store}>
      <App />
    </Provider>,
  </AccountContexxt>


)

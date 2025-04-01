import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'

createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
     <Provider>
      <App />
     </Provider>
    </BrowserRouter>
   
  </React.StrictMode>
  
)

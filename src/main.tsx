import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { StoreProvider } from 'easy-peasy'

import App from './App'
import './index.css'
import RouterD from './Router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <StoreProvider store={store}>
    <RouterD />
    </StoreProvider>
  //  </React.StrictMode>,
)

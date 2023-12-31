import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Header from './components/Header/Header.jsx'
import PageContent from './components/PageContent/PageContent.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <PageContent />
  </React.StrictMode>,
)

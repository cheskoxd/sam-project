import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AuthWrapper from './components/AuthWrapper'
import App from './App'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

const RouterD = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthWrapper children={<App />}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default RouterD
// LoginLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/LoginLayout.css';

const LoginLayout = () => {
  return (
    <div className="login-layout">
      <div className="login-box">
        <h1 className="login-title">MediLab</h1>
        <p className="login-subtitle">Employee Internal Dashboard</p>
            <Outlet /> 
      </div>
    </div>
  );
};

export default LoginLayout;
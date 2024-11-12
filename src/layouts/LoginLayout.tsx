import { Outlet } from 'react-router-dom';
import '../styles/LoginLayout.css';

const LoginLayout = () => {
  return (
    <div className="login-layout">
      <div className="login-box">
        <h1 className="login-title">ADC</h1>
        <p className="login-subtitle">Usuario Enterno</p>
            <Outlet /> 
      </div>
    </div>
  );
};

export default LoginLayout;
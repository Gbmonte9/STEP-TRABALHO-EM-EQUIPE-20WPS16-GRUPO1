import { Outlet } from 'react-router-dom';
import '../styles/CadastroLayout.css';

const CadastroLayout = () => {
  return (
    <div className="cadastro-layout">
      <div className="cadastro-box">
        <h1 className="cadastro-title">Adc</h1>
        <p className="cadastro-subtitle">Cadastro de Conta</p>
            <Outlet />
      </div>
    </div>
  );
};

export default CadastroLayout;
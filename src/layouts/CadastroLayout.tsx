import { Outlet } from 'react-router-dom';
import '../styles/CadastroLayout.css';

const CadastroLayout = () => {
  return (
    <div className="cadastro-layout">
      <div className="cadastro-box">
        <h1 className="cadastro-title">MediLab</h1>
        <p className="cadastro-subtitle">Cadastro de Funcionário</p>
            <Outlet />
      </div>
    </div>
  );
};

export default CadastroLayout;
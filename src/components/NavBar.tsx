import React from "react"; 
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Meu App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro">Cadastro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fontes-renda">Fontes de Renda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carteira">Carteira</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/despesa">Despesas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/relatorio">Relatórios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/perfil-configuracoes">Configurações de Perfil</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
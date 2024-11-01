import { createBrowserRouter } from "react-router-dom";
import Root from "./root"; 
import ErrorPage from "./error-page"; 
import Login from "../pages/Login.tsx"; 
import Cadastro from "../pages/Cadastro.tsx"; 
import Dashboard from "../pages/Dashboard.tsx"; 
import FontesRenda from "../pages/FontesRenda.tsx";
import Carteira from "../pages/Carteira.tsx"; 
import Despesa from "../pages/Despesa.tsx"; 
import Relatorio from "../pages/Relatorio.tsx"; 
import PerfilConfiguracoes from "../pages/PerfilConfiguracoes.tsx"; 

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Root />, 
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Dashboard /> }, 
      { path: "login", element: <Login /> }, 
      { path: "cadastro", element: <Cadastro /> }, 
      { path: "fontes-renda", element: <FontesRenda /> }, 
      { path: "carteira", element: <Carteira /> }, 
      { path: "despesa", element: <Despesa /> }, 
      { path: "relatorio", element: <Relatorio /> }, 
      { path: "perfil-configuracoes", element: <PerfilConfiguracoes /> }, 
    ],
  },

]);

export default router;
// router.tsx
import { createBrowserRouter } from "react-router-dom";
import { Root, LoginLayout, CadastroLayout } from "../layouts";
import { 
  Dashboard, FontesRenda, Carteira, Despesa, Relatorio, 
  PerfilConfiguracoes, Login, Cadastro 
} from "../pages";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/cadastro",
    element: <CadastroLayout />,
    children: [{ path: "/cadastro", element: <Cadastro /> }],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "fontes-renda", element: <FontesRenda /> },
      { path: "carteira", element: <Carteira /> },
      { path: "despesa", element: <Despesa /> },
      { path: "relatorio", element: <Relatorio /> },
      { path: "perfil-configuracoes", element: <PerfilConfiguracoes /> },
    ],
  },
]);

export default router;
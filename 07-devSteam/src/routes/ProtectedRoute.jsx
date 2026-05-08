import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly }) {
  const { user } = useContext(AuthContext);

  // Se não estiver logado, manda para a tela de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se a rota é só para admin e o usuário não for admin, manda para home
  if (adminOnly && user.tipo !== "ADMIN") {
    return <Navigate to="/" />;
  }

  // Se estiver autorizado, retorna o conteúdo da rota
  return children;
}

export default ProtectedRoute;

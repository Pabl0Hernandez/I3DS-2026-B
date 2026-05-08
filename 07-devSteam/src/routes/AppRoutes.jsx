import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login.jsx";
import Perfil from "../pages/Perfil/Perfil.jsx";
import Carrinho from "../pages/Carrinho/Carrinho.jsx";
import Pagamento from "../pages/Pagamento/Pagamento.jsx";
import Dashboard from "../pages/DashBoard/DashBoard.jsx";
import Games from "../pages/Games/Games.jsx";
import Categorias from "../pages/Categorias/Categorias.jsx";
import Cupons from "../pages/Cupons/Cupons.jsx";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({ cart, addToCart, removeFromCart, games }) {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              games={games}
            />
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* PERFIL */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />

        {/* CARRINHO */}
        <Route
          path="/carrinho"
          element={
            <ProtectedRoute>
              <Carrinho cart={cart} removeFromCart={removeFromCart} />
            </ProtectedRoute>
          }
        />

        {/* PAGAMENTO */}
        <Route
          path="/pagamento"
          element={
            <ProtectedRoute>
              <Pagamento cart={cart} />
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* GAMES */}
        <Route
          path="/games"
          element={
            <ProtectedRoute adminOnly={true}>
              <Games />
            </ProtectedRoute>
          }
        />

        {/* CATEGORIAS */}
        <Route
          path="/categorias"
          element={
            <ProtectedRoute adminOnly={true}>
              <Categorias />
            </ProtectedRoute>
          }
        />

        {/* CUPONS */}
        <Route
          path="/cupons"
          element={
            <ProtectedRoute adminOnly={true}>
              <Cupons />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

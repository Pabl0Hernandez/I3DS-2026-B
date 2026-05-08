import "./Navbar.css";

import Logo from "../../assets/Logo.png";
import Carrinho from "../../assets/Carrinho.png";
import { AuthContext } from "../../context/AuthContext";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({ cart, removeFromCart }) {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, switchUser } = useContext(AuthContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <header>

      <div className="logo">
        <img src={Logo} alt="" />
        <h1>DevSteam</h1>
      </div>

      <input type="text" placeholder="Buscar" />

      <div className="cart-area">

        <img
          src={Carrinho}
          alt=""
          className="cart-icon"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="dropdown">

            {cart.map((item, index) => (
              <div className="item" key={index}>
                <img src={item.image} alt="" />
                <div>
                  <h4>{item.title}</h4>
                  <span>R${item.price.toFixed(2)}</span>
                  <p className="quantity">x{item.quantity}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>REMOVER</button>
                </div>
              </div>
            ))}

            <div className="total">
              <h3>Total</h3>
              <h2>R${total.toFixed(2)}</h2>
            </div>

            <button
              className="finish"
              onClick={() => {
                alert('Compra finalizada com sucesso!');
                navigate('/pagamento');
              }}
            >
              FINALIZAR COMPRA
            </button>

          </div>
        )}

      </div>

      {/* NOVO: usuário logado no topo */}
      {user && (
        <div className="user-info">
          <span>{user.tipo === "ADMIN" ? "👑" : "👤"} {user.nome}</span>
          <button onClick={switchUser}>Trocar Conta</button>
          <button onClick={logout}>Sair</button>
        </div>
      )}

    </header>
  );
}

export default NavBar;
import "./Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mode, setMode] = useState("CLIENTE");

  const users = [
    { username: "adm@gmail.com", password: "0", role: "ADMIN" },
    { username: "teste@gmail.com", password: "1", role: "CLIENTE" },
  ];

  function handleLogin(e) {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === email && u.password === senha && u.role === mode,
    );

    if (user) {
      login(user);

      if (user.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      alert(
        `Credenciais inválidas para ${mode === "ADMIN" ? "administrador" : "usuário"}.`,
      );
    }
  }

  return (
    <div className="login-page">
      <div className="login-type">
        <button
          className={mode === "CLIENTE" ? "active" : ""}
          type="button"
          onClick={() => setMode("CLIENTE")}
        >
          Login Usuário
        </button>
        <button
          className={mode === "ADMIN" ? "active admin" : "admin"}
          type="button"
          onClick={() => setMode("ADMIN")}
        >
          Login Administrador
        </button>
      </div>

      <div className="login-box">
        <h1>{mode === "ADMIN" ? "LOGIN ADMIN" : "LOGIN CLIENTE"}</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">ENTRAR</button>
        </form>

        <div className="help-text">
          {mode === "ADMIN" ? (
            <p>Use adm@gmail.com / 0 para acessar o painel de administração.</p>
          ) : (
            <p>Use teste@gmail.com / 1 para acessar como cliente.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

import "./Perfil.css";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { userAPI } from "../../Services/api";

function Perfil() {
  const { user, login } = useContext(AuthContext);

  // Estados de dados
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    estado: "",
    biografia: "",
  });

  // Estados de edição
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });

  // Estados de UI
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Buscar dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Se temos um ID de usuário no contexto, buscamos da API
        if (user?.id) {
          const data = await userAPI.getProfile(user.id);
          setUserData(data);
          setFormData(data);
        } else if (user?.email) {
          // Alternativa: buscar por email
          const data = await userAPI.getUserByEmail(user.email);
          setUserData(data);
          setFormData(data);
        } else {
          // Se não houver dados, usar o que está no contexto
          setUserData({
            nome: user?.nome || "",
            email: user?.email || "",
            telefone: "",
            cidade: "",
            estado: "",
            biografia: "",
          });
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        // Não exibir erro se for apenas uma falha de conexão
        setUserData({
          nome: user?.nome || "",
          email: user?.email || "",
          telefone: "",
          cidade: "",
          estado: "",
          biografia: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Atualizar campo do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Iniciar edição
  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ ...userData });
    setError(null);
  };

  // Cancelar edição
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...userData });
    setError(null);
  };

  // Validar formulário
  const validateForm = () => {
    if (!formData.nome || formData.nome.trim() === "") {
      setError("Nome é obrigatório");
      return false;
    }
    if (!formData.email || formData.email.trim() === "") {
      setError("Email é obrigatório");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email inválido");
      return false;
    }
    return true;
  };

  // Salvar alterações
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      // Atualizar na API
      if (user?.id) {
        await userAPI.updateProfile(user.id, formData);
      }

      // Atualizar no contexto
      const updatedUser = {
        ...user,
        ...formData,
      };
      login(updatedUser);

      setUserData(formData);
      setIsEditing(false);
      setSuccess("Perfil atualizado com sucesso!");

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(err.message || "Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="perfil-page">
        <div className="perfil-container">
          <div className="loading">Carregando perfil...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        <div className="perfil-header">
          <h1>Meu Perfil</h1>
          <p className="perfil-subtitle">Gerenciar informações da conta</p>
        </div>

        {/* Mensagens de erro e sucesso */}
        {error && (
          <div className="alert alert-error">
            <span>❌</span> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>✓</span> {success}
          </div>
        )}

        {/* Formulário */}
        <div className="perfil-form">
          <div className="form-section">
            <h2>Informações Básicas</h2>

            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
                placeholder="Digite seu nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
                placeholder="Digite seu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                id="telefone"
                type="tel"
                name="telefone"
                value={formData.telefone || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Localização</h2>

            <div className="form-group">
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                type="text"
                name="cidade"
                value={formData.cidade || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
                placeholder="Digite sua cidade"
              />
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado</label>
              <input
                id="estado"
                type="text"
                name="estado"
                value={formData.estado || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
                placeholder="Digite seu estado"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Sobre você</h2>

            <div className="form-group">
              <label htmlFor="biografia">Biografia</label>
              <textarea
                id="biografia"
                name="biografia"
                value={formData.biografia || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
                placeholder="Conte um pouco sobre você"
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="perfil-actions">
          {!isEditing ? (
            <button onClick={handleEditClick} className="btn btn-primary">
              ✏️ Editar Perfil
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn btn-success"
              >
                {saving ? "Salvando..." : "💾 Salvar Alterações"}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="btn btn-secondary"
              >
                ✕ Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Perfil from "./Perfil";
import { AuthContext } from "../../context/AuthContext";
import * as api from "../../Services/api";

// Mock do serviço API
jest.mock("../../Services/api");

// Mock do contexto de autenticação
const mockAuthContext = {
  user: {
    id: "1",
    nome: "João Silva",
    email: "joao@example.com",
  },
  login: jest.fn(),
  logout: jest.fn(),
  switchUser: jest.fn(),
};

// Dados mock do perfil
const mockProfileData = {
  id: "1",
  nome: "João Silva",
  email: "joao@example.com",
  telefone: "(11) 98765-4321",
  cidade: "São Paulo",
  estado: "SP",
  biografia: "Desenvolvedor full-stack",
};

const renderWithAuth = (component, authValue = mockAuthContext) => {
  return render(
    <AuthContext.Provider value={authValue}>{component}</AuthContext.Provider>,
  );
};

describe("Componente Perfil", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.userAPI.getProfile.mockResolvedValue(mockProfileData);
    api.userAPI.updateProfile.mockResolvedValue(mockProfileData);
  });

  test("renderiza o componente com loader inicial", () => {
    renderWithAuth(<Perfil />);
    expect(screen.getByText("Carregando perfil...")).toBeInTheDocument();
  });

  test("carrega e exibe dados do usuário da API", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    expect(api.userAPI.getProfile).toHaveBeenCalledWith("1");
  });

  test("exibe alertas de erro quando API falha", async () => {
    api.userAPI.getProfile.mockRejectedValue(new Error("Erro na API"));

    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(
        screen.queryByText("Carregando perfil..."),
      ).not.toBeInTheDocument();
    });
  });

  test("muda para modo de edição ao clicar em Editar", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    const editButton = screen.getByRole("button", { name: /Editar Perfil/i });
    fireEvent.click(editButton);

    const nomeInput = screen.getByDisplayValue("João Silva");
    expect(nomeInput).not.toBeDisabled();
  });

  test("atualiza estado do formulário ao modificar campos", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const nomeInput = screen.getByDisplayValue("João Silva");
    await userEvent.clear(nomeInput);
    await userEvent.type(nomeInput, "Maria Silva");

    expect(nomeInput).toHaveValue("Maria Silva");
  });

  test("valida campo de nome obrigatório", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const nomeInput = screen.getByDisplayValue("João Silva");
    await userEvent.clear(nomeInput);

    fireEvent.click(screen.getByRole("button", { name: /Salvar Alterações/i }));

    await waitFor(() => {
      expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
    });
  });

  test("valida formato de email", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("joao@example.com")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const emailInput = screen.getByDisplayValue("joao@example.com");
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "email-invalido");

    fireEvent.click(screen.getByRole("button", { name: /Salvar Alterações/i }));

    await waitFor(() => {
      expect(screen.getByText("Email inválido")).toBeInTheDocument();
    });
  });

  test("salva alterações na API e exibe sucesso", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const nomeInput = screen.getByDisplayValue("João Silva");
    await userEvent.clear(nomeInput);
    await userEvent.type(nomeInput, "João Silva Junior");

    fireEvent.click(screen.getByRole("button", { name: /Salvar Alterações/i }));

    await waitFor(() => {
      expect(api.userAPI.updateProfile).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          nome: "João Silva Junior",
        }),
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Perfil atualizado com sucesso!/i),
      ).toBeInTheDocument();
    });
  });

  test("cancela edição sem salvar", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const nomeInput = screen.getByDisplayValue("João Silva");
    await userEvent.clear(nomeInput);
    await userEvent.type(nomeInput, "Novo Nome");

    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    expect(api.userAPI.updateProfile).not.toHaveBeenCalled();
  });

  test("atualiza contexto de autenticação após salvar", async () => {
    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const nomeInput = screen.getByDisplayValue("João Silva");
    await userEvent.clear(nomeInput);
    await userEvent.type(nomeInput, "João Silva Junior");

    fireEvent.click(screen.getByRole("button", { name: /Salvar Alterações/i }));

    await waitFor(() => {
      expect(mockAuthContext.login).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "João Silva Junior",
        }),
      );
    });
  });

  test("desabilita botões durante salvamento", async () => {
    api.userAPI.updateProfile.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockProfileData), 1000),
        ),
    );

    renderWithAuth(<Perfil />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("João Silva")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Editar Perfil/i }));

    const nomeInput = screen.getByDisplayValue("João Silva");
    await userEvent.clear(nomeInput);
    await userEvent.type(nomeInput, "Novo Nome");

    const saveButton = screen.getByRole("button", {
      name: /Salvar Alterações/i,
    });
    fireEvent.click(saveButton);

    expect(saveButton).toBeDisabled();
  });
});

// ================================
// SERVIDOR DE CHAT EM TEMPO REAL
// ===============================
// Este servidor gerencia as conexoes de usuarios e distribui mensagens
// Tecnologias:
// - Express: Framework web para HTTP
// - Socket.io: Comunicaçao bidirecional em tempo real via WebSocket

const { Socket } = require("socket.io");

const app = require("express")(); // Importa a biblioteca Express
const server = require("http").createServer(app); // Importa modulo HTTP nativo do Node.js (necessário para o Socket.io)
const io = require("socket.io")(server, {
  // Importa Socket.io e configura para o servidor HTTP
  // CORS (Cross-Origin Resource Sharing): permite que clientes de outros domínios/IPs se conectem
  // Altere o IP para o IP da máquina onde o servidor está rodando
  cors: { origin: "http://localhost:3000" },
  // Ex: "http://localhost:5173" para desenvolvimento local
  // Ex:"http://seu.ip.aqui:5173" para rede
});

const PORT = 3001; // Portal na qual o servidor irá escutar conexões

//===============================================
// EVENT LISTENER: Quando um cliente se conecta
//================================================
io.on("connection", (Socket) => {
  // "Socket" representa a conexão de um unico cliente
  // Cada cliente que se conecta recebe um novo objeto "Socket"
  // socket.id: ID unico do cliente (gerado automaticamente)
  // socket.data: Objeto para armazenar dados do cliente (username, etc)

  //=================================
  // EVENTO: Usuario define seu nome
  //=================================
  Socket.on("set_username", (username) => {
    // Armazena o nome de usuario no objeto socket para uso posterior
    Socket.data.username = username;
    // Registra no console que um usuario conectou
    userName(username, Socket.id);
  });

  //===========================
  // EVENTI: Usuario desconecta
  //===========================
  Socket.on("disconnect", (reason) => {
    // Registra informaçao sobre desconexao
    console.log(
      `Usuario ${Socket.data.username} desconectado! Sua ID era ${Socket.id}`,
    );
    // Motivo da desconexao. Motivos comuns: "client namespace disconnect", "client left", etc
    console.log(`Motivo: ${reason}`);
  });

  //==================================
  // EVENTO: Servidor recebe mensagem
  //==================================

  Socket.on("message", (text) => {
    // Quando um cliente envia uma mensagem, o servidor:
    // 1. Cria um objeto com dados da mensagem
    // 2. Envia para TODOS os clientes conectados usando io.emit()
    // Isso permite que todos vejam a mensagem em tempo real
    io.emit("receive_message", {
      text,
      authorId: Socket.id,
      author: Socket.data.username,
    });
    console.log(`Usuario ${Socket.data.username} enviu uma mensagem!`);
  });
});

// Registra no console quando um novo usuario se conecta
const userName = (username, id) => {
  console.log(`Usuario ${username} conenctado com o seguinte id: ${id}`);
};

//======================
// INICIAR O SERVIDOR
//=====================
server.listen(PORT, () => {
  console.log(`Servidor esta rodando na porta ${PORT}...`);
  console.log(`Cliente deve conectar em http://seu-ip:${PORT}`);
});

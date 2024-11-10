import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

let usuarios: Usuario[] = [];
let nextId = 1; // Agora você mantém o nextId para quando for necessário

const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  
  res.setHeader('Content-Type', 'application/json');
  
  if (method === 'GET' && url === '/usuarios') {

    res.statusCode = 200;
    res.end(JSON.stringify(usuarios));

  } else if (method === 'GET' && url?.startsWith('/usuarios/')) {
    
    const id = parseInt(url.split('/')[2], 10); 
    const usuario = usuarios.find((u) => u.id === id);

    if (usuario) {
      res.statusCode = 200;
      res.end(JSON.stringify(usuario));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Usuário não encontrado' }));
    }
  } else if (method === 'POST' && url === '/usuarios') {

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const usuarioData = JSON.parse(body);
      
      // Atribui o id manualmente, caso você tenha um método para gerenciar o ID
      const novoUsuario: Usuario = {
        id: nextId++, // Aqui você continua usando nextId para gerar o ID, se necessário
        ...usuarioData,
      };

      usuarios.push(novoUsuario);  
      res.statusCode = 201;
      res.end(JSON.stringify(novoUsuario));
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
  }
};

const server = http.createServer(requestHandler);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
};

type Carteira = {
  id: number;
  nome: string;
  moeda: string;
  saldo: number;
  usuarioId: number;
};

let usuarios: Usuario[] = [];
let carteiras: Carteira[] = [];
let nextId = 1; 
let nextCarteiraId = 1; 

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
      const novoUsuario: Usuario = {
        id: nextId++, 
        ...usuarioData,
      };
      usuarios.push(novoUsuario);
      res.statusCode = 201;
      res.end(JSON.stringify(novoUsuario));
    });

  } else if (method === 'GET' && url === '/carteiras') {
    res.statusCode = 200;
    res.end(JSON.stringify(carteiras));

  } else if (method === 'GET' && url?.startsWith('/carteiras/')) {
    const id = parseInt(url.split('/')[2], 10);
    const carteira = carteiras.find((c) => c.id === id);

    if (carteira) {
      res.statusCode = 200;
      res.end(JSON.stringify(carteira));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Carteira não encontrada' }));
    }

  } else if (method === 'POST' && url === '/carteiras') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const carteiraData = JSON.parse(body);
      const novaCarteira: Carteira = {
        id: nextCarteiraId++,
        ...carteiraData,
      };
      carteiras.push(novaCarteira);
      res.statusCode = 201;
      res.end(JSON.stringify(novaCarteira));
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
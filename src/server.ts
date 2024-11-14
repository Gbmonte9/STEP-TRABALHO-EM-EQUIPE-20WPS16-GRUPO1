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

  } else if (method === 'DELETE' && url?.startsWith('/usuarios/')) {
    const id = parseInt(url.split('/')[2], 10);
    const usuarioIndex = usuarios.findIndex((u) => u.id === id);

    if (usuarioIndex !== -1) {
      usuarios.splice(usuarioIndex, 1); 
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Usuário excluído com sucesso' }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Usuário não encontrado' }));
    }

  } else if (method === 'GET' && url === '/carteira') {
    res.statusCode = 200;
    res.end(JSON.stringify(carteiras));

  } else if (method === 'GET' && url?.startsWith('/carteira/')) {
    const id = parseInt(url.split('/')[2], 10);
    const carteira = carteiras.find((c) => c.id === id);

    if (carteira) {
      res.statusCode = 200;
      res.end(JSON.stringify(carteira));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Carteira não encontrada' }));
    }

  } else if (method === 'POST' && url === '/carteira') {
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

  } else if (method === 'DELETE' && url?.startsWith('/carteira/')) {
    const id = parseInt(url.split('/')[2], 10);
    const index = carteiras.findIndex((c) => c.id === id);
  
    if (index !== -1) {
      carteiras.splice(index, 1); // Remove a carteira do array
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Carteira removida com sucesso' }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Carteira não encontrada' }));
    }
  }

  else if (method === 'PUT' && url?.startsWith('/carteira/')) {
    const id = parseInt(url.split('/')[2], 10);
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        const carteiraData = JSON.parse(body);
        const index = carteiras.findIndex((c) => c.id === id);

        if (index !== -1) {
            // Atualiza os dados da carteira com base no ID
            carteiras[index] = {
                id,
                ...carteiraData,
            };

            res.statusCode = 200;
            res.end(JSON.stringify(carteiras[index])); // Retorna a carteira atualizada
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Carteira não encontrada' }));
        }
    });
}

};

const server = http.createServer(requestHandler);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
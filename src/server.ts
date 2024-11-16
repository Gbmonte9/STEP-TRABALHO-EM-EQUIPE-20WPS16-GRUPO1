import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url'; 

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

type FonteDeRenda = {
  id: number;
  nome: string;
  categoria: string;
  valor: number;
  data: Date;
  usuarioId: number;
};

type Despesa = {
  id: number;
  nome: string;
  categoria: string;
  valor: number;
  data: Date;
  usuarioId: number;
};

let usuarios: Usuario[] = [];
let carteiras: Carteira[] = [];
let fontesDeRenda: FonteDeRenda[] = [];
let despesas: Despesa[] = [];
let nextId = 1;
let nextCarteiraId = 1;
let nextFonteDeRendaId = 1;
let nextDespesaId = 1;

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
      carteiras.splice(index, 1); 
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
            
            carteiras[index] = {
                id,
                ...carteiraData,
            };

            res.statusCode = 200;
            res.end(JSON.stringify(carteiras[index])); 
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Carteira não encontrada' }));
        }
    });
}

else if (method === 'GET' && url === '/despesa') {
  const requestUrl = req.url ? `http://${req.headers.host}${req.url}` : '';
  const parsedUrl = new URL(requestUrl);

  const usuarioIdString = parsedUrl.searchParams.get('usuarioId');

  let despesasFiltradas = despesas;

  if (usuarioIdString) {
    despesasFiltradas = despesasFiltradas.filter(d => String(d.usuarioId) === usuarioIdString);
  }

  res.statusCode = 200;
  res.end(JSON.stringify(despesasFiltradas)); 
} 

else if (method === 'GET' && url?.startsWith('/despesa/')) {
  const id = parseInt(url.split('/')[2], 10);
  const despesa = despesas.find((d) => d.id === id);

  if (despesa) {
    res.statusCode = 200;
    res.end(JSON.stringify(despesa));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Despesa não encontrada' }));
  }
} 

else if (method === 'GET' && url?.startsWith('/despesa/')) {
  const usuarioIdString = url.split('/')[2]; 
  const usuarioId = parseInt(usuarioIdString, 10);

  if (isNaN(usuarioId)) {
      res.statusCode = 400;  
      res.end(JSON.stringify({ message: 'usuarioId inválido' }));
      return;
  }

  const despesasFiltradas = despesas.filter(d => d.usuarioId === usuarioId);

  if (despesasFiltradas.length > 0) {
      res.statusCode = 200;
      res.end(JSON.stringify(despesasFiltradas)); 
  } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Despesas não encontradas para o usuário' }));
  }
}

else if (method === 'POST' && url === '/despesa') {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const despesaData = JSON.parse(body);
    const novaDespesa = {
      id: nextDespesaId++, 
      ...despesaData,
      data: new Date(despesaData.data), 
    };
    despesas.push(novaDespesa); 
    res.statusCode = 201;
    res.end(JSON.stringify(novaDespesa));
  });
} 

else if (method === 'PUT' && url?.startsWith('/despesa/')) {
  const id = parseInt(url.split('/')[2], 10);
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const despesaData = JSON.parse(body);
    const index = despesas.findIndex((d) => d.id === id);

    if (index !== -1) {
      
      despesas[index] = {
        id,
        ...despesaData,
        data: new Date(despesaData.data), 
      };

      res.statusCode = 200;
      res.end(JSON.stringify(despesas[index])); 
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Despesa não encontrada' }));
    }
  });
} 

else if (method === 'DELETE' && url?.startsWith('/despesa/')) {
  const id = parseInt(url.split('/')[2], 10);
  const index = despesas.findIndex((d) => d.id === id);

  if (index !== -1) {
    despesas.splice(index, 1); 
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Despesa removida com sucesso' })); 
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Despesa não encontrada' })); 
  }
}

else if (method === 'GET' && url === '/renda') {
  res.statusCode = 200;
  res.end(JSON.stringify(fontesDeRenda)); 
} else if (method === 'GET' && url?.startsWith('/renda/')) {
  const id = parseInt(url.split('/')[2], 10);
  const fonteDeRenda = fontesDeRenda.find((f) => f.id === id);

  if (fonteDeRenda) {
    res.statusCode = 200;
    res.end(JSON.stringify(fonteDeRenda)); 
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Fonte de Renda não encontrada' }));
  }

} else if (method === 'POST' && url === '/renda') {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const fonteDeRendaData = JSON.parse(body);
    const novaFonteDeRenda = {
      id: nextFonteDeRendaId++, 
      ...fonteDeRendaData,
    };
    fontesDeRenda.push(novaFonteDeRenda);
    res.statusCode = 201;
    res.end(JSON.stringify(novaFonteDeRenda)); 
  });

} else if (method === 'PUT' && url?.startsWith('/renda/')) {
  const id = parseInt(url.split('/')[2], 10);
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const fonteDeRendaData = JSON.parse(body);
    const index = fontesDeRenda.findIndex((f) => f.id === id);

    if (index !== -1) {
      fontesDeRenda[index] = {
        id,
        ...fonteDeRendaData,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(fontesDeRenda[index])); 
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Fonte de Renda não encontrada' }));
    }
  });

} else if (method === 'DELETE' && url?.startsWith('/renda/')) {
  const id = parseInt(url.split('/')[2], 10);
  const index = fontesDeRenda.findIndex((f) => f.id === id);

  if (index !== -1) {
    fontesDeRenda.splice(index, 1); 
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Fonte de Renda removida com sucesso' })); 
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Fonte de Renda não encontrada' }));
  }
}

};

const server = http.createServer(requestHandler);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
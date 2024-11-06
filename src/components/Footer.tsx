import React from 'react';

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();  

  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {currentYear} Step Grupo. Todos os direitos reservados.</p>
        <p className="mb-0">Desenvolvido com ❤️ por Você</p>
      </div>
    </footer>
  );
};

export default Footer;
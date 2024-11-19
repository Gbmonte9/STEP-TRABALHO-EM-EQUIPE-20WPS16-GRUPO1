import React from 'react';
import '../styles/Footer.css'; 

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerContainer">
        <p className="footerText">&copy; {currentYear} Step Grupo. Todos os direitos reservados.</p>
        <p className="footerText">
          Desenvolvido com <span className="footerHeart">❤️</span> por Você
        </p>
      </div>
    </footer>
  );
};

export default Footer;
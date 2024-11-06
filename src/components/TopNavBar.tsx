import img from '../assets/usuario.png';

const TopNavBar = () => {
    return (
      <nav className="navbar p-3 shadow-sm" style={{ backgroundColor: '#f8f9fa', marginLeft: '180px', width: 'calc(100% - 180px)', position: 'absolute', left: 0 }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-end w-100">
            <span className="me-2">Usuario</span>
            <img src={img} alt="Profile" className="rounded-circle" width="40" height="40" />
          </div>
        </div>
      </nav>
    );
  };

export default TopNavBar;
import Sidebar from '../components/Sidebar.tsx';
import TopNavBar from '../components/TopNavBar.tsx';
import Footer from '../components/Footer.tsx';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className="app-root" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        
        <div className="content" style={{ flex: 1, marginLeft: '180px', display: 'flex', flexDirection: 'column' }}>
          <TopNavBar />
          
          <main style={{ flex: 1, padding: '1rem', marginTop: '20px' }}>
            <Outlet />
          </main>
        </div>
        
      </div>
      <Footer />

    </div>
  );
}

export default Root;

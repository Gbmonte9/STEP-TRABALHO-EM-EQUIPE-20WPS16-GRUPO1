import React from 'react';
import Sidebar from '../components/Sidebar.tsx';
import TopNavBar from '../components/TopNavBar.tsx';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className="app-root" style={{ display: 'flex', minHeight: '100vh'}}>
      <Sidebar />
      
      <div className="content" style={{ flex: 1, marginLeft: '180px', display: 'flex', flexDirection: 'column' }}>
        <TopNavBar />
        
        <main style={{ flex: 1, padding: '1rem', marginTop: '20px' }}> 
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
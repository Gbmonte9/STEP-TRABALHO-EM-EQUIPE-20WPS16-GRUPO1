import React from 'react';
import Sidebar from '../components/Sidebar.tsx';
import TopNavBar from '../components/TopNavBar.tsx';
import { Outlet } from 'react-router-dom';

function Root(){
  return (
    <div className="app-root" style={{ display: 'flex', minHeight: '100vh' }}>
      
      <Sidebar />

      <div className="content" style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
    
        <TopNavBar />

        <main className="p-4" style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
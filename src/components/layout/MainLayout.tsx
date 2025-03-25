
import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <main className={`flex-1 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${sidebarCollapsed ? 'mr-20' : 'mr-64'}`}>
        {children}
      </main>
      
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
    </div>
  );
};

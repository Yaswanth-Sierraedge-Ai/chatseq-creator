
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
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ease-in-out overflow-auto ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

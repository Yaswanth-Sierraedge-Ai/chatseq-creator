
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
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-background/80">
      {/* Background design elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ease-in-out overflow-hidden ${sidebarCollapsed ? 'mr-16' : 'mr-72'}`}>
        {children}
      </main>
      
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
    </div>
  );
};

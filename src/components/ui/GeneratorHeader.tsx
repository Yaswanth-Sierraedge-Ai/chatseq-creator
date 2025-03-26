
import React from 'react';
import { Sparkles, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const GeneratorHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSettingsClick = () => {
    navigate('/settings');
  };
  
  return (
    <div className="z-10 bg-white shadow-sm px-6 py-4 sticky top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-medium flex items-center gap-2">
          <span className="bg-[#0084D6]/10 text-[#0084D6] p-1.5 rounded-md">
            <Sparkles size={20} />
          </span>
          <span className="text-black">
            Test Sequence Generator
          </span>
        </h1>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleSettingsClick}
          className="rounded-full hover:bg-[#0084D6]/10"
        >
          <Settings size={20} className="text-[#0084D6]" />
        </Button>
      </div>
    </div>
  );
};

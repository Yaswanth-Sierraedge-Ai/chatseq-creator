
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save, Share } from 'lucide-react';

export const GeneratorHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-border">
      <h1 className="text-xl font-medium">Test Sequence Generator</h1>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Save size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Download size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Share size={18} />
        </Button>
      </div>
    </div>
  );
};

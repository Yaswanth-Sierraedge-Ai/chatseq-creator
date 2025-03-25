
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save, Share, Bot } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const GeneratorHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-border/40 bg-background/50 backdrop-blur-sm">
      <h1 className="text-xl font-medium flex items-center gap-2">
        <span className="bg-primary/10 text-primary p-1 rounded-md">
          <Bot size={20} />
        </span>
        <span>Test Sequence Generator</span>
      </h1>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Save size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save sequence</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Download size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download sequence</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Share size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share sequence</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

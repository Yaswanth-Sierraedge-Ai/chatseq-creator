
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Save, Share, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const GeneratorHeader: React.FC = () => {
  return (
    <div className="z-10 backdrop-blur-md bg-background/30 border-b border-white/5 px-6 py-4 sticky top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-medium flex items-center gap-2">
          <span className="bg-primary/10 text-primary p-1.5 rounded-md">
            <Sparkles size={20} className="animate-pulse" />
          </span>
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Test Sequence Generator
          </span>
        </h1>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <Save size={18} className="text-primary/80 hover:text-primary transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save sequence</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <Download size={18} className="text-primary/80 hover:text-primary transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download sequence</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  <Share size={18} className="text-primary/80 hover:text-primary transition-colors" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share sequence</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

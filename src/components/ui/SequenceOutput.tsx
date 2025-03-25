
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SequenceOutputProps {
  content: string;
}

export const SequenceOutput: React.FC<SequenceOutputProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (!content) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p>No output generated yet</p>
          <p className="text-sm mt-1">Enter a prompt to generate a test sequence</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative h-full">
      <pre className="overflow-auto p-6 rounded-md bg-secondary/50 h-full text-sm relative">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className={cn(
              "transition-all",
              copied ? "text-green-500" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {copied ? <Check size={16} /> : <Clipboard size={16} />}
          </Button>
        </div>
        <code className="whitespace-pre-wrap">{content}</code>
      </pre>
    </div>
  );
};


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
    return null;
  }
  
  return (
    <div className="relative h-full">
      <pre className="overflow-auto p-4 rounded-md bg-secondary/50 h-full text-sm relative">
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            className={cn(
              "h-6 w-6 transition-all",
              copied ? "text-green-500" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {copied ? <Check size={14} /> : <Clipboard size={14} />}
          </Button>
        </div>
        <code className="whitespace-pre-wrap text-xs">{content}</code>
      </pre>
    </div>
  );
};

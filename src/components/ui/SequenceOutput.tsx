
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clipboard, Check, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SequenceOutputProps {
  content: string;
}

export const SequenceOutput: React.FC<SequenceOutputProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (!content) {
    return null;
  }
  
  return (
    <div className="relative h-full rounded-lg overflow-hidden border border-border/30 shadow-sm bg-background/30 backdrop-blur-sm">
      <div className="flex items-center justify-between bg-secondary/50 px-3 py-2 border-b border-border/30">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Code size={14} />
          <span>Generated Code</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className={cn(
            "h-7 w-7 transition-all",
            copied ? "text-green-500" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
        </Button>
      </div>
      <pre className="overflow-auto p-4 text-sm max-h-[calc(100vh-10rem)]">
        <code className="whitespace-pre-wrap text-xs font-mono">{content}</code>
      </pre>
    </div>
  );
};


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
    <div className="relative h-full rounded-xl overflow-hidden border border-black bg-white">
      <div className="flex items-center justify-between bg-[#91C8E4]/10 px-3 py-2 border-b border-black">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Code size={14} className="text-[#91C8E4]" />
          <span className="text-black">Generated Code</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className={cn(
            "h-7 w-7 transition-all rounded-full",
            copied ? "text-green-500 bg-green-500/10" : "text-muted-foreground hover:text-black hover:bg-[#91C8E4]/10"
          )}
        >
          {copied ? <Check size={14} /> : <Clipboard size={14} />}
        </Button>
      </div>
      <pre className="overflow-auto p-4 text-sm max-h-[calc(100vh-10rem)]">
        <code className="whitespace-pre-wrap text-xs font-mono text-black">{content}</code>
      </pre>
    </div>
  );
};

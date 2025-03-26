
import React from 'react';
import { cn } from '@/lib/utils';

interface SequenceOutputProps {
  content: string;
  className?: string;
}

export const SequenceOutput: React.FC<SequenceOutputProps> = ({ 
  content,
  className
}) => {
  const formattedContent = React.useMemo(() => {
    // Check if the content is JSON, and pretty print if it is
    try {
      const jsonContent = JSON.parse(content);
      return JSON.stringify(jsonContent, null, 2);
    } catch (e) {
      // Not JSON, return as is
      return content;
    }
  }, [content]);
  
  return (
    <pre className={cn(
      "bg-white font-mono text-xs sm:text-sm overflow-auto rounded p-4 w-full h-full whitespace-pre-wrap",
      className
    )}>
      {formattedContent}
    </pre>
  );
};


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
      // Not JSON, try to detect if it contains JSON blocks
      try {
        // Look for JSON array in the string
        const jsonMatch = content.match(/\[\s*\{\s*"(Row|Cmd|CMD)":/);
        if (jsonMatch) {
          const startIndex = content.indexOf('[', jsonMatch.index);
          let depth = 0;
          let endIndex = -1;
          
          // Find matching closing bracket
          for (let i = startIndex; i < content.length; i++) {
            if (content[i] === '[') depth++;
            if (content[i] === ']') {
              depth--;
              if (depth === 0) {
                endIndex = i + 1;
                break;
              }
            }
          }
          
          if (endIndex > startIndex) {
            const jsonPart = content.substring(startIndex, endIndex);
            try {
              const parsedJson = JSON.parse(jsonPart);
              // Return the content with the formatted JSON
              return content.substring(0, startIndex) + 
                     JSON.stringify(parsedJson, null, 2) + 
                     content.substring(endIndex);
            } catch (e) {
              // If we can't parse the extracted JSON, fall back to the original content
              return content;
            }
          }
        }
        
        return content;
      } catch (e) {
        // If all parsing attempts fail, return the original content
        return content;
      }
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

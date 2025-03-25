
import React from 'react';
import { useSequenceStore } from '../../store/sequenceStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GeneratorHeader } from './GeneratorHeader';
import { SequenceOutput } from './SequenceOutput';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export const SequenceGenerator: React.FC = () => {
  const { currentSequence, updateSequence, addSequence } = useSequenceStore();
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      const generatedContent = generateTestSequence(prompt);
      
      if (currentSequence) {
        updateSequence(currentSequence.id, generatedContent);
      } else {
        addSequence(`Sequence ${new Date().toLocaleTimeString()}`, generatedContent);
      }
      
      setPrompt('');
      setIsGenerating(false);
      toast.success("Test sequence generated successfully");
    }, 1500);
  };
  
  // Mock generation function
  const generateTestSequence = (input: string): string => {
    const lines = [
      `// Test Sequence for: ${input}`,
      `// Generated on: ${new Date().toLocaleString()}`,
      '',
      'describe("Test Suite", () => {',
      '  beforeEach(() => {',
      '    // Setup code',
      '    console.log("Setting up test environment");',
      '  });',
      '',
      '  it("should validate the main functionality", () => {',
      '    // Arrange',
      '    const testData = {',
      '      input: "' + input.replace(/"/g, '\\"') + '",',
      '      expectedOutput: "success"',
      '    };',
      '',
      '    // Act',
      '    const result = processInput(testData.input);',
      '',
      '    // Assert',
      '    expect(result).toEqual(testData.expectedOutput);',
      '  });',
      '',
      '  it("should handle edge cases", () => {',
      '    // Additional test logic here',
      '    expect(true).toBeTruthy();',
      '  });',
      '',
      '  afterEach(() => {',
      '    // Cleanup code',
      '    console.log("Cleaning up after test");',
      '  });',
      '});',
    ];
    
    return lines.join('\n');
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header with sequence title and actions */}
      <GeneratorHeader />
      
      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Output area */}
        <div className="flex-1 p-6 overflow-auto">
          <SequenceOutput content={currentSequence?.content || ''} />
        </div>
        
        {/* Input area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2 items-start">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a description of the test sequence you want to generate..."
              className="resize-none min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  handleGenerate();
                }
              }}
            />
            <Button 
              className="shrink-0" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              <Send size={16} className="mr-2" />
              {isGenerating ? 'Generating...' : 'Generate'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-right">
            Press ⌘ + Enter to generate
          </p>
        </div>
      </div>
    </div>
  );
};

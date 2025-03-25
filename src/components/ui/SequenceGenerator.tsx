
import React from 'react';
import { useSequenceStore } from '../../store/sequenceStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GeneratorHeader } from './GeneratorHeader';
import { Send, User, Bot } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const SequenceGenerator: React.FC = () => {
  const { currentSequence, updateSequence, addSequence } = useSequenceStore();
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [conversation, setConversation] = React.useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const conversationRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    setConversation(prev => [...prev, { role: 'user', content: prompt }]);
    setIsGenerating(true);
    
    try {
      // Call the backend to generate the test sequence
      const response = await axios.post(`${API_URL}/generate`, { prompt: prompt.trim() });
      const generatedContent = response.data.generatedContent;
      
      if (currentSequence) {
        await updateSequence(currentSequence.id, generatedContent);
      } else {
        await addSequence(`Sequence ${new Date().toLocaleTimeString()}`, generatedContent);
      }
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: `I've generated a test sequence based on your request: "${prompt}". You can view the full code in the sidebar.` 
      }]);
      
      setPrompt('');
      toast.success("Test sequence generated successfully");
    } catch (error) {
      console.error("Error generating sequence:", error);
      toast.error("Failed to generate test sequence");
      
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, there was an error generating the test sequence. Please try again." 
      }]);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <GeneratorHeader />
      
      <div 
        ref={conversationRef}
        className="flex-1 p-6 overflow-auto"
      >
        {conversation.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center max-w-md">
              <h3 className="text-lg font-medium mb-2">Welcome to Test Sequence Generator</h3>
              <p className="text-sm">
                Enter a description of what kind of test sequence you want to generate in the input box below.
                The generated code will appear in the sidebar.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {conversation.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === 'user' ? 'bg-primary text-primary-foreground ml-2' : 'bg-muted mr-2'
                  }`}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`rounded-lg px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-border p-4 sticky bottom-0 bg-background">
        <div className="flex gap-2 items-start">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the test sequence you want to generate..."
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
  );
};

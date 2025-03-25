
import React from 'react';
import { useSequenceStore } from '../../store/sequenceStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GeneratorHeader } from './GeneratorHeader';
import { Send, User, Bot, Loader } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      handleGenerate();
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-background/50">
      <GeneratorHeader />
      
      <div 
        ref={conversationRef}
        className="flex-1 p-6 overflow-auto scrollbar-none"
      >
        {conversation.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center max-w-md p-8 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 shadow-sm">
              <div className="inline-flex p-3 mb-4 rounded-full bg-primary/10">
                <Bot size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Test Sequence Generator</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
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
                className={cn(
                  "animate-slide-in flex max-w-3xl mx-auto",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "flex gap-3 max-w-[90%]",
                  message.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={cn(
                      message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                      {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "rounded-lg px-4 py-3 shadow-sm",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-br-none" 
                      : "bg-muted rounded-bl-none"
                  )}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start max-w-3xl mx-auto animate-fade-in">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-muted">
                      <Bot size={14} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg rounded-bl-none px-4 py-3 bg-muted shadow-sm flex items-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    <p className="text-sm">Generating sequence...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="border-t border-border/40 p-4 sticky bottom-0 bg-background/80 backdrop-blur-md shadow-md">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 items-start">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the test sequence you want to generate..."
              className="resize-none min-h-[80px] bg-background/60 border-border/40 focus-visible:ring-primary/40"
              onKeyDown={handleKeyDown}
            />
            <Button 
              className="shrink-0 transition-all" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              <Send size={16} className={cn("transition-transform", isGenerating ? "opacity-0" : "mr-2")} />
              {isGenerating ? (
                <Loader size={16} className="animate-spin absolute" />
              ) : 'Generate'}
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

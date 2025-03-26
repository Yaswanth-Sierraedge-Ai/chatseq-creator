
import React from 'react';
import { useSequenceStore } from '../../store/sequenceStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GeneratorHeader } from './GeneratorHeader';
import { Send, User, Bot, Loader, Sparkles } from 'lucide-react';
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
    <div className="relative flex flex-col h-full">
      <GeneratorHeader />
      
      <div 
        ref={conversationRef}
        className="flex-1 p-6 overflow-auto scrollbar-none z-10"
      >
        {conversation.length === 0 ? (
          <div className="h-full flex items-center justify-center text-black/70">
            <div className="text-center max-w-md p-8 rounded-xl border border-black/10 bg-white shadow-sm animate-scale-in">
              <div className="inline-flex p-3 mb-4 rounded-full bg-[#91C8E4]/10">
                <Sparkles size={32} className="text-[#91C8E4]" />
              </div>
              <h3 className="text-xl font-medium mb-3 text-black">Test Sequence Generator</h3>
              <p className="text-sm leading-relaxed text-black/70">
                Enter a description of what kind of test sequence you want to generate in the input box below.
                The generated code will appear in the sidebar.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {conversation.map((message, index) => (
              <div 
                key={index} 
                className={cn(
                  "animate-slide-in flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={cn(
                  "flex gap-3 max-w-[90%] group",
                  message.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <Avatar className={cn(
                    "h-8 w-8 shrink-0 ring-1 transition-all duration-300",
                    message.role === 'user' ? "ring-[#91C8E4]" : "ring-black/10"
                  )}>
                    <AvatarFallback className={cn(
                      message.role === 'user' ? "bg-[#91C8E4] text-white" : "bg-white"
                    )}>
                      {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "rounded-2xl px-4 py-3 transition-all duration-300 border group-hover:shadow-sm",
                    message.role === 'user' 
                      ? "bg-[#91C8E4] text-black rounded-br-none border-[#91C8E4]" 
                      : "bg-white text-black rounded-bl-none border-black/10"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex justify-start max-w-4xl mx-auto animate-fade-in">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0 ring-1 ring-black/10">
                    <AvatarFallback className="bg-white">
                      <Bot size={14} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl rounded-bl-none px-4 py-3 bg-white border border-black/10 shadow-sm flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#91C8E4] rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                      <div className="w-2 h-2 bg-[#91C8E4] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-[#91C8E4] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                    <p className="text-sm ml-1">Generating sequence...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Floating Input Container */}
      <div className="sticky bottom-6 mx-auto w-full max-w-4xl px-4 z-20">
        <div className="bg-white/95 rounded-2xl border border-black/10 shadow-sm p-3">
          <div className="flex gap-2 items-start">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the test sequence you want to generate..."
              className="resize-none min-h-[60px] bg-transparent border-black/10 focus-visible:ring-[#91C8E4] rounded-xl placeholder:text-black/40"
              onKeyDown={handleKeyDown}
            />
            <Button 
              className="shrink-0 transition-all rounded-xl bg-[#91C8E4] hover:bg-[#91C8E4]/90 text-black hover:shadow-sm" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              <Send size={16} className={cn("transition-transform", isGenerating ? "opacity-0" : "mr-2")} />
              {isGenerating ? (
                <Loader size={16} className="animate-spin absolute" />
              ) : 'Generate'}
            </Button>
          </div>
          <p className="text-xs text-black/40 mt-2 text-right">
            Press ⌘ + Enter to generate
          </p>
        </div>
      </div>
    </div>
  );
};

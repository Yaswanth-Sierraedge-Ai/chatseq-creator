
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Load API key from localStorage on mount
  React.useEffect(() => {
    const savedApiKey = localStorage.getItem('api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  const handleSaveApiKey = () => {
    localStorage.setItem('api_key', apiKey);
    toast.success('API key saved successfully');
  };
  
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };
  
  return (
    <MainLayout>
      <div className="flex-1 overflow-auto">
        <header className="bg-white px-6 py-4 flex items-center gap-4 shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full hover:bg-[#0084D6]/10"
          >
            <ArrowLeft size={20} className="text-[#0084D6]" />
          </Button>
          <h1 className="text-xl font-medium">Settings</h1>
        </header>
        
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
              <Key size={18} className="text-[#0084D6]" />
              API Key Management
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  Chat01.AI API Key
                </label>
                <div className="relative">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Chat01.AI API key"
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={toggleShowApiKey}
                    className="absolute right-0 top-0 h-full"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Your API key is securely stored in your browser and is not sent to our servers.
                </p>
              </div>
              
              <div className="pt-2">
                <Button onClick={handleSaveApiKey}>
                  Save API Key
                </Button>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <h3 className="text-md font-medium mb-2">API Documentation</h3>
              <Textarea
                readOnly
                className="h-48 font-mono text-xs"
                value={`API Endpoint: https://chat01.ai/v1/chat/completions
Method: POST
Headers:
  Authorization: Bearer YOUR_API_KEY
  Content-Type: application/json
  
Body:
{
  "model": "gpt-4o",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Generate a test sequence."}
  ],
  "temperature": 0.1
}`}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;

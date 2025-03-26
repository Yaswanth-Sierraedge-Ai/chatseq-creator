
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, ServerCrash, Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const ApiStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [backendInfo, setBackendInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const checkBackendStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000');
      setStatus('online');
      setBackendInfo(response.data);
    } catch (error) {
      console.error('Backend connectivity error:', error);
      setStatus('offline');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkBackendStatus();
  }, []);
  
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
          <h1 className="text-xl font-medium">API Backend Status</h1>
        </header>
        
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
              {status === 'checking' && <Loader size={18} className="text-[#0084D6] animate-spin" />}
              {status === 'online' && <Check size={18} className="text-green-500" />}
              {status === 'offline' && <ServerCrash size={18} className="text-red-500" />}
              
              FastAPI Backend Status
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-md border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Status</span>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    status === 'online' ? "bg-green-100 text-green-800" : 
                    status === 'offline' ? "bg-red-100 text-red-800" : 
                    "bg-blue-100 text-blue-800"
                  )}>
                    {status === 'online' ? 'Online' : 
                     status === 'offline' ? 'Offline' : 'Checking...'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600">
                  {status === 'online' ? 
                    'The FastAPI backend is running and responding to requests.' :
                    status === 'offline' ?
                    'The FastAPI backend is not responding. Make sure it is running on http://localhost:8000.' :
                    'Checking backend status...'}
                </p>
                
                {backendInfo && (
                  <div className="mt-4 text-sm">
                    <h3 className="font-medium mb-2">Backend Information</h3>
                    <pre className="bg-gray-50 p-2 rounded overflow-auto">
                      {JSON.stringify(backendInfo, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
              
              <div className="p-4 rounded-md border bg-blue-50">
                <h3 className="font-medium mb-2">Troubleshooting</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Make sure the FastAPI server is running at <code className="bg-blue-100 px-1 rounded">http://localhost:8000</code></li>
                  <li>In the API directory, run <code className="bg-blue-100 px-1 rounded">python main.py</code> to start the backend</li>
                  <li>Check that your firewall isn't blocking the connection</li>
                  <li>Verify that port 8000 isn't being used by another application</li>
                </ul>
              </div>
              
              <div className="pt-2">
                <Button 
                  onClick={checkBackendStatus}
                  disabled={loading}
                  className="bg-[#0084D6] hover:bg-[#0084D6]/90"
                >
                  {loading ? (
                    <>
                      <Loader size={16} className="animate-spin mr-2" />
                      Checking...
                    </>
                  ) : 'Refresh Status'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

import { cn } from "@/lib/utils";
export default ApiStatus;

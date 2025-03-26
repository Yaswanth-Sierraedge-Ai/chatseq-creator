
import axios from 'axios';

const API_ENDPOINT = 'https://chat01.ai/v1/chat/completions';
const DEFAULT_MODEL = 'gpt-4o';
const DEFAULT_TEMPERATURE = 0.1;

interface GenerateSequenceParams {
  prompt: string;
  model?: string;
  temperature?: number;
}

export const generateSequence = async ({ 
  prompt, 
  model = DEFAULT_MODEL, 
  temperature = DEFAULT_TEMPERATURE 
}: GenerateSequenceParams) => {
  // Get API key from localStorage
  const apiKey = localStorage.getItem('api_key');
  
  if (!apiKey) {
    throw new Error('API key not found. Please add your API key in Settings.');
  }
  
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert AI assistant specialized in test sequence generation. Generate a test sequence based on the user prompt.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      generatedContent: response.data.choices[0].message.content,
      success: true
    };
  } catch (error) {
    console.error('API Error:', error);
    
    // Extract error message
    let errorMessage = 'Failed to generate sequence';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage = 'Invalid API key. Please check your API key in Settings.';
      } else if (error.response?.data?.error?.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    }
    
    throw new Error(errorMessage);
  }
};

// Function to validate API key
export const validateApiKey = async (apiKey: string) => {
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello, are you working?' }
        ],
        max_tokens: 10,
        temperature: 0.1
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { valid: true, message: 'API key is valid' };
  } catch (error) {
    let message = 'Failed to validate API key';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        message = 'Invalid API key';
      } else if (error.response?.data?.error?.message) {
        message = error.response.data.error.message;
      }
    }
    
    return { valid: false, message };
  }
};

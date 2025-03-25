
import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Sequence {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface SequenceState {
  sequences: Sequence[];
  currentSequence: Sequence | null;
  loading: boolean;
  error: string | null;
  fetchSequences: () => Promise<void>;
  addSequence: (title: string, content: string) => Promise<void>;
  setCurrentSequence: (id: string | null) => void;
  deleteSequence: (id: string) => Promise<void>;
  updateSequence: (id: string, content: string) => Promise<void>;
}

export const useSequenceStore = create<SequenceState>((set, get) => ({
  sequences: [],
  currentSequence: null,
  loading: false,
  error: null,
  
  fetchSequences: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/sequences`);
      set({ sequences: response.data, loading: false });
      
      // Set current sequence to the first one if none is selected
      const { currentSequence, sequences } = get();
      if (!currentSequence && response.data.length > 0) {
        set({ currentSequence: response.data[0] });
      }
    } catch (error) {
      console.error('Error fetching sequences:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch sequences',
        loading: false 
      });
    }
  },
  
  addSequence: async (title, content) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/sequences`, { title, content });
      const newSequence = response.data;
      
      set((state) => ({
        sequences: [newSequence, ...state.sequences],
        currentSequence: newSequence,
        loading: false
      }));
    } catch (error) {
      console.error('Error adding sequence:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add sequence',
        loading: false 
      });
    }
  },
  
  setCurrentSequence: (id) => {
    set((state) => ({
      currentSequence: id ? state.sequences.find(seq => seq.id === id) || null : null
    }));
  },
  
  deleteSequence: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/sequences/${id}`);
      
      set((state) => {
        const newSequences = state.sequences.filter(seq => seq.id !== id);
        return {
          sequences: newSequences,
          currentSequence: state.currentSequence?.id === id 
            ? (newSequences[0] || null) 
            : state.currentSequence,
          loading: false
        };
      });
    } catch (error) {
      console.error('Error deleting sequence:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete sequence',
        loading: false 
      });
    }
  },
  
  updateSequence: async (id, content) => {
    set({ loading: true, error: null });
    try {
      const { currentSequence } = get();
      if (!currentSequence) {
        throw new Error('No sequence selected');
      }
      
      const response = await axios.put(`${API_URL}/sequences/${id}`, {
        title: currentSequence.title,
        content: content
      });
      
      set((state) => ({
        sequences: state.sequences.map(seq => 
          seq.id === id ? response.data : seq
        ),
        currentSequence: state.currentSequence?.id === id
          ? response.data
          : state.currentSequence,
        loading: false
      }));
    } catch (error) {
      console.error('Error updating sequence:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update sequence',
        loading: false 
      });
    }
  }
}));

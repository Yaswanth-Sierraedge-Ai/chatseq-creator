
import { create } from 'zustand';

export interface Sequence {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface SequenceState {
  sequences: Sequence[];
  currentSequence: Sequence | null;
  addSequence: (title: string, content: string) => void;
  setCurrentSequence: (id: string | null) => void;
  deleteSequence: (id: string) => void;
  updateSequence: (id: string, content: string) => void;
}

export const useSequenceStore = create<SequenceState>((set) => ({
  sequences: [],
  currentSequence: null,
  
  addSequence: (title, content) => {
    const newSequence = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date(),
    };
    
    set((state) => ({
      sequences: [newSequence, ...state.sequences],
      currentSequence: newSequence,
    }));
  },
  
  setCurrentSequence: (id) => {
    set((state) => ({
      currentSequence: id ? state.sequences.find(seq => seq.id === id) || null : null
    }));
  },
  
  deleteSequence: (id) => {
    set((state) => {
      const newSequences = state.sequences.filter(seq => seq.id !== id);
      return {
        sequences: newSequences,
        currentSequence: state.currentSequence?.id === id 
          ? (newSequences[0] || null) 
          : state.currentSequence
      };
    });
  },
  
  updateSequence: (id, content) => {
    set((state) => ({
      sequences: state.sequences.map(seq => 
        seq.id === id ? { ...seq, content } : seq
      ),
      currentSequence: state.currentSequence?.id === id
        ? { ...state.currentSequence, content }
        : state.currentSequence
    }));
  }
}));

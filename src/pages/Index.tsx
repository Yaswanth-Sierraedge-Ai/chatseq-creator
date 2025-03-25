
import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SequenceGenerator } from '../components/ui/SequenceGenerator';
import { useSequenceStore } from '../store/sequenceStore';

const Index = () => {
  const { currentSequence, addSequence } = useSequenceStore();
  
  // Create a default sequence if none exists
  React.useEffect(() => {
    if (!currentSequence) {
      const timestamp = new Date().toLocaleTimeString();
      addSequence(`My First Sequence`, '');
    }
  }, [currentSequence, addSequence]);
  
  return (
    <MainLayout>
      <div className="min-h-screen">
        <SequenceGenerator />
      </div>
    </MainLayout>
  );
};

export default Index;


import React from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { SequenceGenerator } from '../components/ui/SequenceGenerator';
import { useSequenceStore } from '../store/sequenceStore';

const Index = () => {
  const { fetchSequences } = useSequenceStore();
  
  // Fetch sequences when the component mounts
  React.useEffect(() => {
    fetchSequences();
  }, [fetchSequences]);
  
  return (
    <MainLayout>
      <div className="min-h-screen">
        <SequenceGenerator />
      </div>
    </MainLayout>
  );
};

export default Index;

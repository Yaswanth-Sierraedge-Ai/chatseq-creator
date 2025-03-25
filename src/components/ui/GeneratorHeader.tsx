
import React from 'react';
import { useSequenceStore } from '../../store/sequenceStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Save, Share, Trash } from 'lucide-react';

export const GeneratorHeader: React.FC = () => {
  const { currentSequence, deleteSequence } = useSequenceStore();
  const [title, setTitle] = React.useState('');
  
  React.useEffect(() => {
    if (currentSequence) {
      setTitle(currentSequence.title);
    }
  }, [currentSequence]);
  
  if (!currentSequence) return null;
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 border-b border-border">
      <div className="flex-1">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium border-transparent bg-transparent hover:border-input focus:border-input transition-colors px-0"
        />
        <div className="text-sm text-muted-foreground mt-1">
          Created {currentSequence.createdAt.toLocaleDateString()} at {currentSequence.createdAt.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Save size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Download size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <Share size={18} />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => currentSequence && deleteSequence(currentSequence.id)}>
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
};

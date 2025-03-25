
import React from 'react';
import { useSequenceStore, type Sequence } from '../../store/sequenceStore';
import { Code, ChevronLeft, ChevronRight, Settings, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SequenceOutput } from '../ui/SequenceOutput';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const { sequences, currentSequence, setCurrentSequence, deleteSequence, addSequence } = useSequenceStore();

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 z-40 h-screen border-l border-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <h2 className="text-xl font-medium tracking-tight">
              Output
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={collapsed ? "mx-auto" : "ml-auto"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        {/* Output area */}
        <div className="flex-1 overflow-auto p-4">
          {currentSequence ? (
            <SequenceOutput content={currentSequence.content} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Code size={24} className="mx-auto mb-2 opacity-50" />
                <p>No output generated yet</p>
                <p className="text-sm mt-1">Enter a prompt to generate a test sequence</p>
              </div>
            </div>
          )}
        </div>

        {/* Sequences list in collapsed sidebar */}
        {collapsed && (
          <div className="mt-auto border-t border-border p-4">
            <ul className="space-y-2">
              {sequences.slice(0, 5).map((sequence) => (
                <li key={sequence.id}>
                  <Button
                    variant={currentSequence?.id === sequence.id ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setCurrentSequence(sequence.id)}
                    className="w-full"
                  >
                    <Code size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

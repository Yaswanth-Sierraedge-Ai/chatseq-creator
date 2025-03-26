
import React from 'react';
import { useSequenceStore, type Sequence } from '../../store/sequenceStore';
import { Code, ChevronLeft, ChevronRight, Trash, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SequenceOutput } from '../ui/SequenceOutput';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const { sequences, currentSequence, setCurrentSequence, deleteSequence, loading, error } = useSequenceStore();

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 z-40 h-screen border-l border-border/40 bg-sidebar/90 backdrop-blur-sm transition-all duration-300 ease-in-out shadow-lg",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/40 bg-sidebar/90 backdrop-blur-sm">
          {!collapsed && (
            <h2 className="text-xl font-medium tracking-tight flex items-center gap-2">
              <Bot size={20} className="text-primary" />
              <span>Output</span>
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn(
              "transition-all duration-200",
              collapsed ? "mx-auto hover:bg-sidebar-accent" : "ml-auto hover:bg-sidebar-accent"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        {/* Output area */}
        <div className="flex-1 overflow-auto p-4">
          {loading && (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center animate-pulse">
                <p>Loading...</p>
              </div>
            </div>
          )}
          {!loading && currentSequence ? (
            <div className="animate-fade-in">
              <SequenceOutput content={currentSequence.content} />
            </div>
          ) : !loading ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Code size={24} className="mx-auto mb-2 opacity-50" />
                <p>No output generated yet</p>
                <p className="text-sm mt-1">Enter a prompt to generate a test sequence</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Sequences list */}
        {!collapsed && sequences.length > 0 && (
          <div className="border-t border-border/40 p-3 bg-sidebar-accent/10">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">RECENT SEQUENCES</h3>
            <ul className="space-y-1.5">
              {sequences.map((sequence) => (
                <li key={sequence.id}>
                  <Button
                    variant={currentSequence?.id === sequence.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentSequence(sequence.id)}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      currentSequence?.id === sequence.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Code size={15} className="mr-2 shrink-0" />
                    <span className="truncate">{sequence.title}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sequences list in collapsed sidebar */}
        {collapsed && (
          <div className="mt-auto border-t border-border/40 p-4">
            <ul className="space-y-2">
              {sequences.slice(0, 5).map((sequence) => (
                <li key={sequence.id} className="relative group">
                  <Button
                    variant={currentSequence?.id === sequence.id ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setCurrentSequence(sequence.id)}
                    className="w-full"
                  >
                    <Code size={16} />
                  </Button>
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 hidden group-hover:block">
                    <Card className="shadow-md">
                      <CardContent className="p-2 text-xs whitespace-nowrap">
                        {sequence.title}
                      </CardContent>
                    </Card>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

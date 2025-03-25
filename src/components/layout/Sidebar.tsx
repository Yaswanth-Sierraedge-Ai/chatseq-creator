
import React from 'react';
import { useSequenceStore, type Sequence } from '../../store/sequenceStore';
import { Menu, List, Plus, ChevronLeft, ChevronRight, Settings, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const { sequences, currentSequence, setCurrentSequence, deleteSequence, addSequence } = useSequenceStore();

  const handleNewSequence = () => {
    const timestamp = new Date().toLocaleTimeString();
    addSequence(`Sequence ${timestamp}`, '');
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <h2 className="text-xl font-medium tracking-tight">
              Test Sequences
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        {/* Actions */}
        <div className={cn("p-4 flex", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed && <span className="text-sm font-medium text-muted-foreground">Sequences</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewSequence}
            className={collapsed ? "mx-auto" : ""}
            aria-label="Create new sequence"
          >
            <Plus size={18} />
          </Button>
        </div>

        {/* Sequence list */}
        <div className="flex-1 overflow-auto px-3 py-2">
          {sequences.length === 0 ? (
            <div className={cn(
              "flex flex-col items-center justify-center h-32 text-center text-muted-foreground",
              collapsed ? "px-2" : "px-4"
            )}>
              {!collapsed && <p className="text-sm">No sequences yet</p>}
              <Button
                variant="outline"
                size={collapsed ? "icon" : "default"}
                onClick={handleNewSequence}
                className="mt-2"
              >
                {collapsed ? <Plus size={16} /> : "Create one"}
              </Button>
            </div>
          ) : (
            <ul className="space-y-1">
              {sequences.map((sequence) => (
                <li key={sequence.id} className="relative">
                  <button
                    onClick={() => setCurrentSequence(sequence.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors",
                      "hover:bg-sidebar-accent group flex items-center justify-between",
                      currentSequence?.id === sequence.id
                        ? "bg-sidebar-accent font-medium"
                        : "text-sidebar-foreground"
                    )}
                  >
                    <div className={cn("flex items-center overflow-hidden", collapsed ? "justify-center w-full" : "")}>
                      <List size={16} className="shrink-0" />
                      {!collapsed && (
                        <span className="ml-2 truncate">{sequence.title}</span>
                      )}
                    </div>
                    
                    {!collapsed && currentSequence?.id === sequence.id && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSequence(sequence.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 h-7 w-7"
                      >
                        <Trash size={14} />
                      </Button>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-border p-4">
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className={cn("w-full justify-start", collapsed && "justify-center")}
          >
            <Settings size={16} className="mr-2" />
            {!collapsed && <span>Settings</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

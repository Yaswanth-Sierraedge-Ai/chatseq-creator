
import React from 'react';
import { Sparkles } from 'lucide-react';

export const GeneratorHeader: React.FC = () => {
  return (
    <div className="z-10 bg-white shadow-sm px-6 py-4 sticky top-0">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-medium flex items-center gap-2">
          <span className="bg-[#0084D6]/10 text-[#0084D6] p-1.5 rounded-md">
            <Sparkles size={20} />
          </span>
          <span className="text-black">
            Test Sequence Generator
          </span>
        </h1>
      </div>
    </div>
  );
};

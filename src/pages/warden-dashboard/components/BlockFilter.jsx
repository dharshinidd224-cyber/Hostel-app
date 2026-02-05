import React from 'react';
import Icon from '../../../components/AppIcon';

const BlockFilter = ({ blocks, selectedBlock, onBlockChange }) => {
  return (
    <div 
      className="rounded-xl p-[2px] shadow-elevation-md"
      style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
      }}
    >
      <div className="bg-card rounded-xl p-4 md:p-6 h-full">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Building2" size={20} color="var(--color-primary)" />
          <h3 className="text-base md:text-lg font-semibold text-foreground">Filter by Block</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
          <button
            onClick={() => onBlockChange('all')}
            className={`px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base font-medium transition-smooth ${
              selectedBlock === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All Blocks
          </button>
          {blocks?.map((block) => (
            <button
              key={block?.id}
              onClick={() => onBlockChange(block?.name)}
              className={`px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base font-medium transition-smooth ${
                selectedBlock === block?.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {block?.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockFilter;
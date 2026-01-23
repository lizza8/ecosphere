import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TooltipPanelProps {
  title: string;
  description: string;
  position: { x: number; y: number };
  onClose: () => void;
}

export function TooltipPanel({ title, description, position, onClose }: TooltipPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -120%)',
      }}
      className="z-50 w-[320px] bg-gray-900/95 backdrop-blur-md border-2 border-cyan/30 rounded-lg p-6"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-body font-medium text-cyan">{title}</h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50 -mt-2 -mr-2"
        >
          <X className="w-5 h-5" strokeWidth={1.5} />
        </Button>
      </div>
      <p className="text-small text-foreground">{description}</p>
    </motion.div>
  );
}

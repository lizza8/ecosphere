import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, FileText, Rocket, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ControlConsoleProps {
  onAction: (action: 'report' | 'scan' | 'deploy' | 'analyze') => void;
}

export function ControlConsole({ onAction }: ControlConsoleProps) {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const actions = [
    { id: 'scan', label: 'Scan', icon: Scan, color: 'cyan' },
    { id: 'report', label: 'Report', icon: FileText, color: 'magenta' },
    { id: 'deploy', label: 'Deploy', icon: Rocket, color: 'lime' },
    { id: 'analyze', label: 'Analyze', icon: Brain, color: 'blue' },
  ];

  const handleAction = (actionId: string) => {
    setActiveAction(actionId);
    onAction(actionId as 'report' | 'scan' | 'deploy' | 'analyze');
    setTimeout(() => setActiveAction(null), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-10"
    >
      <div className="flex gap-6 bg-gray-900/80 backdrop-blur-md border-2 border-cyan/40 rounded-full px-8 py-6 shadow-[0_0_40px_rgba(0,255,255,0.4)]">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className={`
                relative w-20 h-20 rounded-full
                bg-gradient-to-br from-${action.color}/20 to-${action.color}/10
                border-2 border-${action.color}/50
                text-${action.color}
                hover:border-${action.color}
                hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]
                transition-all duration-200
                ${activeAction === action.id ? 'scale-95' : 'scale-100'}
              `}
              style={{
                backgroundColor: `hsl(var(--color-${action.color}) / 0.1)`,
                borderColor: `hsl(var(--color-${action.color}) / 0.5)`,
                color: `hsl(var(--color-${action.color}))`,
              }}
            >
              <Icon className="w-10 h-10" strokeWidth={1.5} />
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}

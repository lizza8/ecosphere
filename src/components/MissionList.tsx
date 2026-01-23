import React from 'react';
import { motion } from 'framer-motion';
import { X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mission } from '../App';

interface MissionListProps {
  missions: Mission[];
  onClose: () => void;
}

export function MissionList({ missions, onClose }: MissionListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.3 }}
      className="fixed left-8 top-32 z-20 w-[420px] bg-gray-900/90 backdrop-blur-md border-2 border-cyan/40 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.3)]"
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <h2 className="text-h3 text-cyan">Active Missions</h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </Button>
      </div>

      <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-body font-medium text-foreground">{mission.title}</h3>
              {mission.collaborative && (
                <div className="flex items-center gap-2 text-magenta">
                  <Users className="w-5 h-5" strokeWidth={1.5} />
                </div>
              )}
            </div>

            <p className="text-small text-muted-foreground mb-4">{mission.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between text-small">
                <span className="text-muted-foreground font-mono">{mission.region}</span>
                <span className="text-cyan font-mono">{mission.progress}%</span>
              </div>
              <Progress value={mission.progress} className="h-2" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

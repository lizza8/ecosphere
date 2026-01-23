import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayerStats } from '../App';

interface HUDOverlayProps {
  playerStats: PlayerStats;
  onToggleLeaderboard: () => void;
  onToggleMissions: () => void;
  onToggleSettings: () => void;
}

export function HUDOverlay({
  playerStats,
  onToggleLeaderboard,
  onToggleMissions,
  onToggleSettings,
}: HUDOverlayProps) {
  return (
    <>
      {/* Top Right Stats Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-8 right-8 z-10 bg-gray-900/80 backdrop-blur-md border-2 border-cyan/40 rounded-lg p-8 min-w-[320px] shadow-[0_0_30px_rgba(0,255,255,0.3)]"
      >
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-small uppercase tracking-wider text-cyan font-mono">Energy</span>
              <span className="text-body font-mono text-foreground">{playerStats.energy}%</span>
            </div>
            <Progress value={playerStats.energy} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-small uppercase tracking-wider text-lime font-mono">CO₂ Saved</span>
              <span className="text-body font-mono text-foreground">{playerStats.co2Saved} kg</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-small uppercase tracking-wider text-magenta font-mono">Mission Progress</span>
              <span className="text-body font-mono text-foreground">{playerStats.missionProgress}%</span>
            </div>
            <Progress value={playerStats.missionProgress} className="h-2" />
          </div>
        </div>
      </motion.div>

      {/* Top Left Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="fixed top-8 left-8 z-10 flex gap-4"
      >
        <Button
          onClick={onToggleMissions}
          className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/80 border border-blue/30"
          size="lg"
        >
          <Target className="w-8 h-8" strokeWidth={1.5} />
        </Button>

        <Button
          onClick={onToggleLeaderboard}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-magenta/30"
          size="lg"
        >
          <Trophy className="w-8 h-8" strokeWidth={1.5} />
        </Button>

        <Button
          onClick={onToggleSettings}
          className="bg-muted text-muted-foreground hover:bg-muted/80 border border-gray-600/30"
          size="lg"
        >
          <Settings className="w-8 h-8" strokeWidth={1.5} />
        </Button>
      </motion.div>
    </>
  );
}

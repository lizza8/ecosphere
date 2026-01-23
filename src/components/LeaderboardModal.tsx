import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LeaderboardEntry } from '../App';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
}

export function LeaderboardModal({ isOpen, onClose, leaderboard }: LeaderboardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gray-900/95 backdrop-blur-md border-2 border-magenta/30 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-h2 text-magenta flex items-center gap-4">
            <Trophy className="w-12 h-12" strokeWidth={1.5} />
            Global Leaderboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-8">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                flex items-center justify-between p-6 rounded-lg border
                ${entry.rank <= 3 
                  ? 'bg-gradient-to-r from-magenta/10 to-cyan/10 border-magenta/50' 
                  : 'bg-gray-800/50 border-gray-700'
                }
                hover:border-cyan/50 transition-colors
              `}
            >
              <div className="flex items-center gap-6">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-mono text-body
                  ${entry.rank === 1 ? 'bg-gradient-1 text-primary-foreground' : ''}
                  ${entry.rank === 2 ? 'bg-gradient-2 text-primary-foreground' : ''}
                  ${entry.rank === 3 ? 'bg-tertiary text-tertiary-foreground' : ''}
                  ${entry.rank > 3 ? 'bg-gray-700 text-muted-foreground' : ''}
                `}>
                  {entry.rank}
                </div>

                <div>
                  <div className="text-body font-medium text-foreground">{entry.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-small text-cyan font-mono">{entry.score.toLocaleString()} pts</span>
                    <span className="text-small text-muted-foreground flex items-center gap-1">
                      <Award className="w-4 h-4" strokeWidth={1.5} />
                      {entry.achievements}
                    </span>
                  </div>
                </div>
              </div>

              {entry.rank <= 3 && (
                <Trophy className="w-8 h-8 text-magenta" strokeWidth={1.5} />
              )}
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

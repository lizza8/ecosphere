import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Brain, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AIResultPanelProps {
  onClose: () => void;
}

export function AIResultPanel({ onClose }: AIResultPanelProps) {
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);
  const [result, setResult] = useState<{
    object: string;
    impact: string;
    recommendation: string;
  } | null>(null);

  useEffect(() => {
    const detectionResults = [
      {
        object: 'Plastic Waste Detected',
        impact: 'High environmental risk in marine ecosystem - 2,500 tons of microplastics affecting 15 species',
        recommendation: 'Deploy cleanup drones to affected region | Estimated cleanup time: 6 months | Cost: 50,000 energy units',
      },
      {
        object: 'Deforestation Activity',
        impact: 'Critical habitat loss - 500 hectares cleared in last 30 days | 12 endangered species at risk',
        recommendation: 'Initiate reforestation protocol | Plant 10,000 trees | Deploy monitoring satellites',
      },
      {
        object: 'Air Pollution Spike',
        impact: 'Severe air quality degradation - PM2.5 levels 300% above safe threshold | Health risk: HIGH',
        recommendation: 'Activate air filtration systems | Reduce industrial emissions | Issue public health advisory',
      },
      {
        object: 'Renewable Energy Opportunity',
        impact: 'Optimal conditions for solar installation - Potential 5MW capacity | ROI: 3 years',
        recommendation: 'Deploy solar panel array | Connect to grid | Offset 2,000 tons CO₂ annually',
      },
    ];

    const randomResult = detectionResults[Math.floor(Math.random() * detectionResults.length)];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setResult(randomResult);
          return 100;
        }
        return prev + 8;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[500px] bg-gray-900/95 backdrop-blur-md border-2 border-blue/30 rounded-lg overflow-hidden"
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue" strokeWidth={1.5} />
          <h2 className="text-h3 text-blue">AI Analysis</h2>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </Button>
      </div>

      <div className="p-8">
        {analyzing ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-blue animate-spin" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex justify-between text-small mb-2">
                <span className="text-muted-foreground font-mono">Processing...</span>
                <span className="text-blue font-mono">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        ) : result ? (
          <div className="space-y-6">
            <div className="bg-gray-800/50 border border-blue/30 rounded-lg p-6">
              <h3 className="text-body font-medium text-cyan mb-2">Detection Result</h3>
              <p className="text-body text-foreground">{result.object}</p>
            </div>

            <div className="bg-gray-800/50 border border-warning/30 rounded-lg p-6">
              <h3 className="text-body font-medium text-warning mb-2">Environmental Impact</h3>
              <p className="text-body text-foreground">{result.impact}</p>
            </div>

            <div className="bg-gray-800/50 border border-lime/30 rounded-lg p-6">
              <h3 className="text-body font-medium text-lime mb-2">Recommendation</h3>
              <p className="text-body text-foreground">{result.recommendation}</p>
            </div>

            <Button
              onClick={onClose}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Deploy Action
            </Button>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

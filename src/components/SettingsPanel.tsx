import React from 'react';
import { X, Volume2, VolumeX, Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  audioEnabled: boolean;
  onAudioToggle: (enabled: boolean) => void;
  renderQuality: 'high' | 'medium' | 'low';
  onRenderQualityChange: (quality: 'high' | 'medium' | 'low') => void;
  arMode: boolean;
  onArModeToggle: (enabled: boolean) => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  audioEnabled,
  onAudioToggle,
  renderQuality,
  onRenderQualityChange,
  arMode,
  onArModeToggle,
}: SettingsPanelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-gray-900/95 backdrop-blur-md border-2 border-cyan/30 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-h2 text-cyan">Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="audio" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="audio" className="data-[state=active]:bg-cyan/20 data-[state=active]:text-cyan">
              Audio
            </TabsTrigger>
            <TabsTrigger value="graphics" className="data-[state=active]:bg-cyan/20 data-[state=active]:text-cyan">
              Graphics
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-cyan/20 data-[state=active]:text-cyan">
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="audio" className="space-y-6 mt-8">
            <div className="flex items-center justify-between p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                {audioEnabled ? (
                  <Volume2 className="w-8 h-8 text-cyan" strokeWidth={1.5} />
                ) : (
                  <VolumeX className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
                )}
                <div>
                  <div className="text-body text-foreground">Sound Effects</div>
                  <div className="text-small text-muted-foreground">Enable ambient audio and feedback</div>
                </div>
              </div>
              <Switch checked={audioEnabled} onCheckedChange={onAudioToggle} />
            </div>
          </TabsContent>

          <TabsContent value="graphics" className="space-y-6 mt-8">
            <div className="space-y-4">
              <div className="text-body text-foreground mb-4">Render Quality</div>
              {(['high', 'medium', 'low'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => onRenderQualityChange(quality)}
                  className={`
                    w-full p-6 rounded-lg border text-left transition-colors
                    ${renderQuality === quality
                      ? 'bg-cyan/10 border-cyan text-cyan'
                      : 'bg-gray-800/50 border-gray-700 text-foreground hover:border-cyan/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-body font-medium capitalize">{quality}</div>
                      <div className="text-small text-muted-foreground mt-1">
                        {quality === 'high' && 'Maximum visual fidelity with bloom effects'}
                        {quality === 'medium' && 'Balanced performance and quality'}
                        {quality === 'low' && 'Optimized for lower-end devices'}
                      </div>
                    </div>
                    <Monitor className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6 mt-8">
            <div className="flex items-center justify-between p-6 bg-gray-800/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4">
                <Smartphone className="w-8 h-8 text-magenta" strokeWidth={1.5} />
                <div>
                  <div className="text-body text-foreground">AR Mode</div>
                  <div className="text-small text-muted-foreground">Enable augmented reality overlay</div>
                </div>
              </div>
              <Switch checked={arMode} onCheckedChange={onArModeToggle} />
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

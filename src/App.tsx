import React, { useState, useEffect } from 'react';
import { GlobeCanvas } from './components/GlobeCanvas';
import { HUDOverlay } from './components/HUDOverlay';
import { ControlConsole } from './components/ControlConsole';
import { LeaderboardModal } from './components/LeaderboardModal';
import { MissionList } from './components/MissionList';
import { AIResultPanel } from './components/AIResultPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { TooltipPanel } from './components/TooltipPanel';

export interface PlayerStats {
  energy: number;
  co2Saved: number;
  missionProgress: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  region: string;
  collaborative: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  achievements: number;
}

export interface TooltipData {
  visible: boolean;
  title: string;
  description: string;
  position: { x: number; y: number };
}

function App() {
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    energy: 75,
    co2Saved: 1250,
    missionProgress: 65,
  });

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Antarctica Cleanup',
      description: 'Remove pollution from Antarctic waters',
      progress: 45,
      region: 'Antarctica',
      collaborative: true,
    },
    {
      id: '2',
      title: 'Amazon Reforestation',
      description: 'Plant 10,000 virtual trees in the Amazon',
      progress: 78,
      region: 'South America',
      collaborative: true,
    },
    {
      id: '3',
      title: 'Ocean Plastic Removal',
      description: 'Clean up Pacific garbage patch',
      progress: 32,
      region: 'Pacific Ocean',
      collaborative: false,
    },
  ]);

  // Auto-update missions progress
  useEffect(() => {
    const interval = setInterval(() => {
      setMissions(prev => prev.map(mission => ({
        ...mission,
        progress: Math.min(100, mission.progress + Math.random() * 2)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, name: 'EcoWarrior_X', score: 15420, achievements: 28 },
    { rank: 2, name: 'GreenGuardian', score: 14890, achievements: 25 },
    { rank: 3, name: 'PlanetHealer', score: 13560, achievements: 23 },
    { rank: 4, name: 'ClimateChampion', score: 12340, achievements: 21 },
    { rank: 5, name: 'EcoNinja', score: 11890, achievements: 19 },
  ]);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showMissions, setShowMissions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [tooltipData, setTooltipData] = useState<TooltipData>({
    visible: false,
    title: '',
    description: '',
    position: { x: 0, y: 0 },
  });

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [renderQuality, setRenderQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [arMode, setArMode] = useState(false);

  const handleAction = (action: 'report' | 'scan' | 'deploy' | 'analyze') => {
    console.log(`Action triggered: ${action}`);
    
    if (action === 'analyze') {
      setShowAIPanel(true);
    }

    if (action === 'scan') {
      setTooltipData({
        visible: true,
        title: 'Environmental Scan Complete',
        description: '5 pollution hotspots detected | 3 renewable energy sites identified | Air quality: Moderate',
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      });
    }

    if (action === 'deploy') {
      setTooltipData({
        visible: true,
        title: 'Cleanup Drones Deployed',
        description: 'Autonomous cleanup units dispatched to target zones | ETA: 2 hours | Impact: -150kg CO₂',
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      });
    }

    if (action === 'report') {
      setTooltipData({
        visible: true,
        title: 'Environmental Report Generated',
        description: 'Data logged to global network | +50 contribution points | Report shared with 1,247 users',
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      });
    }

    // Simulate stat updates with realistic values
    setPlayerStats(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 5),
      co2Saved: prev.co2Saved + Math.floor(Math.random() * 50 + 20),
      missionProgress: Math.min(100, prev.missionProgress + Math.floor(Math.random() * 3 + 1)),
    }));

    // Update leaderboard
    setLeaderboard(prev => {
      const updated = [...prev];
      updated[0].score += Math.floor(Math.random() * 100 + 50);
      return updated.sort((a, b) => b.score - a.score).map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));
    });
  };

  const handleGlobeClick = (data: { title: string; description: string; x: number; y: number }) => {
    setTooltipData({
      visible: true,
      title: data.title,
      description: data.description,
      position: { x: data.x, y: data.y },
    });
  };

  const closeTooltip = () => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral text-neutral-foreground">
      {/* 3D Globe Canvas */}
      <GlobeCanvas 
        renderQuality={renderQuality}
        onGlobeClick={handleGlobeClick}
      />

      {/* HUD Overlay */}
      <HUDOverlay 
        playerStats={playerStats}
        onToggleLeaderboard={() => setShowLeaderboard(!showLeaderboard)}
        onToggleMissions={() => setShowMissions(!showMissions)}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      {/* Control Console */}
      <ControlConsole onAction={handleAction} />

      {/* Mission List */}
      {showMissions && (
        <MissionList 
          missions={missions}
          onClose={() => setShowMissions(false)}
        />
      )}

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        leaderboard={leaderboard}
      />

      {/* AI Result Panel */}
      {showAIPanel && (
        <AIResultPanel onClose={() => setShowAIPanel(false)} />
      )}

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          audioEnabled={audioEnabled}
          onAudioToggle={setAudioEnabled}
          renderQuality={renderQuality}
          onRenderQualityChange={setRenderQuality}
          arMode={arMode}
          onArModeToggle={setArMode}
        />
      )}

      {/* Tooltip Panel */}
      {tooltipData.visible && (
        <TooltipPanel
          title={tooltipData.title}
          description={tooltipData.description}
          position={tooltipData.position}
          onClose={closeTooltip}
        />
      )}
    </div>
  );
}

export default App;

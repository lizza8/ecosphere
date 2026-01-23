import React, { useRef, useEffect, useState } from 'react';

interface GlobeCanvasProps {
  renderQuality: 'high' | 'medium' | 'low';
  onGlobeClick: (data: { title: string; description: string; x: number; y: number }) => void;
}

export function GlobeCanvas({ renderQuality, onGlobeClick }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Animation variables
    let rotation = 0;
    const particleCount = renderQuality === 'high' ? 150 : renderQuality === 'medium' ? 100 : 50;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; size: number }> = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: ['#00ffff', '#ff00ff', '#00aaff', '#5aff00'][Math.floor(Math.random() * 4)],
        size: Math.random() * 2 + 1,
      });
    }

    // Hotspots data
    const hotspots = [
      { x: 0.3, y: 0.2, color: '#00ffff', label: 'Arctic Ice Loss', severity: 'high' },
      { x: -0.4, y: 0.3, color: '#ff00ff', label: 'Amazon Deforestation', severity: 'critical' },
      { x: 0.2, y: -0.5, color: '#00aaff', label: 'Pacific Plastic', severity: 'high' },
      { x: 0.6, y: -0.2, color: '#5aff00', label: 'Renewable Energy', severity: 'positive' },
      { x: -0.3, y: -0.4, color: '#ff0055', label: 'Air Pollution', severity: 'critical' },
    ];

    // Animation loop
    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(5, 5, 16, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw central globe
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;

      rotation += 0.003;

      // Globe outer glow
      const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.9, centerX, centerY, radius * 1.8);
      outerGlow.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
      outerGlow.addColorStop(0.5, 'rgba(0, 255, 255, 0.2)');
      outerGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = outerGlow;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere with gradient
      const sphereGradient = ctx.createRadialGradient(
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGradient.addColorStop(0, '#2a5a7a');
      sphereGradient.addColorStop(0.4, '#1a3a52');
      sphereGradient.addColorStop(0.7, '#0a1628');
      sphereGradient.addColorStop(1, '#050510');
      
      ctx.globalAlpha = 1;
      ctx.fillStyle = sphereGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Globe outline with pulse
      const pulseIntensity = 0.6 + Math.sin(Date.now() * 0.002) * 0.4;
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.globalAlpha = pulseIntensity;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude lines
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.25;
      
      for (let i = -2; i <= 2; i++) {
        const y = centerY + (i * radius * 0.4);
        const width = Math.sqrt(radius * radius - (i * radius * 0.4) * (i * radius * 0.4)) * 2;
        ctx.beginPath();
        ctx.ellipse(centerX, y, width / 2, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines (rotating)
      ctx.globalAlpha = 0.3;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation;
        const radiusX = Math.abs(radius * Math.cos(angle));
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw hotspots with enhanced visuals
      hotspots.forEach((spot, index) => {
        const angle = rotation * 0.5 + (index * Math.PI * 2) / hotspots.length;
        const x = centerX + spot.x * radius * Math.cos(angle);
        const y = centerY + spot.y * radius * Math.sin(angle);
        
        // Hotspot pulse
        const pulse = 0.8 + Math.sin(Date.now() * 0.004 + index) * 0.2;
        
        // Outer ring
        ctx.strokeStyle = spot.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4 * pulse;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();

        // Inner dot
        ctx.fillStyle = spot.color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(x, y, 6 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        glowGradient.addColorStop(0, spot.color);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.globalAlpha = 0.6 * pulse;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Connection lines to center
        ctx.strokeStyle = spot.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
      });

      // Data streams
      const streamCount = renderQuality === 'high' ? 20 : 10;
      for (let i = 0; i < streamCount; i++) {
        const angle = (Date.now() * 0.0005 + i) % (Math.PI * 2);
        const distance = radius + 30 + (i % 3) * 15;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.fillStyle = i % 2 === 0 ? '#00ffff' : '#ff00ff';
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Click handler with hotspot detection
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;

      // Check if clicked on a hotspot
      let clickedHotspot = null;
      hotspots.forEach((spot, index) => {
        const angle = rotation * 0.5 + (index * Math.PI * 2) / hotspots.length;
        const x = centerX + spot.x * radius * Math.cos(angle);
        const y = centerY + spot.y * radius * Math.sin(angle);
        
        const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
        if (distance < 20) {
          clickedHotspot = spot;
        }
      });

      if (clickedHotspot) {
        onGlobeClick({
          title: clickedHotspot.label,
          description: `Severity: ${clickedHotspot.severity.toUpperCase()} | Click to view detailed analysis and take action`,
          x: e.clientX,
          y: e.clientY,
        });
      } else {
        onGlobeClick({
          title: 'Environmental Data Point',
          description: 'CO₂ levels: 412 ppm | Temperature: +1.2°C | Air Quality: Moderate | Click hotspots for details',
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    // Hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;

      let isOverHotspot = false;
      hotspots.forEach((spot, index) => {
        const angle = rotation * 0.5 + (index * Math.PI * 2) / hotspots.length;
        const x = centerX + spot.x * radius * Math.cos(angle);
        const y = centerY + spot.y * radius * Math.sin(angle);
        
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < 20) {
          isOverHotspot = true;
        }
      });

      canvas.style.cursor = isOverHotspot ? 'pointer' : 'default';
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onGlobeClick, renderQuality]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#050510' }}
    />
  );
}

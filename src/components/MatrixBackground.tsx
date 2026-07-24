import React, { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters for the matrix effect
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at random negative y positions to randomize entry
    }

    let animationFrameId: number;
    let lastDrawTime = 0;
    const fps = 30; // Control speed of falling text
    const interval = 1000 / fps;

    const draw = (timestamp: number) => {
      if (timestamp - lastDrawTime < interval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime = timestamp;

      // Dark background with opacity for trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'; // Match our theme's dark bg (#050505)
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.4)'; // Emerald green, subtle opacity
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}

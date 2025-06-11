import React, { useEffect, useRef, useState } from 'react';
import './Animation.css';

import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';

const images = [img1, img2, img3];

const Animation = () => {
  const canvasRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Cycle images every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Canvas wave animation (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let colorMixProgress = 0;
    let currentSetIndex = 0;
    let nextSetIndex = 1;

    const colorSets = [
      ['#fefefe', '#36261c', '#fcb81c'],
      ['#fefefd', '#37271b', '#40251b'],
      ['#246a73', '#fdfefe', '#fab71a'],
      ['#fab91d', '#cb4457', '#55787d']
    ];

    const mixColors = (color1, color2, amount) => {
      const [r1, g1, b1] = color1.match(/\w\w/g).map(c => parseInt(c, 16));
      const [r2, g2, b2] = color2.match(/\w\w/g).map(c => parseInt(c, 16));
      const r = Math.round(r1 + (r2 - r1) * amount).toString(16).padStart(2, '0');
      const g = Math.round(g1 + (g2 - g1) * amount).toString(16).padStart(2, '0');
      const b = Math.round(b1 + (b2 - b1) * amount).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.6;
    };

    const drawWave = () => {
      time += 0.01;
      colorMixProgress += 0.002;

      if (colorMixProgress >= 1) {
        colorMixProgress = 0;
        currentSetIndex = nextSetIndex;
        nextSetIndex = (nextSetIndex + 1) % colorSets.length;
      }

      const currentColors = colorSets[currentSetIndex].map((color, i) =>
        mixColors(color, colorSets[nextSetIndex][i], colorMixProgress)
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      currentColors.forEach((color, i) => {
        gradient.addColorStop(i / (currentColors.length - 1), color);
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      const amplitude = 40;
      const wavelength = 200;
      const yOffset = canvas.height / 2;
      ctx.moveTo(0, yOffset);

      for (let x = 0; x <= canvas.width; x++) {
        const y = yOffset + Math.sin((x + time * 100) / wavelength) * amplitude;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + Math.sin(time * 0.5) * 0.05})`;
      ctx.fill();

      animationFrameId = requestAnimationFrame(drawWave);
    };

    resizeCanvas();
    drawWave();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="gradient-container-wrapper">
      <div className="gradient-container">
        <canvas ref={canvasRef} className="Gradient__canvas" />
        <div className="gradient-content">
          <h1>The Strongest Web</h1>
          <h1>for Architects, Interior</h1>
          <h1>Designers, Construction, etc</h1>
        </div>
      </div>
      <img
        src={images[currentImageIndex]}
        alt="Rotating Showcase"
        className="iphone-image fade"
      />
      <div className="bottom-yellow-strip" />
    </div>
  );
};

export default Animation;
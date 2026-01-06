#!/usr/bin/env node

/**
 * Icon Generator for CyberWatch
 * Generates PNG icons from canvas drawing
 */

const fs = require('fs');
const path = require('path');

// Check if we have canvas support
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  console.log('⚠️  canvas package not found. Install with: npm install --save-dev canvas');
  console.log('📝 Alternatively, open scripts/generate-icons.html in your browser to download icons manually.');
  process.exit(0);
}

const { createCanvas } = Canvas;

function drawIcon(canvas, size) {
  const ctx = canvas.getContext('2d');
  const scale = size / 64;
  
  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);
  
  // Shield outline
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2.5 * scale;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(32 * scale, 12 * scale);
  ctx.lineTo(20 * scale, 18 * scale);
  ctx.lineTo(20 * scale, 28 * scale);
  ctx.bezierCurveTo(
    20 * scale, 36 * scale,
    24 * scale, 42 * scale,
    32 * scale, 48 * scale
  );
  ctx.bezierCurveTo(
    40 * scale, 42 * scale,
    44 * scale, 36 * scale,
    44 * scale, 28 * scale
  );
  ctx.lineTo(44 * scale, 18 * scale);
  ctx.closePath();
  ctx.stroke();
  
  // Inner shield
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.moveTo(32 * scale, 16 * scale);
  ctx.lineTo(24 * scale, 20 * scale);
  ctx.lineTo(24 * scale, 28 * scale);
  ctx.bezierCurveTo(
    24 * scale, 34 * scale,
    27 * scale, 39 * scale,
    32 * scale, 43 * scale
  );
  ctx.bezierCurveTo(
    37 * scale, 39 * scale,
    40 * scale, 34 * scale,
    40 * scale, 28 * scale
  );
  ctx.lineTo(40 * scale, 20 * scale);
  ctx.closePath();
  ctx.fill();
  
  // Lock body
  ctx.fillStyle = '#FFFFFF';
  const lockX = 28 * scale;
  const lockY = 28 * scale;
  const lockW = 8 * scale;
  const lockH = 8 * scale;
  const radius = 1 * scale;
  
  ctx.beginPath();
  ctx.moveTo(lockX + radius, lockY);
  ctx.lineTo(lockX + lockW - radius, lockY);
  ctx.quadraticCurveTo(lockX + lockW, lockY, lockX + lockW, lockY + radius);
  ctx.lineTo(lockX + lockW, lockY + lockH - radius);
  ctx.quadraticCurveTo(lockX + lockW, lockY + lockH, lockX + lockW - radius, lockY + lockH);
  ctx.lineTo(lockX + radius, lockY + lockH);
  ctx.quadraticCurveTo(lockX, lockY + lockH, lockX, lockY + lockH - radius);
  ctx.lineTo(lockX, lockY + radius);
  ctx.quadraticCurveTo(lockX, lockY, lockX + radius, lockY);
  ctx.closePath();
  ctx.fill();
  
  // Lock arc
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2 * scale;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(32 * scale, 25 * scale, 3 * scale, Math.PI, 0, true);
  ctx.stroke();
  
  // Keyhole
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(32 * scale, 32 * scale, 1.5 * scale, 0, Math.PI * 2);
  ctx.fill();
}

async function generateIcons() {
  const sizes = [
    { size: 16, name: 'favicon-16x16.png', dir: 'public' },
    { size: 32, name: 'favicon-32x32.png', dir: 'public' },
    { size: 48, name: 'favicon-48x48.png', dir: 'public' },
    { size: 180, name: 'apple-touch-icon.png', dir: 'public' },
    { size: 192, name: 'icon-192.png', dir: 'public' },
    { size: 512, name: 'icon-512.png', dir: 'public' },
  ];
  
  console.log('🎨 Generating CyberWatch icons...\n');
  
  for (const { size, name, dir } of sizes) {
    const canvas = createCanvas(size, size);
    drawIcon(canvas, size);
    
    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(__dirname, '..', dir, name);
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Generated ${name} (${size}x${size})`);
  }
  
  console.log('\n✨ All icons generated successfully!');
  console.log('📁 Icons saved to /public directory');
}

generateIcons().catch(console.error);


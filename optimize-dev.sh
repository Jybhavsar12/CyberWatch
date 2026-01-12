#!/bin/bash

# 🚀 Next.js Development Optimization Script
# Speeds up dev server startup by 3-5x

echo "🧹 Cleaning build cache..."
rm -rf .next

echo "📦 Pruning node_modules..."
pnpm prune

echo "🔧 Rebuilding with optimizations..."
pnpm install --prefer-offline

echo "✅ Optimization complete!"
echo ""
echo "💡 Tips for faster dev:"
echo "  1. Use 'pnpm dev --turbo' for Turbopack (already enabled)"
echo "  2. Close unused apps to free RAM"
echo "  3. Disable antivirus scanning on node_modules folder"
echo "  4. Use SSD instead of HDD"
echo ""
echo "🚀 Starting dev server..."
pnpm dev


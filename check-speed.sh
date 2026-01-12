#!/bin/bash

echo "🔍 Next.js Speed Diagnostic"
echo "=========================="
echo ""

echo "📦 Disk Usage:"
du -sh node_modules .next 2>/dev/null || echo "  (folders not found)"
echo ""

echo "💾 Available Disk Space:"
df -h . | tail -1 | awk '{print "  " $4 " available"}'
echo ""

echo "🧠 Node.js Version:"
node -v
echo ""

echo "📦 Package Manager:"
pnpm -v 2>/dev/null && echo "  Using pnpm ✅" || echo "  pnpm not found ❌"
echo ""

echo "🔢 File Watcher Limits:"
sysctl -n kern.maxfiles 2>/dev/null | awk '{print "  Max files: " $1}'
sysctl -n kern.maxfilesperproc 2>/dev/null | awk '{print "  Max per process: " $1}'
echo ""

echo "📊 Top 10 Largest Packages:"
du -sh node_modules/* 2>/dev/null | sort -rh | head -10
echo ""

echo "💡 Recommendations:"
echo "  1. Run: pnpm dev:fast (faster startup)"
echo "  2. Run: pnpm dev:clean (clean build)"
echo "  3. Run: pnpm optimize (optimize deps)"
echo ""
echo "📖 See SPEED_OPTIMIZATION.md for more tips"


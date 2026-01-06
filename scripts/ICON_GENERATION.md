# CyberWatch Icon Generation Guide

## Quick Start

### Option 1: Browser-Based (Easiest)

1. Open `scripts/generate-icons.html` in your browser
2. Click the download buttons for each icon size
3. Save the downloaded files to the `/public` directory with these names:
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `favicon-48x48.png`
   - `apple-touch-icon.png` (180x180)
   - `icon-192.png`
   - `icon-512.png`

### Option 2: Node.js Script (Requires canvas package)

```bash
# Install canvas package (optional)
npm install --save-dev canvas

# Run the generator
node scripts/generate-icons.js
```

### Option 3: Online SVG to PNG Converter

1. Use the `app/icon.svg` file
2. Go to https://svgtopng.com or https://cloudconvert.com/svg-to-png
3. Upload `icon.svg`
4. Generate these sizes:
   - 16x16 → `favicon-16x16.png`
   - 32x32 → `favicon-32x32.png`
   - 48x48 → `favicon-48x48.png`
   - 180x180 → `apple-touch-icon.png`
   - 192x192 → `icon-192.png`
   - 512x512 → `icon-512.png`
5. Save all files to `/public` directory

## Icon Files

### Current Setup

- ✅ `app/icon.svg` - Modern SVG favicon (auto-detected by Next.js)
- ✅ `app/favicon.ico` - Legacy favicon
- ✅ `public/manifest.json` - PWA manifest

### Needed Files (generate using one of the options above)

- `public/apple-touch-icon.png` (180x180) - iOS home screen
- `public/icon-192.png` (192x192) - Android home screen
- `public/icon-512.png` (512x512) - PWA splash screen

### Optional Files

- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon-48x48.png`

## Design

The CyberWatch icon features:
- **Black background** - Bold, modern look
- **White shield** - Security and protection
- **Lock symbol** - Cybersecurity focus
- **Minimalist design** - Scales well at all sizes

## Browser Support

- ✅ Modern browsers: Use `icon.svg` (crisp at any size)
- ✅ Safari iOS: Use `apple-touch-icon.png`
- ✅ Android: Use `icon-192.png` and `icon-512.png`
- ✅ Legacy browsers: Use `favicon.ico`

## Testing

After generating icons, test them:

1. **Browser tab**: Check if icon appears in browser tab
2. **Bookmarks**: Bookmark the site and check icon
3. **iOS**: Add to home screen on iPhone/iPad
4. **Android**: Add to home screen on Android device
5. **PWA**: Install as PWA and check app icon

## Troubleshooting

**Icon not showing?**
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check browser DevTools → Network tab for 404 errors
- Verify files are in correct directories

**Wrong icon showing?**
- Old favicon might be cached
- Try incognito/private browsing mode
- Check `app/layout.tsx` metadata configuration

